from rest_framework import serializers, fields

from django.contrib.auth.models import User

from product.models import Category, ProductSize, Product, TypeOfTest
from basket.models import Basket


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ('id', 'size', 'price',)


class TypeOfTestSerializer(serializers.ModelSerializer):
    type_of_test = serializers.SerializerMethodField()

    class Meta:
        model = TypeOfTest
        fields = ('type_of_test',)

    def get_type_of_test(self, obj):
        return obj.get_type_of_test_display()


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    products_size = ProductSizeSerializer(many=True)
    product_tests = TypeOfTestSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class ProductBasketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('title',)


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class BasketSerializer(serializers.ModelSerializer):
    product = ProductBasketSerializer()
    sum = fields.FloatField(required=False)
    total_sum = fields.SerializerMethodField()

    class Meta:
        model = Basket
        fields = ('user', 'product', 'quantity', 'product_size', 'product_price', 'sum', 'total_sum')
        read_only_fields = ('created_timestamp',)

    def get_total_sum(self, obj):
        return Basket.objects.filter(user_id=obj.user.id).total_sum()
