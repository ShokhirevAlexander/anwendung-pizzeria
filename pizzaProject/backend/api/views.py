from rest_framework import viewsets, generics
from rest_framework import status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from api.pagination import StandardResultsSetPagination
from product.models import Category, Product
from basket.models import Basket
from api.serializer import CategorySerializer, ProductSerializer, BasketSerializer


class CategoryList(viewsets.ModelViewSet):
    """ Категории продуктов """
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend]


class ProductList(viewsets.ModelViewSet):
    """ Продукты """
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    pagination_class = StandardResultsSetPagination
    filterset_fields = ['category__id']
    ordering_fields = ['title', 'category__title']
    search_fields = ['$title']


class ProductDetail(generics.GenericAPIView):
    """ Детализация продукта """
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'


class BasketView(viewsets.ModelViewSet):
    """ Корзина товаров """
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super(BasketView, self).get_queryset()
        return queryset.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        all_products = request.data['items']
        baskets_created = []
        for product in all_products:
            try:
                pizza = Product.objects.get(id=product['id'])
                if not pizza:
                    return Response({'product_id': 'Такой пиццы не существует'}, status=status.HTTP_400_BAD_REQUEST)

                basket = Basket.objects.create(
                    user=self.request.user,
                    product=pizza,
                    product_size=product['size'],
                    product_price=product['price'],
                    quantity=product['count']
                )
                baskets_created.append(basket)
            except KeyError:
                return Response({'product_id': 'Неверные данные о продукте'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(baskets_created, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
