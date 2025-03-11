import random
from django.core.mail import EmailMessage
from django.conf import settings

from .models import OneTimePassword, User


def generateOtp():
    otp = ""

    for i in range(6):
        otp += str(random.randint(0, 9))

    return otp


def send_code_to_server(email, code):
    subject = "One time posscode for Email verification"
    otp_code = generateOtp()
    print(otp_code)

    user = User.objects.get(email=email)
    current_site = "myAuth.com"
    email_body = f"Hello {user.first_name},\n\nYour one time password is {otp_code}.\n\nThanks for using our service.\n\nRegards,\nMyAuth Team"
    from_email = settings.DEFAULT_FROM_EMAIL

    OneTimePassword.objects.create(user=user, otp_code=otp_code)

    send_email = EmailMessage(
        subject=subject, body=email_body, from_email=from_email, to=[email]
    )
    send_email.send(fail_silently=True)
