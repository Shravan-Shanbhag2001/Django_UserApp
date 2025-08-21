from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
import uuid
from .models import CustomUser

# ------------------ Registration ------------------

class UserRegistrationView(APIView):
    def post(self, request):
        data = request.data
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")
        mobile_number = data.get("mobile_number")
        city = data.get("city")
        referral_code = data.get("referral_code", None)

        # Basic validations
        if not email or not password:
            return Response({"error": "Email and password are required!"}, status=status.HTTP_400_BAD_REQUEST)
        email = email.lower()

        if not name or not mobile_number or not city:
            return Response({"error": "Please fill all required fields!"}, status=status.HTTP_400_BAD_REQUEST)

        if len(mobile_number) != 10:
            return Response({"error": "Mobile number must be 10 digits!"}, status=status.HTTP_400_BAD_REQUEST)

        if "@" not in email or len(email) < 5:
            return Response({"error": "Invalid email format!"}, status=status.HTTP_400_BAD_REQUEST)

        if len(password) < 8:
            return Response({"error": "Password must be at least 8 characters!"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user already exists
        if CustomUser.objects.filter(username=email).exists():
            return Response({"error": "Email already exists!"}, status=status.HTTP_400_BAD_REQUEST)

        # Check referral code validity
        if referral_code and not CustomUser.objects.filter(referrer_code=referral_code).exists():
            return Response({"error": "Invalid referral code!"}, status=status.HTTP_400_BAD_REQUEST)

        # Create user using create_user (handles password hashing)
        new_user = CustomUser.objects.create_user(
            username=email,
            password=password,
            name=name,
            mobile_number=mobile_number,
            city=city,
            referral_code=referral_code,
            referrer_code=str(uuid.uuid4())[:6]
        )

        return Response({"message": f"{new_user.username} registered successfully!"}, status=status.HTTP_201_CREATED)

# ------------------ Login ------------------

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Email and password are required!"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            request.session['user_referrer_code'] = user.referrer_code
            request.session.save()
            return Response({
                "message": "Login successful!",
                "user_id": user.id,
                "email_id": user.username
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)

# ------------------ Referral Info ------------------

class ReferralView(APIView):
    def get(self, request):
        if 'user_referrer_code' not in request.session:
            return Response({"error": "Unauthorized!"}, status=status.HTTP_401_UNAUTHORIZED)

        user_code = request.session['user_referrer_code']
        referrals = CustomUser.objects.filter(referral_code=user_code).values('name', 'username', 'date_joined')
        return Response({"message": "You are logged in!", "data": referrals}, status=status.HTTP_200_OK)
