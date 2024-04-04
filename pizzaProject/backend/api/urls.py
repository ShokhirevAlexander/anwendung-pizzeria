from django.urls import path, include

from api.views import CategoryList, ProductList, ProductDetail, BasketView

from rest_framework.routers import SimpleRouter


routers = SimpleRouter()
routers.register('category', CategoryList,)
routers.register('product', ProductList)
routers.register('basket', BasketView)

urlpatterns = [
    path('', include(routers.urls)),
    path('product/<int:id>/', ProductDetail.as_view()),
    path('add_product/<int:product_id>/', ProductDetail.as_view()),
]
