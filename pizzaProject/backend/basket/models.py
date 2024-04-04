from django.db import models
from django.contrib.auth.models import User
from product.models import Product


class BasketQuerySet(models.QuerySet):
    def total_sum(self):
        return sum(basket.sum() for basket in self)

    def total_quantity(self):
        return sum(basket.quantity for basket in self)


class Basket(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='пользователь',
        related_name='users'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='продукт')
    quantity = models.PositiveIntegerField(default=1, verbose_name='количество')
    product_size = models.CharField(max_length=4, default='26cm', verbose_name='размер пиццы')
    product_price = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='цена')
    created_timestamp = models.DateTimeField(auto_now_add=True, verbose_name='время покупки')
    objects = BasketQuerySet.as_manager()

    class Meta:
        verbose_name = 'корзина'
        verbose_name_plural = 'корзина'

    def __str__(self):
        return f"Корзина товара {self.user.username}"

    def sum(self):
        return self.product_price * self.quantity

    @classmethod
    def create_or_update_basket(cls, user, product_id, size, price, quantity):
        existing_basket = cls.objects.filter(
            product_id=product_id,
            product_size=size,
            product_price=price,
            user=user,
            quantity=quantity
        ).first()

        if existing_basket:
            new_basket = cls.objects.create(
                user=user,
                product_id=product_id,
                product_size=size,
                product_price=price,
                quantity=quantity
            )
            return new_basket
