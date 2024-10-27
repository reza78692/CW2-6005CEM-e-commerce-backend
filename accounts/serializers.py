from rest_framework import serializers
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone_number', 'user_type', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'phone_number': {'required': False},  # Assuming this might not be required
            'user_type': {'required': False}  # Assuming this might not be required
        }

    def validate_email(self, value):
        # Ensure email belongs to a specific domain (if needed)
        if 'example.com' not in value:
            raise serializers.ValidationError("Email must be under the 'example.com' domain.")
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', None),
            user_type=validated_data.get('user_type', None)
        )
        return user
