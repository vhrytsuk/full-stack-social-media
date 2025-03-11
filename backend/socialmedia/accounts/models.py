from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        max_length=255, unique=True, verbose_name=_("Email address")
    )
    first_name = models.CharField(
        max_length=100, blank=True, verbose_name=_("First name")
    )
    last_name = models.CharField(
        max_length=100, blank=True, verbose_name=_("Last name")
    )
    is_staff = models.BooleanField(default=False, verbose_name=_("Staff status"))
    is_superuser = models.BooleanField(
        default=False, verbose_name=_("Superuser status")
    )
    is_verified = models.BooleanField(default=False, verbose_name=_("Verified status"))
    is_active = models.BooleanField(default=True, verbose_name=_("Active status"))
    data_joined = models.DateTimeField(auto_now_add=True, verbose_name=_("Date joined"))
    last_login = models.DateTimeField(
        null=True, blank=True, verbose_name=_("Last login")
    )

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def tokens(sefl):
        pass


class OneTimePassword(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6, unique=True)

    def __str__(self):
        return f"{self.user.email}-posscode"
