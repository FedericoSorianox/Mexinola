from django.contrib import admin
from .models import Categoria, Producto, Precio

class PrecioInline(admin.TabularInline):
    model = Precio
    extra = 1
    fields = ['cantidad', 'precio', 'moneda', 'activo', 'orden']

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'icono', 'orden', 'activa', 'productos_count']
    list_filter = ['activa', 'created_at']
    search_fields = ['nombre', 'descripcion']
    ordering = ['orden', 'nombre']
    prepopulated_fields = {'slug': ('nombre',)}
    
    def productos_count(self, obj):
        return obj.productos.count()
    productos_count.short_description = 'Productos'

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'destacado', 'activo', 'stock_disponible', 'precios_count', 'created_at']
    list_filter = ['categoria', 'destacado', 'activo', 'stock_disponible', 'created_at']
    search_fields = ['nombre', 'descripcion']
    ordering = ['-destacado', 'nombre']
    prepopulated_fields = {'slug': ('nombre',)}
    inlines = [PrecioInline]
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Información Básica', {
            'fields': ('nombre', 'slug', 'descripcion', 'categoria')
        }),
        ('Imagen', {
            'fields': ('imagen', 'imagen_url'),
            'classes': ('collapse',)
        }),
        ('Estado', {
            'fields': ('destacado', 'activo', 'stock_disponible')
        }),
        ('Fechas', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def precios_count(self, obj):
        return obj.precios.count()
    precios_count.short_description = 'Precios'

@admin.register(Precio)
class PrecioAdmin(admin.ModelAdmin):
    list_display = ['producto', 'cantidad', 'precio_formateado', 'moneda', 'activo', 'orden']
    list_filter = ['activo', 'moneda', 'producto__categoria']
    search_fields = ['producto__nombre', 'cantidad']
    ordering = ['producto__nombre', 'precio']
    list_editable = ['activo', 'orden'] 