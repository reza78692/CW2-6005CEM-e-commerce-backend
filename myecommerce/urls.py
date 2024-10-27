"""
URL configuration for myecommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from . import views  # Import the home view from current app (if implemented)

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site
    path('accounts/', include('accounts.urls')),  # URLs for user registration, login, etc.
    path('api/', include('accounts.urls')),  # API URLs for the user-related API views
    path('', views.home, name='home'),  # Home page view (to be implemented in views.py)
]
