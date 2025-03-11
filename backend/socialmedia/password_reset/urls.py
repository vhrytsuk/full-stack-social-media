from django.urls import path

from .views import (
    PasswordResetConfirmView,
    PasswordResetRequestView,
    SetNewPasswordView,
)

urlpatterns = [
    path("password-reset/", PasswordResetRequestView.as_view(), name="password-reset"),
    path(
        "password-reset-confirm/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password-reset-confirm",
    ),
    path("set-new-password/", SetNewPasswordView.as_view(), name="set-new-password"),
]
