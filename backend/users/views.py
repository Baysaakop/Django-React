from .models import Profile
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import viewsets
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def update(self, request, *args, **kwargs):                         
        user = self.get_object()              
        if 'username' in request.data:
            user.username=request.data['username']                                     
        if 'first_name' in request.data:
            user.first_name=request.data['first_name'] 
        if 'last_name' in request.data:
            user.last_name=request.data['last_name']   
        if 'phone_number' in request.data:
            user.profile.phone_number=request.data['phone_number']    
        if 'avatar' in request.data:
            user.profile.avatar=request.data['avatar']    
        if 'birth_date' in request.data:
            user.profile.birth_date=request.data['birth_date']        
        user.save()
        serializer = UserSerializer(user)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
