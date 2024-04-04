# Generated by Django 3.2.12 on 2024-04-04 10:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Basket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1, verbose_name='количество')),
                ('product_size', models.CharField(default='26cm', max_length=4, verbose_name='размер пиццы')),
                ('product_price', models.DecimalField(decimal_places=2, max_digits=6, verbose_name='цена')),
                ('created_timestamp', models.DateTimeField(auto_now_add=True, verbose_name='время покупки')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product', verbose_name='продукт')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to=settings.AUTH_USER_MODEL, verbose_name='пользователь')),
            ],
            options={
                'verbose_name': 'корзина',
                'verbose_name_plural': 'корзина',
            },
        ),
    ]
