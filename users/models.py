from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    name = models.CharField(max_length=255, blank=False, null=False)
    mobile_number = models.CharField(max_length=15, blank=False, null=False)
    city = models.CharField(max_length=255, blank=False, null=False)
    referral_code = models.CharField(max_length=100, blank=True, null=True)
    referrer_code = models.CharField(max_length=100, unique=True)
    
    REQUIRED_FIELDS = ['name', 'mobile_number','city'] 
