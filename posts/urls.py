from django.urls import path
from .views import LoginView, UserCreate
urlpatterns = [
    path('user/create/', UserCreate.as_view(), name="user_create"),
    path('user/login/', LoginView.as_view(), name="user_login"),
]