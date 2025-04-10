from django.urls import path


from .views import PostViewSet


urlpatterns = [
    path("posts/", PostViewSet.as_view(), name="posts"),
]
