from rest_framework import serializers
from .models import User, Expert, Appointment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name']

class ExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = ['id', 'name', 'designation', 'specialization', 'photo', 'rating', 'reviews']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'user', 'expert', 'date', 'time', 'report', 'additional_info', 'status', 'created_at'] 