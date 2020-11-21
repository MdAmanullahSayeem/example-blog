from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .serializer import  LoginSerializer, RegisterSerializer
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.shortcuts import HttpResponse, render
from rest_framework.decorators import api_view

class LoginView(APIView):
    def post(self, request):
        serializer=LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(True, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserCreate(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=request.data['username'],  # Username, make sure it's lowercase
                email=request.data['email'],
                password=request.data['password']  # Password
            )
            return Response(True, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

