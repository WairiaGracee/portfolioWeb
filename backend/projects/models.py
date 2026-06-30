from django.db import models

class Project(models.Model):
    """
    One project card shown on the Work page.
    You'll fill these fields in through the Django admin panel.
    """

    title       = models.CharField(max_length=100)
    tagline     = models.CharField(max_length=200)
    description = models.TextField()

    # Comma-separated tags, e.g. "React, Django, PostgreSQL"
    # We split this into a list when sending it to the frontend
    tags = models.CharField(
        max_length=300,
        help_text="Separate tags with commas, e.g. React, Django, PostgreSQL"
    )

    category = models.CharField(
        max_length=50,
        choices=[
            ('Full-Stack',  'Full-Stack'),
            ('Open Source', 'Open Source'),
            ('Product',     'Product'),
        ],
        default='Full-Stack',
    )

    # ── Image: upload OR url, uploaded file takes priority ──────────────────
    image_upload = models.ImageField(
        upload_to='projects/',     # saved inside media/projects/
        blank=True, null=True,
        help_text="Upload a screenshot directly (preferred)"
    )
    image_url = models.URLField(
        blank=True,
        help_text="Or paste an image URL instead, if not uploading a file"
    )

    github_url = models.URLField(blank=True, null=True)
    live_url   = models.URLField(blank=True, null=True)

    # Controls display order — lower numbers show first
    order = models.PositiveIntegerField(default=0)

    # Toggle to hide a project without deleting it
    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    @property
    def image(self):
        """
        Returns whichever image source is set.
        Prefers the uploaded file; falls back to the pasted URL.
        """
        if self.image_upload:
            return self.image_upload.url
        return self.image_url or None


class Testimonial(models.Model):
    """
    A client/collaborator review shown on the Work page.
    """

    author_name = models.CharField(max_length=100)
    author_role = models.CharField(
        max_length=150,
        help_text="e.g. 'CEO, AgriLink' or 'Frontend Developer, Acme Co'"
    )
    quote = models.TextField()

    author_photo = models.ImageField(
        upload_to='testimonials/',
        blank=True, null=True,
        help_text="Optional headshot"
    )

    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.author_name} — {self.author_role}"
