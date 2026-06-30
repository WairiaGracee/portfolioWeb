from django.urls import path
from . import views

urlpatterns = [
    path('projects/',     views.project_list,     name='project-list'),
    path('testimonials/', views.testimonial_list,  name='testimonial-list'),
]