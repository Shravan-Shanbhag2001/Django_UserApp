from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("Username must be set")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)

class CustomUser(AbstractUser):
    name = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=15)
    city = models.CharField(max_length=255)
    referral_code = models.CharField(max_length=100, blank=True, null=True)
    referrer_code = models.CharField(max_length=100, unique=True)

    objects = CustomUserManager()
    USERNAME_FIELD = 'username' 
    REQUIRED_FIELDS = ['name', 'mobile_number', 'city']
