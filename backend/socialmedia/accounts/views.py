from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserRegisterSerializer
from .utils import send_code_to_server
from .models import OneTimePassword


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.get_serializer(data=user_data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data

            # Send the code to the user email
            send_code_to_server(user["email"], None)

            return Response(
                {
                    "data": user,
                    "message": f"User {user.get('email')} has been created successfully",
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyUserEmail(GenericAPIView):
    def post(self, request):
        otp_code = request.data.get("otp_code")

        try:
            user_code_obj = OneTimePassword.objects.get(otp_code=otp_code)
            user = user_code_obj.user

            if not user.is_verified:
                user.is_verified = True
                user.save()
                user_code_obj.delete()

                return Response(
                    {"message": f"User {user.email} has been verified successfully"},
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"message": f"User {user.email} is already verified"},
                status=status.HTTP_204_NO_CONTENT,
            )

        except OneTimePassword.DoesNotExist:
            return Response(
                {"message": "Invalid OTP code"}, status=status.HTTP_400_BAD_REQUEST
            )
