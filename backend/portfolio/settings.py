from pathlib import Path
# decouple reads values from our .env file
from decouple import config
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# Read SECRET_KEY from .env so it's never in our code
SECRET_KEY = config('SECRET_KEY')

# In development this is True; in production set to False
DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# ── INSTALLED APPS ────────────────────────────────────────────────────────────
# These are all the "features" Django knows about
INSTALLED_APPS = [
    'django.contrib.admin',       # the built-in admin panel at /admin/
    'django.contrib.auth',        # user authentication
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party packages we installed
    'rest_framework',   # Django REST Framework — for building JSON APIs
    'corsheaders',      # allows React (port 3000) to call Django (port 8000)

    # Our own apps
    'contact',          # the contact form feature
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # must be first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ── CORS ──────────────────────────────────────────────────────────────────────
# Allow the React dev server to call our API
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

ROOT_URLCONF = 'portfolio.urls'

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {
        'context_processors': [
            'django.template.context_processors.debug',
            'django.template.context_processors.request',
            'django.contrib.auth.context_processors.auth',
            'django.contrib.messages.context_processors.messages',
        ],
    },
}]

WSGI_APPLICATION = 'portfolio.wsgi.application'

# ── DATABASE ──────────────────────────────────────────────────────────────────
# Read the full Supabase connection URL from .env
DATABASES = {
    'default': dj_database_url.parse(config('DATABASE_URL'))
}

# ── EMAIL ─────────────────────────────────────────────────────────────────────
# These settings tell Django how to send emails via Gmail
EMAIL_BACKEND  = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST     = config('EMAIL_HOST')
EMAIL_PORT     = config('EMAIL_PORT', cast=int)
EMAIL_USE_TLS  = True
EMAIL_HOST_USER     = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')

# Who receives the contact form notifications
EMAIL_RECIPIENT = config('EMAIL_RECIPIENT')

# ── REST FRAMEWORK ────────────────────────────────────────────────────────────
REST_FRAMEWORK = {
    # Anyone can call the API (no login required)
    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.AllowAny'],
}

# Standard Django settings below
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Nairobi'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
