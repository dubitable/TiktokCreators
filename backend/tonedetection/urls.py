from django.urls import path

from . import views

urlpatterns = [
    path("comments/", views.analyze_video, name="comments")
]
