from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Item, Post
from .serializers import ItemSerializer, PostSerializer
from rest_framework import viewsets, filters
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView
from django_filters.rest_framework import DjangoFilterBackend

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def create(self, request, *args, **kwargs):              
        user = Token.objects.get(key=request.data['token']).user   
        item = Item.objects.create(
            name=request.data['name'],                   
            created_by=user        
        )                      
        if 'description' in request.data:
            item.description=request.data['description']    
        if 'image' in request.data:
            item.image=request.data['image']  
        item.save()
        serializer = ItemSerializer(item)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.order_by('-created_at')

# class ItemListView(ListCreateAPIView):
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer

# class ItemDetailView(RetrieveAPIView):
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer

# class ItemCreateView(CreateAPIView):
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer

# class ItemUpdateeView(UpdateAPIView):
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer

# class ItemDeleteView(DestroyAPIView):
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer