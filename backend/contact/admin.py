from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    # Columns shown in the list view
    list_display  = ['name', 'email', 'subject', 'created_at']
    # Make it searchable by name, email, or subject
    search_fields = ['name', 'email', 'subject']
    # Filter sidebar by date
    list_filter   = ['created_at']
    # Messages are read-only in admin — don't edit received messages
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']