from django.urls import path

from .views import (
    RegisterUserView,
    VerifyUserEmail,
    LoginUserView,
    TestAuthenticator,
    LogoutUserView,
)


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify-email/", VerifyUserEmail.as_view(), name="verify"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("test-login/", TestAuthenticator.as_view(), name="test-login"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
]
