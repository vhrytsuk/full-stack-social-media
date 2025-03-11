from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_str, smart_bytes, force_str
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .models import User
from .utils import send_normal_email


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password", "")
        password2 = attrs.get("password2", "")

        if password != password2:
            raise serializers.ValidationError("Passwords do not match")

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],
        )

        return user


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    full_name = serializers.CharField(max_length=255, read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "full_name", "access_token", "refresh_token"]

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")
        request = self.context.get("request")

        user = authenticate(request=request, email=email, password=password)

        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")

        if not user.is_verified:
            raise AuthenticationFailed("Account is not verified")

        user_tokens = user.tokens()

        return {
            "email": user.email,
            "full_name": user.get_full_name,
            "access_token": str(user_tokens.get("access")),
            "refresh_token": str(user_tokens.get("refresh")),
        }


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=6)

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email", "")

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request = self.context.get("request")

            side_domain = get_current_site(request).domain
            relative_link = reverse(
                "password-reset-confirm", kwargs={"uidb64": uidb64, "token": token}
            )

            abslink = f"http://{side_domain}{relative_link}"
            email_body = (
                f"Hello, \n Use the link below to reset your password \n {abslink}"
            )
            data = {
                "email_body": email_body,
                "email_subject": "Reset your password",
                "to_email": user.email,
            }

            send_normal_email(data)

        return attrs


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    confirm_password = serializers.CharField(
        max_length=68, min_length=6, write_only=True
    )
    token = serializers.CharField(write_only=True)
    uidb64 = serializers.CharField(write_only=True)

    class Meta:
        fields = ["password", "confirm_password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password", "")
            confirm_password = attrs.get("confirm_password", "")
            token = attrs.get("token", "")
            uidb64 = attrs.get("uidb64", "")

            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The reset link is invalid", 401)

            if password != confirm_password:
                raise AuthenticationFailed("Passwords do not match", 401)

            user.set_password(password)
            user.save()

            return user

        except Exception as e:
            raise AuthenticationFailed("The reset link is invalid", 401)


class LogoutUserSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    default_error_messages = {
        "bad_token": "Token is invalid or expired",
    }

    def validate(self, attrs):
        self.token = attrs.get("refresh_token")

        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()

        except TokenError:
            self.fail("bad_token")
