from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Inherit from Django's built-in user, add extra fields if needed
    pass

class Expert(models.Model):
    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='experts/', blank=True, null=True)
    rating = models.FloatField(default=0)
    reviews = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expert = models.ForeignKey(Expert, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    report = models.FileField(upload_to='reports/', blank=True, null=True)
    additional_info = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.expert.name} - {self.date}"
