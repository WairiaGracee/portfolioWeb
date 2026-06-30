from rest_framework import serializers
from .models import Project, Testimonial


class ProjectSerializer(serializers.ModelSerializer):
    # This calls the `image` @property on the model (upload OR url, whichever is set)
    # and turns it into a field the frontend can read
    image = serializers.SerializerMethodField()

    # Convert "React, Django, PostgreSQL" into ["React", "Django", "PostgreSQL"]
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'tagline', 'description',
            'tags', 'category', 'image',
            'github_url', 'live_url',
        ]

    def get_image(self, obj):
        request = self.context.get('request')
        image_path = obj.image
        if image_path and request:
            # Build a full URL like http://localhost:8000/media/projects/x.jpg
            # Only needed for uploaded files — external URLs are already full
            if image_path.startswith('http'):
                return image_path
            return request.build_absolute_uri(image_path)
        return image_path

    def get_tags(self, obj):
        # Split on commas and strip whitespace from each tag
        return [tag.strip() for tag in obj.tags.split(',') if tag.strip()]


class TestimonialSerializer(serializers.ModelSerializer):
    author_photo = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = ['id', 'author_name', 'author_role', 'quote', 'author_photo']

    def get_author_photo(self, obj):
        request = self.context.get('request')
        if obj.author_photo and request:
            return request.build_absolute_uri(obj.author_photo.url)
        return None