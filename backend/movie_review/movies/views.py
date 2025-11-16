from django.shortcuts import render

# # Create your views here.
from rest_framework import viewsets, permissions
from .models import Movie
from .serializers import MovieSerializer
from rest_framework.filters import SearchFilter, OrderingFilter

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role=='admin'


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title','director','genre']
    ordering_fields = ['release_date']




