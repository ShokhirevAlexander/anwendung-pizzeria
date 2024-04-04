from django.contrib import admin

from basket.models import Basket


@admin.register(Basket)
class BasketAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'product_size', 'product_price', 'created_timestamp')
