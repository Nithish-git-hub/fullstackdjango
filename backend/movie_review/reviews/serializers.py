
from rest_framework import serializers
from .models import Review
from movies.models import Movie

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    movie = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all())
    is_owner = serializers.SerializerMethodField()
    can_modify = serializers.SerializerMethodField()

    class Meta:
        model = Review
        # Prefer explicit fields in production; for brevity we'll include these:
        fields = ['id', 'user', 'user_id', 'movie', 'content', 'rating', 'created_at', 'updated_at', 'is_owner', 'can_modify']
        read_only_fields = ['id', 'user', 'user_id', 'created_at', 'updated_at', 'is_owner', 'can_modify']

    def get_is_owner(self, obj):
        request = self.context.get('request', None)
        if not request or request.user.is_anonymous:
            return False
        return obj.user == request.user

    def get_can_modify(self, obj):
        request = self.context.get('request', None)
        if not request or request.user.is_anonymous:
            return False
        # owner or admin
        if obj.user == request.user:
            return True
        return getattr(request.user, 'role', None) == 'admin'

    







