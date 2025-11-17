

from rest_framework import serializers
from .models import Movie
from reviews.serializers import ReviewSerializer

class MovieSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'average_rating', 'reviews']
        read_only_fields = ['id', 'average_rating', 'reviews']






