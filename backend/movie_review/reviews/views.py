
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


