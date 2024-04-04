from django.db import models


class Category(models.Model):
    """ Категории продукта """
    title = models.CharField(max_length=25, verbose_name='категория')

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=25, verbose_name='наименование')
    image = models.ImageField(upload_to='images/%Y', verbose_name='изображение')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='категория')

    class Meta:
        verbose_name = 'продукт'
        verbose_name_plural = 'продукты'
        unique_together = ['title']

    def __str__(self):
        return self.title


class ProductSize(models.Model):
    PRODUCT_SIZE = (
        ('26cm', '26см'),
        ('30cm', '30см'),
        ('40cm', '40см')
    )
    size = models.CharField(
        blank=True,
        max_length=4,
        choices=PRODUCT_SIZE,
        verbose_name='размер')
    price = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='цена')
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        verbose_name='продукт',
        related_name='products_size'
    )

    class Meta:
        verbose_name = 'размер и цена'
        verbose_name_plural = 'размеры и цены'

    def __str__(self):
        return self.size

    def get_type_test(self):
        return self.type_of_test.type_of_test


class TypeOfTest(models.Model):
    TYPE_TEST = (
        ('thin', 'тонкое'),
        ('traditional', 'традиционное')
    )
    type_of_test = models.CharField(max_length=12, choices=TYPE_TEST, verbose_name='тип теста')
    product_test = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='product_tests')

    class Meta:
        verbose_name = 'тип теста'
