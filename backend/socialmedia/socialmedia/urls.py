from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenVerifyView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/v1/auth/", include("accounts.urls")),
    path("api/v1/auth/", include("password_reset.urls")),
    path("api/v1/auth/", include("social_accounts.urls")),
]
