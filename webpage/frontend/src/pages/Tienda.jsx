import React from "react";

function Tienda() {
  const [productos, setProductos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filtroCategoria, setFiltroCategoria] = React.useState('todos');
  const [busqueda, setBusqueda] = React.useState('');
  const [ordenamiento, setOrdenamiento] = React.useState('nombre');
  const [vistaGrid, setVistaGrid] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = React.useState(null);
  const [modalAbierto, setModalAbierto] = React.useState(false);

  // Fetch products con mejor manejo de errores
  React.useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Primero intentar con la API real
        const response = await fetch('/api/productos/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results) {
          setProductos(data.results);
        } else if (Array.isArray(data)) {
          setProductos(data);
        } else {
          throw new Error('Formato de datos inesperado');
        }
        
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        
        // Datos de prueba como fallback
        setProductos([
          {
            id: 1,
            nombre: "Miel de Abeja Natural",
            descripcion: "Miel pura y natural, cosechada de colmenas mexicanas",
            categoria: "Endulzantes",
            imagen_final: "https://images.unsplash.com/photo-1587049016823-c90bb1dd5cdc?w=400",
            precios: [{ precio: 150, cantidad: "500g" }]
          },
          {
            id: 2,
            nombre: "Aceite de Coco Orgánico",
            descripcion: "Aceite de coco virgen extra, prensado en frío",
            categoria: "Aceites",
            imagen_final: "https://images.unsplash.com/photo-1582725460074-11b5a1d1c51e?w=400",
            precios: [{ precio: 280, cantidad: "350ml" }]
          },
          {
            id: 3,
            nombre: "Quinoa Real",
            descripcion: "Quinoa boliviana de primera calidad, rica en proteínas",
            categoria: "Granos",
            imagen_final: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
            precios: [{ precio: 120, cantidad: "500g" }]
          },
          {
            id: 4,
            nombre: "Cacao en Polvo",
            descripcion: "Cacao puro sin azúcar, ideal para bebidas y repostería",
            categoria: "Polvos",
            imagen_final: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
            precios: [{ precio: 95, cantidad: "250g" }]
          },
          {
            id: 5,
            nombre: "Té Verde Premium",
            descripcion: "Hojas de té verde seleccionadas, rico en antioxidantes",
            categoria: "Infusiones",
            imagen_final: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
            precios: [{ precio: 85, cantidad: "100g" }]
          },
          {
            id: 6,
            nombre: "Semillas de Chía",
            descripcion: "Semillas de chía orgánicas, fuente de omega-3",
            categoria: "Semillas",
            imagen_final: "https://images.unsplash.com/photo-1595475038665-86db10beeebb?w=400",
            precios: [{ precio: 165, cantidad: "300g" }]
          },
          // Agregando productos de Frutos Secos para que el filtro funcione
          {
            id: 7,
            nombre: "Almendras Naturales",
            descripcion: "Almendras crudas sin sal, ricas en vitamina E",
            categoria: "Frutos Secos",
            imagen_final: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400",
            precios: [{ precio: 220, cantidad: "250g" }]
          },
          {
            id: 8,
            nombre: "Nueces de Castilla",
            descripcion: "Nueces frescas, perfectas para snacks saludables",
            categoria: "Frutos Secos",
            imagen_final: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400",
            precios: [{ precio: 280, cantidad: "200g" }]
          },
          {
            id: 9,
            nombre: "Pistaches Tostados",
            descripcion: "Pistaches ligeramente tostados y sin sal",
            categoria: "Frutos Secos",
            imagen_final: "https://images.unsplash.com/photo-1599735425000-53e588661d46?w=400",
            precios: [{ precio: 350, cantidad: "150g" }]
          },
          {
            id: 10,
            nombre: "Mix de Frutos Secos",
            descripcion: "Mezcla balanceada de almendras, nueces y pistaches",
            categoria: "Frutos Secos",
            imagen_final: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
            precios: [{ precio: 180, cantidad: "200g" }]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter and sort products
  const productosFiltrados = React.useMemo(() => {
    console.log('Filtro aplicado:', filtroCategoria);
    console.log('Productos disponibles:', productos.map(p => ({ nombre: p.nombre, categoria: p.categoria })));
    
    let filtered = productos.filter(producto => {
      const matchesBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            (producto.descripcion || '').toLowerCase().includes(busqueda.toLowerCase());
      
      if (filtroCategoria === 'todos') return matchesBusqueda;
      
      const categoriaProducto = typeof producto.categoria === 'object' && producto.categoria !== null 
        ? producto.categoria.nombre || producto.categoria.id 
        : producto.categoria;
      
      const categoriaMatch = categoriaProducto === filtroCategoria;
      console.log(`Producto: ${producto.nombre}, Categoría: ${categoriaProducto}, Filtro: ${filtroCategoria}, Match: ${categoriaMatch && matchesBusqueda}`);
      
      return matchesBusqueda && categoriaMatch;
    });

    console.log('Productos filtrados:', filtered.length);

    return filtered.sort((a, b) => {
      switch (ordenamiento) {
        case 'precio': {
          const precioA = a.precios?.[0]?.precio || a.precio_principal?.precio || 0;
          const precioB = b.precios?.[0]?.precio || b.precio_principal?.precio || 0;
          return precioA - precioB;
        }
        case 'precio-desc': {
          const precioADesc = a.precios?.[0]?.precio || a.precio_principal?.precio || 0;
          const precioBDesc = b.precios?.[0]?.precio || b.precio_principal?.precio || 0;
          return precioBDesc - precioADesc;
        }
        case 'nombre':
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });
  }, [productos, busqueda, filtroCategoria, ordenamiento]);

  const categorias = React.useMemo(() => {
    const cats = [...new Set(productos.map(p => {
      const categoria = p.categoria;
      if (typeof categoria === 'object' && categoria !== null) {
        return categoria.nombre || categoria.id || 'Sin categoría';
      }
      return categoria;
    }).filter(Boolean))];
    return cats;
  }, [productos]);

  // Función para abrir el modal
  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
    document.body.style.overflow = 'hidden';
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
    document.body.style.overflow = 'auto';
  };

  // Cerrar modal con tecla Escape
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        cerrarModal();
      }
    };

    if (modalAbierto) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalAbierto]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-emerald-500/5 to-teal-500/5"></div>
        <div className="absolute top-20 left-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-bold rounded-full shadow-lg">
              🛒 Tienda Online
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 font-serif text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 leading-tight">
            Nuestra Tienda
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Explora nuestra colección completa de productos naturales y auténticos
          </p>
          
          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="relative flex-1 w-full lg:w-auto">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg"
                />
              </div>
              
              {/* Category Filter */}
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-6 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg bg-white"
              >
                <option value="todos">Todas las categorías</option>
                {categorias.map((cat, index) => (
                  <option key={`categoria-${index}-${cat}`} value={typeof cat === 'string' ? cat : cat.nombre || cat.id}>
                    {typeof cat === 'string' ? cat : cat.nombre || 'Categoría sin nombre'}
                  </option>
                ))}
              </select>
              
              {/* Sort */}
              <select
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value)}
                className="px-6 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg bg-white"
              >
                <option value="nombre">Ordenar por nombre</option>
                <option value="precio">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
              </select>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => setVistaGrid(true)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    vistaGrid ? 'bg-white shadow-lg text-green-600' : 'text-gray-500 hover:text-green-600'
                  }`}
                  aria-label="Vista en grilla"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setVistaGrid(false)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    !vistaGrid ? 'bg-white shadow-lg text-green-600' : 'text-gray-500 hover:text-green-600'
                  }`}
                  aria-label="Vista en lista"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error State */}
          {error && (
            <div className="text-center py-12 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-700 font-medium mb-2">Error al cargar productos</p>
                <p className="text-red-600 text-sm">Mostrando productos de ejemplo</p>
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
            </h2>
            {busqueda && (
              <span className="text-lg text-gray-600">
                Resultados para: <span className="font-semibold text-green-700">"{busqueda}"</span>
              </span>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mb-4"></div>
              <p className="text-xl text-gray-600">Cargando productos...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && productosFiltrados.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No se encontraron productos</h3>
              <p className="text-lg text-gray-600 mb-8">Intenta con otros términos de búsqueda o filtros</p>
              <button
                onClick={() => {
                  setBusqueda('');
                  setFiltroCategoria('todos');
                }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Products Grid/List */}
          {!loading && productosFiltrados.length > 0 && (
            <div className={`grid gap-8 ${
              vistaGrid 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {productosFiltrados.map((producto) => {
                const precios = producto.precios || (producto.precio_principal ? [producto.precio_principal] : []);
                
                if (vistaGrid) {
                  // Grid View
                  return (
                    <div
                      key={`product-grid-${producto.id}`}
                      onClick={() => abrirModal(producto)}
                      className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        <img
                          src={producto.imagen_final || producto.imagen_url}
                          alt={producto.nombre}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-4xl" style={{ display: 'none' }}>
                          {producto.nombre.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                          {producto.nombre}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {producto.descripcion || 'Sin descripción disponible'}
                        </p>
                        
                        {/* Price and Category */}
                        <div className="flex items-center justify-between mb-4">
                          {precios.length > 0 && (
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                              ${precios[0].precio}
                            </span>
                          )}
                          {producto.categoria && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                              {typeof producto.categoria === 'string' ? producto.categoria : producto.categoria.nombre || 'Sin categoría'}
                            </span>
                          )}
                        </div>
                        
                        {precios[0]?.cantidad && (
                          <p className="text-sm text-gray-500 mb-4 bg-gray-50 px-3 py-2 rounded-xl text-center">
                            {precios[0].cantidad}
                          </p>
                        )}
                        
                        {/* Action Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            abrirModal(producto);
                          }}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  // List View
                  return (
                    <div
                      key={`product-list-${producto.id}`}
                      onClick={() => abrirModal(producto)}
                      className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative w-full md:w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                          <img
                            src={producto.imagen_final || producto.imagen_url}
                            alt={producto.nombre}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-4xl" style={{ display: 'none' }}>
                            {producto.nombre.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                                {producto.nombre}
                              </h3>
                              {producto.categoria && (
                                <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full ml-4">
                                  {typeof producto.categoria === 'string' ? producto.categoria : producto.categoria.nombre || 'Sin categoría'}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-6 leading-relaxed">
                              {producto.descripcion || 'Sin descripción disponible'}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              {precios.length > 0 && (
                                <>
                                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                                    ${precios[0].precio}
                                  </span>
                                  {precios[0]?.cantidad && (
                                    <p className="text-sm text-gray-500 mt-1">
                                      {precios[0].cantidad}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                abrirModal(producto);
                              }}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                              Ver Detalles
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal de Producto */}
      {modalAbierto && productoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={cerrarModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button
              onClick={cerrarModal}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden lg:rounded-l-3xl">
                <img
                  src={productoSeleccionado.imagen_final || productoSeleccionado.imagen_url}
                  alt={productoSeleccionado.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-6xl" style={{ display: 'none' }}>
                  {productoSeleccionado.nombre.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Category Badge */}
                  {productoSeleccionado.categoria && (
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
                      {typeof productoSeleccionado.categoria === 'string' 
                        ? productoSeleccionado.categoria 
                        : productoSeleccionado.categoria.nombre || 'Sin categoría'}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                    {productoSeleccionado.nombre}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {productoSeleccionado.descripcion || 'Sin descripción disponible'}
                  </p>

                  {/* Price Section */}
                  {(productoSeleccionado.precios?.length > 0 || productoSeleccionado.precio_principal) && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Precios disponibles:</h3>
                      <div className="space-y-3">
                        {(productoSeleccionado.precios || [productoSeleccionado.precio_principal]).map((precio, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                            <span className="text-gray-700 font-medium">
                              {precio.cantidad || 'Cantidad estándar'}
                            </span>
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                              ${precio.precio}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="space-y-4 mb-8">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <h4 className="font-semibold text-gray-800 mb-2">🌱 Producto Natural</h4>
                      <p className="text-gray-600 text-sm">
                        Todos nuestros productos son de origen natural y de la más alta calidad.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-2xl">
                      <h4 className="font-semibold text-gray-800 mb-2">🚚 Envío Disponible</h4>
                      <p className="text-gray-600 text-sm">
                        Realizamos envíos en ciudad de la costa y alrededores. Consulta nuestras tarifas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  {/* Temporalmente oculto */}
                  {/* <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg">
                    Sumar a la orden de pedido
                  </button> */}
                  
                  {/* Temporalmente oculto */}
                  {/* <button className="w-full bg-white border-2 border-green-600 text-green-600 font-bold py-4 px-8 rounded-2xl hover:bg-green-50 transition-all duration-300 text-lg">
                    💬 Contactar por WhatsApp
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tienda;