from django.shortcuts import render
from django.utils.encoding import smart_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import DjangoUnicodeDecodeError

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from accounts.models import User

from .serializers import PasswordResetRequestSerializer, SetNewPasswordSerializer


class PasswordResetRequestView(GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        return Response(
            {"message": "Password reset code has been sent to your email"},
            status=status.HTTP_200_OK,
        )


class PasswordResetConfirmView(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"error": "Token is not valid, please request a new one"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            return Response(
                {
                    "success": "true",
                    "message": "Credentials are valid",
                    "uidb64": uidb64,
                    "token": token,
                },
                status=status.HTTP_200_OK,
            )

        except DjangoUnicodeDecodeError:
            return Response(
                {"error": "Token is not valid, please request a new one"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class SetNewPasswordView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(
            {"message": "Password has been reset successfully"},
            status=status.HTTP_200_OK,
        )
