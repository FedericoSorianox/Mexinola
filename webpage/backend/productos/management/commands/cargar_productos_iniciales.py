from django.core.management.base import BaseCommand
from productos.models import Categoria, Producto, Precio

class Command(BaseCommand):
    help = 'Carga productos iniciales desde los datos existentes'

    def handle(self, *args, **options):
        self.stdout.write('Cargando productos iniciales...')
        
        # Crear categorías
        categorias_data = {
            'mixes': {'nombre': 'Mixes', 'icono': '🥜', 'orden': 1},
            'granolas': {'nombre': 'Granolas', 'icono': '🌾', 'orden': 2},
            'semillas': {'nombre': 'Semillas', 'icono': '🌱', 'orden': 3},
            'frutosSecos': {'nombre': 'Frutos Secos', 'icono': '🥜', 'orden': 4},
            'cereales': {'nombre': 'Cereales', 'icono': '🌾', 'orden': 5},
            'frutasDeshidratadas': {'nombre': 'Frutas Deshidratadas', 'icono': '🍎', 'orden': 6},
            'otros': {'nombre': 'Otros', 'icono': '🍯', 'orden': 7},
        }
        
        categorias = {}
        for key, data in categorias_data.items():
            categoria, created = Categoria.objects.get_or_create(
                nombre=data['nombre'],
                defaults=data
            )
            categorias[key] = categoria
            if created:
                self.stdout.write(f'Categoría creada: {categoria.nombre}')
        
        # Datos de productos
        productos_data = {
            'mixes': [
                {
                    'nombre': 'Mix Power',
                    'descripcion': 'Almendras, avellanas, nueces, castañas, ananá, arándanos, semillas de zapallo, maní y pasas de uva',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '500g', 'precio': 400},
                        {'cantidad': '1kg', 'precio': 730}
                    ]
                },
                {
                    'nombre': 'Mix Power Caramelizado con Miel',
                    'descripcion': 'Mix power con miel caramelizada',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '500g', 'precio': 400}
                    ]
                },
                {
                    'nombre': 'Mix Picada',
                    'descripcion': 'Maní, semillas de zapallo y maíz crujiente todo condimentado',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '250g', 'precio': 170},
                        {'cantidad': '500g', 'precio': 300}
                    ]
                },
                {
                    'nombre': 'Mix para Ensalada',
                    'descripcion': 'Lino, lino dorado, girasol, semillas de zapallo, sésamo y sésamo negro',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '150g', 'precio': 100}
                    ]
                }
            ],
            'granolas': [
                {
                    'nombre': 'Granola Mexinola',
                    'descripcion': 'Avena, lino, girasol, sésamo, maní, almendras, pasas de uva, ojuelas, coco rallado y miel',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '500g', 'precio': 250},
                        {'cantidad': '1kg', 'precio': 500}
                    ]
                },
                {
                    'nombre': 'Mexinola Golden',
                    'descripcion': 'Granola + avellanas, almendras, nueces y castañas de cajú con miel',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '500g', 'precio': 350},
                        {'cantidad': '1kg', 'precio': 650}
                    ]
                },
                {
                    'nombre': 'Mexinola Superchocolate',
                    'descripcion': 'Mexinola + almendras y nueces cubiertas con chocolate + chispas',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '500g', 'precio': 350},
                        {'cantidad': '1kg', 'precio': 650}
                    ]
                },
                {
                    'nombre': 'Mexinola Tropical',
                    'descripcion': 'Mexinola + higos turcos, bayas de goji, naranjas confitadas, ananá en cubos, arándanos pasa y damascos',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '500g', 'precio': 350},
                        {'cantidad': '1kg', 'precio': 650}
                    ]
                }
            ],
            'semillas': [
                {
                    'nombre': 'Semillas de Zapallo con Cúrcuma y Aceite de Oliva',
                    'descripcion': 'Semillas de zapallo condimentadas',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 75}
                    ]
                },
                {
                    'nombre': 'Girasol',
                    'descripcion': 'Semillas de girasol tostadas',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 27}
                    ]
                },
                {
                    'nombre': 'Maní',
                    'descripcion': 'Maní tostado natural',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 28}
                    ]
                },
                {
                    'nombre': 'Sésamo Integral',
                    'descripcion': 'Sésamo integral tostado',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 28}
                    ]
                },
                {
                    'nombre': 'Lino',
                    'descripcion': 'Semillas de lino',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 20}
                    ]
                },
                {
                    'nombre': 'Chía',
                    'descripcion': 'Semillas de chía',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 45}
                    ]
                }
            ],
            'frutosSecos': [
                {
                    'nombre': 'Avellanas Tostadas',
                    'descripcion': 'Avellanas tostadas premium',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 150}
                    ]
                },
                {
                    'nombre': 'Almendras Tostadas',
                    'descripcion': 'Almendras tostadas naturales',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 90}
                    ]
                },
                {
                    'nombre': 'Castañas Tostadas',
                    'descripcion': 'Castañas tostadas enteras',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 95}
                    ]
                },
                {
                    'nombre': 'Castañas en Trozo Tostadas',
                    'descripcion': 'Castañas tostadas en trozos',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 70}
                    ]
                },
                {
                    'nombre': 'Nueces',
                    'descripcion': 'Nueces premium',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 85}
                    ]
                }
            ],
            'cereales': [
                {
                    'nombre': 'Avena',
                    'descripcion': 'Avena integral',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 20}
                    ]
                },
                {
                    'nombre': 'Maíz Crujiente con Sal',
                    'descripcion': 'Maíz crujiente condimentado con sal',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 60}
                    ]
                },
                {
                    'nombre': 'Maíz Crujiente Mostaza Miel',
                    'descripcion': 'Maíz crujiente con mostaza y miel',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 75}
                    ]
                }
            ],
            'frutasDeshidratadas': [
                {
                    'nombre': 'Ananá en Cubo',
                    'descripcion': 'Ananá deshidratada en cubos',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 80}
                    ]
                },
                {
                    'nombre': 'Banana Chip',
                    'descripcion': 'Banana deshidratada en chips',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 55}
                    ]
                },
                {
                    'nombre': 'Baya Goji',
                    'descripcion': 'Bayas de goji deshidratadas',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 130}
                    ]
                },
                {
                    'nombre': 'Cereza',
                    'descripcion': 'Cerezas deshidratadas',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 70}
                    ]
                },
                {
                    'nombre': 'Ciruela Pasa',
                    'descripcion': 'Ciruelas pasas',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 70}
                    ]
                },
                {
                    'nombre': 'Arándano Pasa',
                    'descripcion': 'Arándanos deshidratados',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 60}
                    ]
                },
                {
                    'nombre': 'Pasa de Uva',
                    'descripcion': 'Pasas de uva',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 25}
                    ]
                },
                {
                    'nombre': 'Dátil',
                    'descripcion': 'Dátiles naturales',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 50}
                    ]
                },
                {
                    'nombre': 'Higos Turcos',
                    'descripcion': 'Higos turcos deshidratados',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 90}
                    ]
                },
                {
                    'nombre': 'Naranja Confitada',
                    'descripcion': 'Naranjas confitadas',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 90}
                    ]
                },
                {
                    'nombre': 'Papaya en Cubo',
                    'descripcion': 'Papaya deshidratada en cubos',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 75}
                    ]
                },
                {
                    'nombre': 'Tomate Deshidratado',
                    'descripcion': 'Tomates deshidratados',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 90}
                    ]
                },
                {
                    'nombre': 'Coco Rallado',
                    'descripcion': 'Coco rallado deshidratado',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 60}
                    ]
                }
            ],
            'otros': [
                {
                    'nombre': 'Quinoa',
                    'descripcion': 'Quinoa integral premium',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '500g', 'precio': 160},
                        {'cantidad': '1kg', 'precio': 300}
                    ]
                },
                {
                    'nombre': 'Quinoa Roja',
                    'descripcion': 'Quinoa roja premium',
                    'imagen_url': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '500g', 'precio': 190}
                    ]
                },
                {
                    'nombre': 'Miel',
                    'descripcion': 'Miel pura natural',
                    'imagen_url': 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '1kg', 'precio': 200}
                    ]
                },
                {
                    'nombre': 'Jalea de Membrillo',
                    'descripcion': 'Jalea artesanal de membrillo',
                    'imagen_url': 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': 'Frasco', 'precio': 300}
                    ]
                },
                {
                    'nombre': 'Tomates Secos en Aceite',
                    'descripcion': 'Tomates secos en aceite con sazón, ideal para picadas, humus o ensaladas',
                    'imagen_url': 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '250g', 'precio': 200}
                    ]
                },
                {
                    'nombre': 'Conservas en Vinagre',
                    'descripcion': 'Hongos, morrones, pickles, ajíes',
                    'imagen_url': 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': 'Pote Grande', 'precio': 230}
                    ]
                },
                {
                    'nombre': 'Flor de Hibisco Té',
                    'descripcion': 'Té de flor de hibisco',
                    'imagen_url': 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                    'precios': [
                        {'cantidad': '100g', 'precio': 150}
                    ]
                }
            ]
        }
        
        # Crear productos
        productos_creados = 0
        for categoria_key, productos_list in productos_data.items():
            categoria = categorias[categoria_key]
            
            for producto_data in productos_list:
                producto, created = Producto.objects.get_or_create(
                    nombre=producto_data['nombre'],
                    defaults={
                        'descripcion': producto_data['descripcion'],
                        'categoria': categoria,
                        'imagen_url': producto_data['imagen_url'],
                        'destacado': producto_data['nombre'] in ['Granola Mexinola', 'Mix Power', 'Miel']
                    }
                )
                
                if created:
                    productos_creados += 1
                    self.stdout.write(f'Producto creado: {producto.nombre}')
                
                # Crear precios
                for precio_data in producto_data['precios']:
                    Precio.objects.get_or_create(
                        producto=producto,
                        cantidad=precio_data['cantidad'],
                        defaults={
                            'precio': precio_data['precio'],
                            'moneda': 'ARS'
                        }
                    )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'¡Carga completada! Se crearon {productos_creados} productos nuevos.'
            )
        ) 