from django.contrib import admin
from .models import User, Expert, Appointment

# Register your models here.
admin.site.register(User)
admin.site.register(Expert)
admin.site.register(Appointment)
