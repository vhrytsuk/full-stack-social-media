from django.urls import path


from .views import (
    RefreshTokenView,
    RegisterUserView,
    ValidateAccessToken,
    VerifyUserEmail,
    LoginUserView,
    TestAuthenticator,
    LogoutUserView,
)


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify-email/", VerifyUserEmail.as_view(), name="verify"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("refresh-token/", RefreshTokenView.as_view(), name="refresh-token"),
    path("validate-token/", ValidateAccessToken.as_view(), name="validate-token"),
    path("test-login/", TestAuthenticator.as_view(), name="test-login"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
]
