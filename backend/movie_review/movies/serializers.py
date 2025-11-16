

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
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'director', 'genre', 'release_date', 'description', 'poster', 'average_rating', 'reviews']
        read_only_fields = ['id', 'average_rating', 'reviews']

    def get_average_rating(self, obj):
        return obj.average_rating()





