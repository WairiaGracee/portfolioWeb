from django.contrib import admin
from .models import Project, Testimonial


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    # Columns shown in the project list view
    list_display  = ['title', 'category', 'is_published', 'order', 'created_at']
    list_editable = ['order', 'is_published']   # edit these two right from the list view
    list_filter   = ['category', 'is_published']
    search_fields = ['title', 'tagline']

    # Groups fields into clean sections on the edit form
    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'tagline', 'description', 'category', 'tags')
        }),
        ('Image', {
            'fields': ('image_upload', 'image_url'),
            'description': 'Upload a file OR paste a URL — uploaded file takes priority if both are set.'
        }),
        ('Links', {
            'fields': ('github_url', 'live_url')
        }),
        ('Display', {
            'fields': ('order', 'is_published')
        }),
    )


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ['author_name', 'author_role', 'is_published', 'order']
    list_editable = ['order', 'is_published']
    search_fields = ['author_name', 'quote']