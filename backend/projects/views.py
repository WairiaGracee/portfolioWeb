from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Testimonial
from .serializers import ProjectSerializer, TestimonialSerializer


@api_view(['GET'])
def project_list(request):
    """
    Returns all published projects, ordered by their `order` field.
    GET /api/projects/
    """
    projects = Project.objects.filter(is_published=True)
    # context={'request': request} lets the serializer build full image URLs
    serializer = ProjectSerializer(projects, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def testimonial_list(request):
    """
    Returns all published testimonials.
    GET /api/testimonials/
    """
    testimonials = Testimonial.objects.filter(is_published=True)
    serializer = TestimonialSerializer(testimonials, many=True, context={'request': request})
    return Response(serializer.data)