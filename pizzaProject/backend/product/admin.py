from django.contrib import admin

from product.models import Product, ProductSize, Category, TypeOfTest


class ProductSizeAdmin(admin.TabularInline):
    model = ProductSize
    min_num = 1
    extra = 0
    list_display = ('size', 'price')


class TypeOfTestAdmin(admin.TabularInline):
    model = TypeOfTest
    min_num = 1
    extra = 0
    list_display = ('type_of_test',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category',)
    inlines = [ProductSizeAdmin, TypeOfTestAdmin]

    class Meta:
        model = Product
