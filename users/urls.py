from django.urls import path
from .views import UserRegistrationView, LoginView, ReferralView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', LoginView.as_view(), name='user-login'),
    path('referral/', ReferralView.as_view(), name='referrals'),
]