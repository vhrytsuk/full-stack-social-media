from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_bytes, force_str
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

from accounts.models import User
from accounts.utils import send_normal_email


class PasswordResetService:
    @staticmethod
    def send_reset_email(request, email):
        user = User.objects.filter(email=email)

        if user.exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
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

    @staticmethod
    def reset_password(uidb64, token, password, confirm_password):
        try:
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The reset link is invalid", 401)

            if password != confirm_password:
                raise AuthenticationFailed("Passwords do not match", 401)

            user.set_password(password)
            user.save()
        except Exception as e:
            raise AuthenticationFailed("The reset link is invalid", 401)
