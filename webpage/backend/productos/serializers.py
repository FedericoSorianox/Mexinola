from rest_framework import serializers
from .models import Categoria, Producto, Precio

class PrecioSerializer(serializers.ModelSerializer):
    precio_formateado = serializers.ReadOnlyField()
    
    class Meta:
        model = Precio
        fields = ['id', 'cantidad', 'precio', 'moneda', 'precio_formateado', 'activo', 'orden']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'slug', 'icono', 'descripcion', 'orden', 'activa']

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    precios = PrecioSerializer(many=True, read_only=True)
    imagen_final = serializers.ReadOnlyField()
    
    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'slug', 'descripcion', 'categoria', 
            'imagen', 'imagen_url', 'imagen_final', 'destacado', 
            'activo', 'stock_disponible', 'precios', 'created_at'
        ]

class ProductoListSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    precio_principal = serializers.SerializerMethodField()
    imagen_final = serializers.ReadOnlyField()
    
    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'slug', 'descripcion', 'categoria',
            'imagen_final', 'destacado', 'precio_principal'
        ]
    
    def get_precio_principal(self, obj):
        """Retorna el precio más bajo del producto"""
        precio = obj.precios.filter(activo=True).order_by('precio').first()
        if precio:
            return {
                'cantidad': precio.cantidad,
                'precio': precio.precio,
                'precio_formateado': precio.precio_formateado
            }
        return None

class ProductoDetailSerializer(ProductoSerializer):
    """Serializer para vista detallada con todos los precios"""
    pass 