from django.db import models
from django.utils.text import slugify
from cloudinary.models import CloudinaryField

class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    icono = models.CharField(max_length=10, default='🌱')
    descripcion = models.TextField(blank=True)
    orden = models.IntegerField(default=0)
    activa = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['orden', 'nombre']
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    descripcion = models.TextField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    
    # Campo imagen usando Cloudinary
    imagen = CloudinaryField('imagen', blank=True, null=True)
    imagen_url = models.URLField(blank=True, null=True, help_text="URL de imagen externa (fallback)")
    
    destacado = models.BooleanField(default=False)
    activo = models.BooleanField(default=True)
    stock_disponible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    @property
    def imagen_final(self):
        """Retorna la imagen de Cloudinary si existe, sino la URL externa"""
        if self.imagen:
            return self.imagen.url
        return self.imagen_url

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['-created_at']

class Precio(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='precios')
    cantidad = models.CharField(max_length=50, help_text="Ej: 100g, 500g, 1kg")
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    moneda = models.CharField(max_length=3, default='ARS')
    activo = models.BooleanField(default=True)
    orden = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['orden', 'precio']
        verbose_name = 'Precio'
        verbose_name_plural = 'Precios'
        unique_together = ['producto', 'cantidad']

    def __str__(self):
        return f"{self.producto.nombre} - {self.cantidad}: ${self.precio}"

    @property
    def precio_formateado(self):
        """Retorna el precio formateado como string"""
        return f"${self.precio}"