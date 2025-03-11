from rest_framework import serializers
from .services import PasswordResetService


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=6)

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email", "")
        request = self.context.get("request")
        PasswordResetService.send_reset_email(request, email)

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
        password = attrs.get("password", "")
        confirm_password = attrs.get("confirm_password", "")
        token = attrs.get("token", "")
        uidb64 = attrs.get("uidb64", "")

        PasswordResetService.reset_password(uidb64, token, password, confirm_password)

        return attrs
