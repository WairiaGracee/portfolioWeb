from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.core.mail import send_mail
from django.conf import settings

from .models import ContactMessage

# @api_view(['POST']) means this view only accepts POST requests
# Sending a GET request here will return 405 Method Not Allowed
@api_view(['POST'])
def contact(request):
    """
    Receives the contact form data, saves it to the database,
    and sends an email notification to Grace.
    """

    # request.data is the JSON body parsed into a Python dictionary
    data = request.data

    # ── Validate ──────────────────────────────────────────────────────────────
    # Make sure all required fields are present and not empty
    required = ['name', 'email', 'subject', 'message']
    for field in required:
        if not data.get(field, '').strip():
            return Response(
                {'error': f'{field} is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    # ── Save to database ───────────────────────────────────────────────────────
    # ContactMessage.objects.create() runs an INSERT into the database
    msg = ContactMessage.objects.create(
        name    = data['name'].strip(),
        email   = data['email'].strip(),
        subject = data['subject'].strip(),
        message = data['message'].strip(),
    )

    # ── Send email notification ────────────────────────────────────────────────
    # This sends an email to Grace so she's notified immediately
    try:
        send_mail(
            subject = f'Portfolio contact: {msg.subject}',
            message = (
                f'Name: {msg.name}\n'
                f'Email: {msg.email}\n\n'
                f'{msg.message}'
            ),
            from_email = settings.EMAIL_HOST_USER,
            recipient_list = [settings.EMAIL_RECIPIENT],
            fail_silently = False,
        )
    except Exception as e:
        # If email fails, we still return success — the message was saved.
        # In production you'd log this error properly.
        print(f'Email error: {e}')

    # ── Respond ───────────────────────────────────────────────────────────────
    return Response(
        {'message': 'Thank you! I will be in touch shortly.'},
        status=status.HTTP_201_CREATED   # 201 = "Created"
    )
    