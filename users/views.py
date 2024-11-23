from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.contrib.sessions.models import Session
from .models import CustomUser  # Import your custom user model
# Create your views here.

class UserRegistrationView(APIView):

    def post(self, request):
        # Extracting data from the request
        email = request.data.get('email')
        password = request.data.get('password')
        name = request.data.get('name')
        mobile_number = request.data.get('mobile_number')
        city = request.data.get('city')
        referral_code = request.data.get('referral_code',None)
        
        # Validations
        if not email or not password:
            return Response({"error": "Email and password are required!"}, status=status.HTTP_400_BAD_REQUEST)
        email = email.lower()
        
        if not name or not mobile_number or not city:
            return Response({"error": "Please fill the required fields!"}, status=status.HTTP_400_BAD_REQUEST)
        
        if len(mobile_number)!=10:
            return Response({"error": "Mobile Number should be of 10 digits only!"})
        
        # Validation for email format 
        if "@" not in email or len(email)<5:
            return Response({"error": "Invalid email format!"}, status=status.HTTP_400_BAD_REQUEST)

        if len(password)<8:
            return Response({"error": "Password should be atleast 8 characters long!"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already exists
        if CustomUser.objects.filter(username=email).exists():
            return Response({"error": "Email already exists!"}, status=status.HTTP_400_BAD_REQUEST)
        
        if referral_code!=None and not CustomUser.objects.filter(referrer_code=referral_code).exists():
            return Response({"error": "Invalid referral code!"}, status=status.HTTP_400_BAD_REQUEST)

                
        hashed_password = make_password(password)  # Hash password manually
        
        # Create the new user
        new_user = CustomUser.objects.create(
            username=email,
            password=hashed_password,  # Remember to hash the password in a real-world app
            name=name,
            mobile_number=mobile_number,
            city=city,
            referral_code=referral_code
        )
        # Return a success response
        return Response({"message": f"{email} User registered successfully!"}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self,request):
        
        username=request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({"error": "Email and password are required!"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            request.session['user_referrer_code'] = user.referrer_code
            request.session.save()
            return Response({"message": "Login successful!", "user_id": user.id, "email_id": user.username}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)
        
class ReferralView(APIView):
    def get(self, request):
        if 'user_referrer_code' in request.session:
            user_code=request.session['user_referrer_code']
            user_data = CustomUser.objects.filter(referral_code=user_code).values('name', 'username', 'date_joined')
            return Response({"message": "You are logged in!", "data": user_data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Unauthorized!"}, status=status.HTTP_401_UNAUTHORIZED)