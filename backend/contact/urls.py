from django.urls import path
from . import views

# The empty string '' means the full URL is whatever was passed from portfolio/urls.py
# Since we registered 'api/contact/' there, this view is at: /api/contact/
urlpatterns = [
    path('', views.contact, name='contact'),
]