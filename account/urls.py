from django.urls import path
from django.contrib import admin
from . import views
# from . import scheduler
# from account.scheduler.scheduler import getOldDataView
from account.views import SendPasswordResetEmailView,NewDataView,getOldDataView,deleteprofileView,profileView,projectView,projectGetView,KeywordGetView,OTPView,keywordView,UserChangePasswordView, UserLoginView, UserProfileView, UserRegistrationView, UserPasswordResetView
urlpatterns = [
    
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('otp/',OTPView.as_view(), name='otp'),
    path('project/', projectView.as_view(), name='project'),
    path('projectGet/', projectGetView.as_view(), name='projectGet'),
    path('Keyword/', keywordView.as_view(), name='Keyword'),
    path('KeywordGet/', KeywordGetView.as_view(), name='Keyword'),
    path('Newdata/', NewDataView.as_view(), name = 'Newdata'),
    # path('Olddata/', OldDataView.as_view(), name = 'Olddata'),
    path('adminuser/',profileView.as_view(), name='user-profile'),
    path('deleteuser/<id>/',deleteprofileView.as_view(), name='user-delete'),
    path('Olddata/', getOldDataView.as_view(), name = 'Olddata'),
]