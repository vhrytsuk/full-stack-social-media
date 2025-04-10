from tokenize import TokenError
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from .serializers import (
    UserRegisterSerializer,
    LoginSerializer,
    LogoutUserSerializer,
)
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
                    {
                        "data": {"email": user.email, "is_verified": user.is_verified},
                        "message": f"User {user.email} has been verified successfully",
                    },
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


class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        response = Response(serializer.data, status=status.HTTP_200_OK)

        refresh_token = serializer.data.get("refresh_token")
        access_token = serializer.data.get("access_token")

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite="None",
        )

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="None",
        )

        return response


class RefreshTokenView(GenericAPIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"message": "Refresh token is missing"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            refresh = RefreshToken(refresh_token)

            access_token = str(refresh.access_token)

        except Exception as e:
            return Response(
                {"message": "Refresh token is invalid"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        response = Response(
            {"access_token": access_token},
            status=status.HTTP_200_OK,
        )

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="None",
        )

        return response


class TestAuthenticator(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated"}, status=status.HTTP_200_OK)


class ValidateAccessToken(GenericAPIView):
    def get(self, request):
        access_token = request.COOKIES.get("access_token")

        if not access_token:
            return Response(
                {"message": "Access token is missing"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            access = AccessToken(access_token)
            access_payload = access.payload
            user_id = access_payload.get("user_id")

        except Exception as e:
            return Response(
                {"message": "Invalid token"},
                status=status.HTTP_403_FORBIDDEN,
            )

        return Response(
            {"user_id": user_id, "access_token": access_token},
            status=status.HTTP_200_OK,
        )


class LogoutUserView(GenericAPIView):
    serializer_class = LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
