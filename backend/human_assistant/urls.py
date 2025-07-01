from django.urls import path
from .views import SignupView, LoginView, ExpertListView, AppointmentView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('experts/', ExpertListView.as_view(), name='experts'),
    path('appointments/', AppointmentView.as_view(), name='appointments'),
] 