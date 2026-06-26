from django.db import models

class ContactMessage(models.Model):
    """
    Represents one message sent through the contact form.
    Each field below becomes a column in the database table.
    """

    # CharField = text with a max length
    name    = models.CharField(max_length=100)
    email   = models.EmailField()          # validates it's a real email format
    subject = models.CharField(max_length=200)

    # TextField = unlimited text (for the message body)
    message = models.TextField()

    # auto_now_add=True means Django fills this in automatically when saved
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # This controls how a message appears in the Django admin panel
        return f"{self.name} — {self.subject}"

    class Meta:
        # Show newest messages first in the admin
        ordering = ['-created_at']