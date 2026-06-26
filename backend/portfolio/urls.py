# This file is the "table of contents" for all URLs in the Django project.
# Django reads this when a request comes in and finds the right view to call.

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # The built-in admin panel — visit /admin/ in your browser
    path('admin/', admin.site.urls),

    # Any URL starting with /api/contact/ is handled by the contact app
    # include() delegates to contact/urls.py
    path('api/contact/', include('contact.urls')),
]