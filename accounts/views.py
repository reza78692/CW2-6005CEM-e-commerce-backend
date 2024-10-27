from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model, login, authenticate, logout
from django.shortcuts import render, redirect
from django.contrib.auth.password_validation import validate_password
from .serializers import CustomUserSerializer
from .forms import CustomUserCreationForm, CustomAuthenticationForm
from django.middleware.csrf import get_token
from django.http import JsonResponse


CustomUser = get_user_model()

# User ViewSet for API (allows for listing, creating, retrieving, updating, and deleting users via API)
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# API User Registration View
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password1')
    password2 = request.data.get('password2')
    user_type = request.data.get('user_type', 'customer')

    if password != password2:
        return Response({"detail": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        validate_password(password)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(username=username).exists():
        return Response({"detail": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.create_user(username=username, email=email, password=password, user_type=user_type)
    user.save()
    return Response({"detail": "User registered successfully."}, status=status.HTTP_201_CREATED)

# API Endpoint for a Custom Message
@api_view(['GET'])
def endpoint_view(request):
    return Response({'message': 'Endpoint response'}, status=status.HTTP_200_OK)

# User Registration View for Web
def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = CustomUserCreationForm()
    
    return render(request, 'register.html', {'form': form})

# API User Login View
@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({"detail": "Login successful!"}, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# User Login View for Web
def user_login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(data=request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('home')
    else:
        form = CustomAuthenticationForm()
    
    return render(request, 'login.html', {'form': form})

# API User Logout View
@api_view(['POST'])
def user_logout(request):
    logout(request)
    return Response({"detail": "Successfully logged out."})


def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

