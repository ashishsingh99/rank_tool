from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
# from djongo import models as djongomodels
class UserManager(BaseUserManager):
  def create_user(self, email, name, tc,  password=None, password2=None):
      
      if not email:
          raise ValueError('User must have an email address')

      user = self.model(
          email=self.normalize_email(email),
          name=name,
          tc=tc
      )

      user.set_password(password)
      user.save(using=self._db)
      return user

  def create_superuser(self, email, name, tc, password=None):

      user = self.create_user(
          email,
          password=password,
          name=name,
          tc=tc
      )
      user.is_admin = True
      user.save(using=self._db)
      return user


class User(AbstractBaseUser):
  email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
  )
  name = models.CharField(max_length=200)
  tc = models.BooleanField()
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name', 'tc']

  def __str__(self):
      return self.email

  def has_perm(self, perm, obj=None):
      return self.is_admin

  def has_module_perms(self, app_label):
      return True

  @property
  def is_staff(self):
      return self.is_admin

class Keyword(models.Model):
    data = models.SlugField(max_length=5000000)

class Project(models.Model):
    keyword = models.SlugField(max_length=5000000)

class OTP(models.Model):
    email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
  )

# class Finding(models.Model):
#     finding = models.SlugField(max_length=5000000)

# class MultiPr(models.Model):
#     multipr = models.SlugField(max_length=5000000)