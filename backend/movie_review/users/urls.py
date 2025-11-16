from django.urls import path
from .views import RegisterView, UserDetailView, CurrentUserView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('<int:pk>/', UserDetailView.as_view()),
    path('me/', CurrentUserView.as_view()),
]
