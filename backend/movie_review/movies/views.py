# from django.shortcuts import render

# # # Create your views here.
# from rest_framework import viewsets, permissions
# from .models import Movie
# from .serializers import MovieSerializer
# from rest_framework.filters import SearchFilter, OrderingFilter

# class IsAdminOrReadOnly(permissions.BasePermission):
#     def has_permission(self, request, view):
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         return request.user.is_authenticated and request.user.role=='admin'


# class MovieViewSet(viewsets.ModelViewSet):
#     queryset = Movie.objects.all()
#     serializer_class = MovieSerializer
#     permission_classes = [IsAdminOrReadOnly]
#     filter_backends = [SearchFilter, OrderingFilter]
#     search_fields = ['title','director','genre']
#     ordering_fields = ['release_date']



from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Movie
from .serializers import MovieSerializer
import cloudinary.uploader

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and getattr(request.user, "role", None) == "admin"

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title", "director", "genre"]
    ordering_fields = ["release_date"]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def perform_cloudinary_upload(self, file_obj):
        result = cloudinary.uploader.upload(file_obj, folder="movies/posters")
        return result.get("secure_url")

    def perform_create(self, serializer):
        poster_file = self.request.FILES.get("poster_file") or self.request.FILES.get("poster")
        poster_url = self.request.data.get("poster")
        extra = {}
        if poster_file:
            secure_url = self.perform_cloudinary_upload(poster_file)
            if secure_url:
                extra["poster"] = secure_url
        elif poster_url:
            extra["poster"] = poster_url
        serializer.save(**extra)

    def perform_update(self, serializer):
        poster_file = self.request.FILES.get("poster_file") or self.request.FILES.get("poster")
        poster_url = self.request.data.get("poster")
        extra = {}
        if poster_file:
            secure_url = self.perform_cloudinary_upload(poster_file)
            if secure_url:
                extra["poster"] = secure_url
        elif poster_url is not None:
            extra["poster"] = poster_url
        serializer.save(**extra)

