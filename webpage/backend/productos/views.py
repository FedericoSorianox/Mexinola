from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Categoria, Producto, Precio
from .serializers import (
    CategoriaSerializer, 
    ProductoSerializer, 
    ProductoListSerializer,
    ProductoDetailSerializer,
    PrecioSerializer
)

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para categorías de productos.
    Solo permite lectura (GET).
    """
    queryset = Categoria.objects.filter(activa=True)
    serializer_class = CategoriaSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['nombre', 'orden']
    ordering = ['orden', 'nombre']

class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para productos.
    Solo permite lectura (GET).
    """
    queryset = Producto.objects.filter(activo=True).select_related('categoria').prefetch_related('precios')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categoria', 'destacado', 'stock_disponible']
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['nombre', 'created_at', 'destacado']
    ordering = ['-destacado', 'nombre']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductoDetailSerializer
        return ProductoListSerializer

    @action(detail=False, methods=['get'])
    def destacados(self, request):
        """Retorna solo productos destacados"""
        productos = self.queryset.filter(destacado=True)
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def por_categoria(self, request):
        """Retorna productos agrupados por categoría"""
        categorias = Categoria.objects.filter(activa=True)
        resultado = []
        
        for categoria in categorias:
            productos = self.queryset.filter(categoria=categoria)
            if productos.exists():
                serializer = self.get_serializer(productos, many=True)
                resultado.append({
                    'categoria': CategoriaSerializer(categoria).data,
                    'productos': serializer.data
                })
        
        return Response(resultado)

    @action(detail=False, methods=['get'])
    def aleatorios(self, request):
        """Retorna productos en orden aleatorio"""
        cantidad = int(request.query_params.get('cantidad', 10))
        productos = self.queryset.order_by('?')[:cantidad]
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

class PrecioViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para precios de productos.
    Solo permite lectura (GET).
    """
    queryset = Precio.objects.filter(activo=True).select_related('producto')
    serializer_class = PrecioSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['producto', 'moneda']
    ordering_fields = ['precio', 'cantidad']
    ordering = ['precio'] 