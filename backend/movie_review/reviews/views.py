# from django.shortcuts import render

# # Create your views here.
# from rest_framework import viewsets, permissions
# from .models import Review
# from .serializers import ReviewSerializer

# class IsOwnerOrAdmin(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         return request.user==obj.user or getattr(request.user,'role',None)=='admin'

# class ReviewViewSet(viewsets.ModelViewSet):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrAdmin]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


from rest_framework import viewsets, permissions
from .models import Review
from .serializers import ReviewSerializer
from .permissions import IsOwnerOrAdmin

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer

    # We'll use the custom permission for object-level checks; allow read for all, create for authenticated
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        # Optionally filter by movie via query param ?movie=ID for list endpoint
        qs = super().get_queryset()
        movie_id = self.request.query_params.get('movie')
        if movie_id:
            qs = qs.filter(movie_id=movie_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
