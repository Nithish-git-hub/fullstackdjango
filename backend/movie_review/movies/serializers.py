

# from rest_framework import serializers
# from .models import Movie
# from reviews.serializers import ReviewSerializer

# class MovieSerializer(serializers.ModelSerializer):
#     reviews = ReviewSerializer(many=True, read_only=True)

#     class Meta:
#         model = Movie
#         fields = ['id', 'title', 'description', 'average_rating', 'reviews']
#         read_only_fields = ['id', 'average_rating', 'reviews']






from rest_framework import serializers
from .models import Movie
from reviews.serializers import ReviewSerializer

class MovieSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    poster_file = serializers.ImageField(write_only=True, required=False, allow_null=True)
    poster = serializers.URLField(required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Movie
        fields = [
            "id",
            "title",
            "director",
            "genre",
            "release_date",
            "description",
            "poster",
            "poster_file",
            "average_rating",
            "reviews",
            "created_at",
            "featured",
        ]
        read_only_fields = ["id", "average_rating", "reviews", "created_at"]
