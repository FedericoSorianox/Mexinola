import React from "react";

function Hero() {
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 section-padding"
    >
      {/* Card central mejorada */}
      <div className="flex items-center justify-center w-full z-30">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-16 max-w-4xl w-full mx-4 text-center animate-fade-in-up hover:shadow-3xl transition-all duration-500">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-full mb-4">
              🌿 Productos 100% Naturales
            </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-6 font-serif text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 leading-tight">
            Productos Naturales
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 font-medium text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Auténticos y saludables, inspirados en la tierra mexicana y uruguaya.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/tienda" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="mr-2">Ver Productos</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a href="#sobre" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-700 bg-white border-2 border-green-200 rounded-2xl shadow-md hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:scale-105">
              Conocer más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductosCarrusel() {
  const [productos, setProductos] = React.useState([]);
  const [startIdx, setStartIdx] = React.useState(0);
  const getItemsToShow = () => {
    if (window.innerWidth < 640) return 2;  
    if (window.innerWidth < 1024) return 3; 
    if (window.innerWidth < 1280) return 4; 
    return 5; 
  };
  const [itemsToShow, setItemsToShow] = React.useState(getItemsToShow());
  const [loading, setLoading] = React.useState(true);
  const [fade, setFade] = React.useState(true);
  const [pendingIdx, setPendingIdx] = React.useState(null);

  // Fetch all pages from API
  React.useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        let allProducts = [];
        let nextUrl = '/api/productos/';
        let pageCount = 0;
        
        while (nextUrl && pageCount < 10) {
          const response = await fetch(nextUrl);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.results) {
            allProducts = [...allProducts, ...data.results];
            nextUrl = data.next;
            pageCount++;
          } else {
            allProducts = data;
            nextUrl = null;
          }
        }
        
        setProductos(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setItemsToShow(getItemsToShow());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (productos.length <= itemsToShow) return;
    const interval = setInterval(() => {
      setFade(false);
      setPendingIdx(() => {
        const current = startIdx;
        if (current + itemsToShow >= productos.length) return 0;
        return current + 1;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [productos, itemsToShow, startIdx]);

  React.useEffect(() => {
    if (fade) return;
    if (pendingIdx === null) return;
    const timeout = setTimeout(() => {
      setStartIdx(pendingIdx);
      setPendingIdx(null);
      setFade(true);
    }, 700);
    return () => clearTimeout(timeout);
  }, [fade, pendingIdx]);

  const visibleProductos = productos.slice(startIdx, startIdx + itemsToShow);

  const handlePrev = () => {
    if (startIdx > 0) {
      setFade(false);
      setPendingIdx(Math.max(0, startIdx - 1));
    }
  };
  
  const handleNext = () => {
    if (startIdx + itemsToShow < productos.length) {
      setFade(false);
      setPendingIdx(Math.min(productos.length - itemsToShow, startIdx + 1));
    }
  };

  const canGoPrev = startIdx > 0;
  const canGoNext = startIdx + itemsToShow < productos.length;

  return (
    <section id="productos" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white section-padding">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-full mb-6">
          🌱 Nuestra Selección
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600 mb-4 font-serif">
          Productos Naturales
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra cuidadosa selección de productos auténticos y saludables
        </p>
      </div>
      
      <div className="relative w-full">
        {/* Botón anterior mejorado */}
        <button
          className={`absolute -left-6 top-1/2 -translate-y-1/2 z-20 group bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-xl p-4 text-gray-600 hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-110 transform hover:shadow-2xl ${
            !canGoPrev ? 'opacity-30 cursor-not-allowed hover:scale-100 hover:bg-white/90 hover:text-gray-600' : ''
          }`}
          onClick={handlePrev}
          disabled={!canGoPrev}
          aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carrusel mejorado */}
        <div 
          className={`flex gap-6 justify-center items-center transition-all duration-700 ${
            fade ? 'opacity-100 transform translate-y-0' : 'opacity-40 transform translate-y-2'
          }`} 
          style={{ minHeight: 480 }}
        >
          {loading ? (
            <div className="text-center w-full py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
              <p className="text-xl text-gray-600 mt-4">Cargando productos...</p>
            </div>
          ) : productos.length === 0 ? (
            <div className="flex gap-6">
              {[1, 2, 3].map((num) => (
                <div key={num} className="group bg-white rounded-3xl shadow-xl border border-gray-100 p-6 w-[220px] h-[400px] flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-500">
                  <div className="w-[120px] h-[120px] rounded-full mb-6 bg-gradient-to-br from-green-400 to-emerald-500 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-2xl">
                    P{num}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center min-h-[60px] flex items-center justify-center px-2">
                    Producto Test {num}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 text-center flex-grow flex items-center px-2">
                    Descripción completa del producto natural
                  </p>
                  <div className="mt-auto">
                    <span className="inline-block text-lg font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 rounded-full shadow-lg">
                      ${num}00
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            visibleProductos.map((prod, idx) => {
              const precios = prod.precios || (prod.precio_principal ? [prod.precio_principal] : []);
              return (
                <div
                  key={prod.id || idx}
                  className="group bg-white rounded-3xl shadow-xl border border-gray-100 p-6 w-[220px] min-h-[400px] flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer"
                >
                  <div className="w-[120px] h-[120px] rounded-full mb-6 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white shadow-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <img
                      src={prod.imagen_final || prod.imagen_url}
                      alt={prod.nombre}
                      className="object-cover w-full h-full rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-2xl" style={{ display: 'none' }}>
                      {prod.nombre.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center leading-tight px-2 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                    {prod.nombre}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-6 text-center px-2 flex-grow line-clamp-4 leading-relaxed">
                    {prod.descripcion}
                  </p>
                  
                  <div className="mt-auto flex flex-col items-center flex-shrink-0">
                    {precios.length > 0 && (
                      <>
                        <span className="inline-block text-lg font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          ${precios[0].precio}
                        </span>
                        {precios[0].cantidad && (
                          <p className="text-xs text-gray-500 text-center mt-3 bg-gray-100 px-3 py-1 rounded-full">
                            {precios[0].cantidad}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Botón siguiente mejorado */}
        <button
          className={`absolute -right-6 top-1/2 -translate-y-1/2 z-20 group bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-xl p-4 text-gray-600 hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-110 transform hover:shadow-2xl ${
            !canGoNext ? 'opacity-30 cursor-not-allowed hover:scale-100 hover:bg-white/90 hover:text-gray-600' : ''
          }`}
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="section-separator mt-20"></div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="py-20 md:py-28 section-padding relative overflow-hidden">
      {/* Elementos decorativos con fondo transparente */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl z-10"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl z-10"></div>
      
      <div className="max-w-6xl mx-auto px-4 text-center relative z-20">
        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-8 border border-white/30">
          🌿 Nuestra Historia
        </span>
        
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-serif drop-shadow-lg">
          Sobre Mexinola
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div className="text-left space-y-6">
            <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-md">
              Seleccionamos productos auténticos, saludables y sostenibles, respetando la tierra y sus raíces.
            </p>
            <p className="text-lg text-white/90 leading-relaxed drop-shadow-sm">
              Nuestra misión es acercar lo mejor de la naturaleza a tu hogar, con el color, la alegría y la calidez de México y Uruguay.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full">
                <span className="text-green-300">🌱</span>
                <span className="text-white font-medium">100% Natural</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full">
                <span className="text-blue-300">🌍</span>
                <span className="text-white font-medium">Sostenible</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full">
                <span className="text-yellow-300">⭐</span>
                <span className="text-white font-medium">Auténtico</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                  <div className="text-gray-600">Productos</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2</div>
                  <div className="text-gray-600">Países</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">5★</div>
                  <div className="text-gray-600">Calidad</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">🌿</div>
                  <div className="text-gray-600">Eco-Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-separator mt-20"></div>
    </section>
  );
}

function Contacto() {
  return (
    <section id="contacto" className="section-padding bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-full mb-8">
          💬 ¿Preguntas?
        </span>
        
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600 mb-6 font-serif">
          Contacto
        </h2>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          ¿Tienes alguna pregunta sobre nuestros productos naturales? Estamos aquí para ayudarte.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
            {/* Grid de botones de contacto */}
            <div className="grid md:grid-cols-2 gap-8 justify-center">
              {/* Botón de WhatsApp */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097"/>
                  </svg>
                </div>
                <a 
                  href="https://wa.me/+59899123456?text=Hola,%20tengo%20una%20consulta%20sobre%20los%20productos%20de%20Mexinola" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <span className="mr-2">WhatsApp</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              {/* Botón de Instagram */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <a 
                  href="https://instagram.com/mexinola" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-xl shadow-lg hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <span className="mr-2">Instagram</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="overflow-hidden relative">
      {/* Background con efecto parallax que cubre Hero y Sobre */}
      <div 
        className="fixed inset-0 w-full h-[500vh] z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: 'transform'
        }}
      />
      
      {/* Overlay mejorado con gradiente extendido */}
      <div className="fixed inset-0 w-full h-[500vh] bg-gradient-to-b from-black/30 via-black/20 to-black/60 z-10"></div>
      
      {/* Patrón decorativo moderno con parallax más lento */}
      <div 
        className="fixed inset-0 w-full h-[500vh] opacity-20 pointer-events-none z-20" 
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.15) 2px, transparent 0)',
          backgroundSize: '60px 60px',
          transform: `translateY(${scrollY * 0.1}px)`,
          willChange: 'transform'
        }}
      />
      
      {/* Elementos flotantes decorativos con parallax */}
      <div 
        className="fixed top-20 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse z-20"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          willChange: 'transform'
        }}
      />
      <div 
        className="fixed bottom-20 right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-xl animate-pulse delay-1000 z-20"
        style={{
          transform: `translateY(${scrollY * 0.25}px)`,
          willChange: 'transform'
        }}
      />

      {/* Contenido de las secciones con z-index mayor */}
      <div className="relative z-30">
        <Hero />
        <Sobre />
      </div>
      
      {/* Secciones con fondo normal */}
      <div className="relative z-30 bg-white">
        <ProductosCarrusel />
        <Contacto />
      </div>
    </main>
  );
}

export default Home;