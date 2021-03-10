from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Item, Post

class ItemSerializer(serializers.ModelSerializer):
    # token = serializers.CharField(write_only=True)        
    # image = serializers.ImageField(required=False, use_url=True)
    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'image', 'created_by', 'updated_by', 'created_at', 'updated_at')        
    
    # def create(self, validated_data):        
    #     print(validated_data)
    #     user = Token.objects.get(key=validated_data['token']).user                
    #     item = Item(
    #         name=validated_data['name'],
    #         description=validated_data['description'],
    #         created_by=user 
    #     )
    #     item.save()
    #     return item

    # def update(self, instance, validated_data):        
    #     print(validated_data)
    #     user = Token.objects.get(key=validated_data['token']).user   
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.updated_by = user
    #     instance.image = validated_data.get('image', instance.image)
    #     instance.save()
    #     return instance

class PostSerializer(serializers.ModelSerializer):       
    token = serializers.CharField(write_only=True)        
    thumbnail = serializers.ImageField(required=False, use_url=True)            
    class Meta:
        model = Post
        fields = (
            'id', 'title', 'content', 'thumbnail', 'created_at', 'created_by', 'token'            
        ) 

    def create(self, validated_data):                   
        user = Token.objects.get(key=validated_data['token']).user                
        post = Post(
            title=validated_data['title'],
            content=validated_data['content'],
            thumbnail=validated_data['thumbnail'],
            created_by=user 
        )
        post.save()
        return post

    def update(self, instance, validated_data):                
        user = Token.objects.get(key=validated_data['token']).user   
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.thumbnail = validated_data.get('thumbnail', instance.thumbnail)
        instance.updated_by = user        
        instance.save()
        return instance