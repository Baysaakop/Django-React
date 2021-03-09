from .models import Profile
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import viewsets
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
