from rest_framework import serializers
from django.contrib.auth import  authenticate
from django.contrib.auth.models import User

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)

    def validate_username(self, value):
        username=value
        if not User.objects.filter(username=username):
            raise serializers.ValidationError("User not registered")
        return value

    def validate(self, values):
        if values['username'] and values['password']:
            username=values['username']
            password=values['password']
            user = authenticate(username=username, password=password)
            if user is None:
                obj={
                    'password':"Password is incorrect",
                }
                raise serializers.ValidationError(obj)
        return values


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    email=serializers.EmailField()
    password = serializers.CharField(max_length=20, min_length=4)
    confirm = serializers.CharField(max_length=20, min_length=4)

    def validate_username(self, value):
        username=value
        if User.objects.filter(username=username):
            raise serializers.ValidationError("User already registered")
        return value

    def validate_email(self, value):
        email=value
        if User.objects.filter(email=email):
            raise serializers.ValidationError("Email already registered")
        return value

    def validate(self, values):
        if values['password'] and values['confirm']:
            password1=values['password']
            password2=values['confirm']
            if (password1 != password2):
                obj = {
                    'confirm': "Password Not match",
                }
                raise serializers.ValidationError(obj)
        return values
