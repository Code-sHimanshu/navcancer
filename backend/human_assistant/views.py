from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import UserSerializer, ExpertSerializer, AppointmentSerializer
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import make_password
from .models import User, Expert, Appointment
from django.core.files.storage import default_storage
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.

class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if User.objects.filter(username=request.data.get('email')).exists():
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save(username=request.data.get('email'), password=make_password(request.data.get('password')))
            return Response({'message': 'Signup successful'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        UserModel = get_user_model()
        try:
            user_obj = UserModel.objects.get(email=email)
            user = authenticate(username=user_obj.username, password=password)
        except UserModel.DoesNotExist:
            user = None
        if user is not None:
            return Response({'message': 'Login successful', 'user': user.username})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class ExpertListView(APIView):
    def get(self, request):
        experts = Expert.objects.all()
        serializer = ExpertSerializer(experts, many=True, context={'request': request})
        return Response({'experts': serializer.data})

class AppointmentView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        user = User.objects.get(email=request.data.get('email'))
        expert = Expert.objects.get(id=request.data.get('expert_id'))
        mutable_data = request.data.copy()
        mutable_data['user'] = user.id
        mutable_data['expert'] = expert.id
        serializer = AppointmentSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Appointment booked'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
