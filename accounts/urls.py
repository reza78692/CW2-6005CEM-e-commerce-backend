from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
from .views import get_csrf_token, register_user, user_login, user_logout, endpoint_view

# Initialize the DefaultRouter
router = DefaultRouter()
router.register(r'users', views.UserViewSet)

# Define the urlpatterns for both views and the router
urlpatterns = [
    path('csrf/', get_csrf_token, name='csrf_token'),           # CSRF token endpoint
    path('register/', register_user, name='register_user'),      # API registration
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('endpoint/', endpoint_view, name='endpoint'),
]

# Add the router URLs to the urlpatterns
urlpatterns += router.urls
