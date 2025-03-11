from django.urls import path

from .views import (
    RegisterUserView,
    VerifyUserEmail,
    LoginUserView,
    TestAuthenticator,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    SetNewPasswordView,
    LogoutUserView,
)


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify-email/", VerifyUserEmail.as_view(), name="verify"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("test-login/", TestAuthenticator.as_view(), name="test-login"),
    path("password-reset/", PasswordResetRequestView.as_view(), name="password-reset"),
    path(
        "password-reset-confirm/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password-reset-confirm",
    ),
    path("set-new-password/", SetNewPasswordView.as_view(), name="set-new-password"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
]
