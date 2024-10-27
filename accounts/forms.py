from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model

# Get the custom user model
CustomUser = get_user_model()

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        # Include the 'user_type' field in the registration form
        fields = ('username', 'email', 'password1', 'password2', 'user_type')

    # Optionally, you can add labels or choices for better customization
    def __init__(self, *args, **kwargs):
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)
        self.fields['user_type'].choices = [
            ('admin', 'Admin'),
            ('vendor', 'Vendor'),
            ('customer', 'Customer')
        ]

class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'password')
