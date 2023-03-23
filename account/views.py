from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import SendPasswordResetEmailSerializer,ProjectSerializer,ProjectGetSerializer,KeywordGetSerializer,otpSerializer,KeywordSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
from .models import Keyword, User, Project
import ast
from .client import RestClient
from pymongo import MongoClient
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
import random

user = 'info@esearchlogix.com'
password = 'ff9fb26846a160db'


mongo_client=MongoClient("mongodb+srv://ashish1908:Ashish%401908@cluster0.v5edrbu.mongodb.net/?retryWrites=true&w=majority")
db=mongo_client.Latest_Data
db2=mongo_client.Previous_Data
db3=mongo_client.seo_newest

# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class OTPView(APIView):
  def post(self, request, format=None):
    serializer = otpSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    otp = random.randint(1000,9999)
    user = serializer.data.get('email')
    if user is not None:
      body = 'OTP validation for resgistring '+str(otp)
      data = {
        'subject':'OTP Validation',
        'body':body,
        'to_email':user
      }
      print(data)
      send_mail(
        subject=data['subject'],
        message=data['body'],
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[data['to_email']]
      )
      return Response({'otp':otp}, status=status.HTTP_200_OK)

class UserRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
    return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token, 'msg':'Login Success', 'status':'200', 'email':email}, status=status.HTTP_200_OK)
    else:
      return Response({'status':'400', 'msg':'Invalid Credentials'}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
class profileView(APIView):
  def get(self, request, format=None):
    mycol = db3["account_user"]
    results = []
    for x in mycol.find():
      x['_id'] = str(x['_id'])
      results.append(x)
    return Response(results, status=status.HTTP_200_OK)
  
class deleteprofileView(APIView):
  def delete(self, request,id):
    user_detail = User.objects.get(id=id)
    user_detail.delete()
    return Response("deleted successfully")

class keywordView(APIView):
  def post(self,request):
    serializer = KeywordSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({'msg':'Id Successful', 'data':serializer.data}, status=status.HTTP_201_CREATED)
    else:
      return Response({'msg':'Invalid'}, status=status.HTTP_400_BAD_REQUEST)

class projectView(APIView):
  def post(self,request):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({'msg':'save Successful', 'data':serializer.data}, status=status.HTTP_201_CREATED)
    else:
      return Response({'msg':'Invalid'}, status=status.HTTP_400_BAD_REQUEST)

class projectGetView(APIView):
  def get(self, request, id=None, format=None):
    if id:
      keyword = Project.objects.filter(id=id)
      serializer = ProjectGetSerializer(keyword)
      return Response(serializer.data, status=status.HTTP_200_OK)
    datas = []
    keyword = Project.objects.all()
    serializer = ProjectGetSerializer(keyword, many=True)
    for data in serializer.data:
      GetData = dict(data)
      Check = ast.literal_eval(GetData.get('keyword'))
      datas.append(Check)
    return Response({"status": "success", "data": datas}, status=status.HTTP_200_OK)

class KeywordGetView(APIView):
  def get(self, request, id=None, format=None):
    if id:
      keyword = Keyword.objects.filter(id=id)
      serializer = KeywordGetSerializer(keyword)
      return Response(serializer.data, status=status.HTTP_200_OK)
    keyword = Keyword.objects.all()
    serializer = KeywordGetSerializer(keyword, many=True)
    Data = []
    for data in serializer.data:
      GetData = dict(data)
      Check = ast.literal_eval(GetData.get('data'))
      # print(Check)
      lis=[]
      for i in Check:
        for j in i:
          dic = dict()
          dic["device"] = j.get('device')
          lis.append(j)
      GetData["data"] = lis
      Data.append(GetData)
    return Response({"status": "success", "data": Data}, status=status.HTTP_200_OK)

class getOldDataView(APIView):
  def get(self, request):
    mycol = db2["segment"]
    Old_data_list = []
    for x in mycol.find():
      x['_id'] = str(x['_id'])
      Old_data_list.append(x)
    return Response({"status": "success", "data": Old_data_list}, status=status.HTTP_200_OK)

class NewDataView(APIView):
  def get(self, request):
    mycol = db["segment"]
    results = []
    for x in mycol.find():
      x['_id'] = str(x['_id'])
      results.append(x)
    return Response({"status": "success", "data": results}, status=status.HTTP_200_OK)

class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    user = authenticate(email=email)
    if user is None:
      user = User.objects.get(email = email)
      uid = urlsafe_base64_encode(force_bytes(user.id))
      print('Encoded UID', uid)
      token = PasswordResetTokenGenerator().make_token(user)
      print('Password Reset Token', token)
      link = 'http://eslrankspro.com/api/user/reset/'+uid+'/'+token
      print('Password Reset Link', link)
      # Send EMail
      body = "We heard that you lost your password. Sorry about that! But don't worry! You can use the following link to reset your password: "+link
      data = {
        'subject':'ESLRanksPro: Reset Your Password',
        'body':body,
        'to_email':user.email
      }
      # print(data)
      send_mail(
        subject=data['subject'],
        message=data['body'],
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[data['to_email']]
      )
    return Response({'msg':'Password Reset link send. Please check your Email', 'uid':uid, 'token':token}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)


