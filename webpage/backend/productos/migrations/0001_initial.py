# Generated by Django 4.2.7 on 2025-07-22 11:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(blank=True, max_length=100, unique=True)),
                ('icono', models.CharField(default='🌱', max_length=10)),
                ('descripcion', models.TextField(blank=True)),
                ('orden', models.IntegerField(default=0)),
                ('activa', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Categoría',
                'verbose_name_plural': 'Categorías',
                'ordering': ['orden', 'nombre'],
            },
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, max_length=200, unique=True)),
                ('descripcion', models.TextField()),
                ('imagen', models.ImageField(blank=True, null=True, upload_to='productos/')),
                ('imagen_url', models.URLField(blank=True, help_text='URL de imagen externa (Unsplash, etc.)', null=True)),
                ('destacado', models.BooleanField(default=False)),
                ('activo', models.BooleanField(default=True)),
                ('stock_disponible', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productos', to='productos.categoria')),
            ],
            options={
                'verbose_name': 'Producto',
                'verbose_name_plural': 'Productos',
                'ordering': ['-destacado', 'nombre'],
            },
        ),
        migrations.CreateModel(
            name='Precio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.CharField(help_text='Ej: 100g, 500g, 1kg', max_length=50)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('moneda', models.CharField(default='ARS', max_length=3)),
                ('activo', models.BooleanField(default=True)),
                ('orden', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='precios', to='productos.producto')),
            ],
            options={
                'verbose_name': 'Precio',
                'verbose_name_plural': 'Precios',
                'ordering': ['orden', 'precio'],
                'unique_together': {('producto', 'cantidad')},
            },
        ),
    ]
