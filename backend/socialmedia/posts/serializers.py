from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        request = self.context.get("request")

        if not request or not request.user:
            raise serializers.ValidationError("Request context with user is required.")

        validated_data["author"] = request.user

        return super().create(validated_data)

    class Meta:
        model = Post
        fields = ["id", "author", "content", "created_at"]
        read_only_fields = ["author", "created_at", "updated_at"]
