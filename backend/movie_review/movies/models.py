

# Create your models here.
from django.db import models
class Movie(models.Model):
    title = models.CharField(max_length=255)
    director = models.CharField(max_length=255)
    genre = models.CharField(max_length=50)
    release_date = models.DateField()
    description = models.TextField()
    poster = models.URLField(max_length=500, blank=True, null=True)  #
    created_at = models.DateTimeField(auto_now_add=True)
    featured = models.BooleanField(default=False)

    def average_rating(self):
        reviews = self.reviews.all()
        return round(sum([r.rating for r in reviews])/reviews.count(),2) if reviews.exists() else 0
    def __str__(self):
        return self.title

