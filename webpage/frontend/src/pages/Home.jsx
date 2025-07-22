import React from "react";

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 section-padding" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1920&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Overlay para legibilidad */}
      <div className="absolute inset-0 bg-black/20 -z-10"></div>
      {/* Fondo decorativo suave */}
      <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none -z-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)',
        backgroundSize: '30px 30px'
      }}></div>
      {/* Card central translúcida */}
      <div className="flex items-center justify-center w-full z-10">
        <div className="bg-white/80 rounded-2xl shadow-2xl border border-gris-claro p-6 md:p-12 max-w-2xl w-full mx-2 text-center backdrop-blur-md animate-fade-in-up">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 font-serif text-verde-oscuro drop-shadow-lg">
            Productos Naturales
          </h1>
          <p className="text-lg md:text-2xl mb-8 font-medium text-gris">
            Auténticos y saludables, inspirados en la tierra mexicana y uruguaya.
          </p>
          <a href="/tienda" className="btn-minimal btn-icon text-lg md:text-xl px-8 py-4 md:py-3 mt-2 md:mt-0 inline-block"><span>Ver Productos</span></a>
        </div>
      </div>
    </section>
  );
}

function ProductosCarrusel() {
  const [productos, setProductos] = React.useState([]);
  const [startIdx, setStartIdx] = React.useState(0);
  const getItemsToShow = () => {
    if (window.innerWidth < 640) return 2;  // 2 en mobile (más pequeñas)
    if (window.innerWidth < 1024) return 3; // 3 en tablet
    if (window.innerWidth < 1280) return 4; // 4 en desktop pequeño
    return 5; // 5 en desktop grande
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
        
        while (nextUrl && pageCount < 10) { // Limitamos a 10 páginas máximo para evitar loops infinitos
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
            // Si no hay paginación, es una lista directa
            allProducts = data;
            nextUrl = null;
          }
        }
        
        setProductos(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductos([]); // Fallback a array vacío
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Responsive: 1 en mobile, 2 en tablet, 3 en desktop
  React.useEffect(() => {
    function handleResize() {
      setItemsToShow(getItemsToShow());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance every 10 segundos con fade visible
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

  // Cuando fade-out termina, cambia el índice y hace fade-in
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

  // Handlers para los botones manuales
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
    <section id="productos" className="py-16 md:py-20 bg-gris-claro section-padding">
      <h2 className="text-3xl md:text-5xl font-bold text-verde-oscuro mb-8 md:mb-10 text-center font-serif">
        Nuestros Productos Naturales
      </h2>
      <div className="relative w-full">
        {/* Flecha izquierda */}
        <button
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 group bg-white/50 backdrop-blur-sm border border-gray-300 rounded-full shadow-md p-3 text-gray-600 hover:bg-white/80 hover:text-verde-oscuro transition-all duration-300 hover:scale-105 transform ${
            !canGoPrev ? 'opacity-20 cursor-not-allowed hover:scale-100 hover:bg-white/50 hover:text-gray-600' : ''
          }`}
          onClick={handlePrev}
          disabled={!canGoPrev}
          aria-label="Anterior"
        >
          {/* Icono flecha izquierda más discreto */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carrusel de productos */}
        <div 
          className={`flex gap-4 justify-center items-center transition-opacity duration-700 ${
            fade ? 'opacity-100' : 'opacity-30'
          }`} 
          style={{ minHeight: 420 }}
        >
          {loading ? (
            <div className="text-center w-full py-10 text-xl text-gray-600">Cargando productos...</div>
          ) : productos.length === 0 ? (
            <div className="flex gap-4">
              {/* Card de prueba 1 */}
              <div className="card-minimal w-[180px] h-[340px] flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg border border-gris-claro">
                <div className="w-[100px] h-[100px] rounded-full mb-4 bg-verde-oscuro border-2 border-verde-oscuro flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  P1
                </div>
                <h3 className="text-sm font-bold text-verde-oscuro mb-3 text-center font-serif min-h-[50px] flex items-center justify-center px-2">Producto Test 1</h3>
                <p className="text-xs text-gris mb-4 text-center min-h-[40px] flex items-center justify-center px-2">Descripción test completa</p>
                <div className="mt-auto">
                  <span className="text-sm font-bold text-white bg-rojo-acento px-3 py-2 rounded-full">$100</span>
                </div>
              </div>
              {/* Card de prueba 2 */}
              <div className="card-minimal w-[180px] h-[340px] flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg border border-gris-claro">
                <div className="w-[100px] h-[100px] rounded-full mb-4 bg-verde-oscuro border-2 border-verde-oscuro flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  P2
                </div>
                <h3 className="text-sm font-bold text-verde-oscuro mb-3 text-center font-serif min-h-[50px] flex items-center justify-center px-2">Producto Test 2</h3>
                <p className="text-xs text-gris mb-4 text-center min-h-[40px] flex items-center justify-center px-2">Descripción test completa</p>
                <div className="mt-auto">
                  <span className="text-sm font-bold text-white bg-rojo-acento px-3 py-2 rounded-full">$200</span>
                </div>
              </div>
              {/* Card de prueba 3 */}
              <div className="card-minimal w-[180px] h-[340px] flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg border border-gris-claro">
                <div className="w-[100px] h-[100px] rounded-full mb-4 bg-verde-oscuro border-2 border-verde-oscuro flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  P3
                </div>
                <h3 className="text-sm font-bold text-verde-oscuro mb-3 text-center font-serif min-h-[50px] flex items-center justify-center px-2">Producto Test 3</h3>
                <p className="text-xs text-gris mb-4 text-center min-h-[40px] flex items-center justify-center px-2">Descripción test completa</p>
                <div className="mt-auto">
                  <span className="text-sm font-bold text-white bg-rojo-acento px-3 py-2 rounded-full">$300</span>
                </div>
              </div>
            </div>
          ) : (
            visibleProductos.map((prod, idx) => {
              const precios = prod.precios || (prod.precio_principal ? [prod.precio_principal] : []);
              return (
                <div
                  key={prod.id || idx}
                  className="card-minimal w-[180px] h-[340px] max-w-[180px] mx-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg border border-gris-claro"
                >
                  <div className="w-[100px] h-[100px] rounded-full mb-4 flex items-center justify-center bg-gris-claro border-2 border-verde-oscuro shadow-sm overflow-hidden flex-shrink-0">
                    <img
                      src={prod.imagen_final || prod.imagen_url}
                      alt={prod.nombre}
                      className="object-cover w-full h-full rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full rounded-full bg-verde-oscuro flex items-center justify-center text-white font-bold text-lg" style={{ display: 'none' }}>
                      {prod.nombre.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-verde-oscuro mb-3 text-center font-serif leading-tight min-h-[50px] flex items-center justify-center px-2">{prod.nombre}</h3>
                  <p className="text-xs text-gris mb-4 text-center line-clamp-2 min-h-[40px] flex items-center justify-center px-2">{prod.descripcion}</p>
                  <div className="mt-auto flex flex-col items-center">
                    {precios.length > 0 && (
                      <>
                        <span className="text-sm font-bold text-white bg-rojo-acento px-3 py-2 rounded-full">${precios[0].precio}</span>
                        {precios[0].cantidad && (
                          <p className="text-xs text-gris text-center mt-2">{precios[0].cantidad}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Flecha derecha */}
        <button
          className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 group bg-white/50 backdrop-blur-sm border border-gray-300 rounded-full shadow-md p-3 text-gray-600 hover:bg-white/80 hover:text-verde-oscuro transition-all duration-300 hover:scale-105 transform ${
            !canGoNext ? 'opacity-20 cursor-not-allowed hover:scale-100 hover:bg-white/50 hover:text-gray-600' : ''
          }`}
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Siguiente"
        >
          {/* Icono flecha derecha más discreto */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="section-separator"></div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="py-12 md:py-20 bg-blanco section-padding">
      <div className="max-w-4xl mx-auto px-2 md:px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-verde-oscuro mb-4 md:mb-6 font-serif">Sobre Mexinola</h2>
        <p className="text-base md:text-xl text-gris mb-4 md:mb-6">
          Seleccionamos productos auténticos, saludables y sostenibles, respetando la tierra y sus raíces.
        </p>
        <p className="text-base md:text-lg text-verde-oscuro">
          Nuestra misión es acercar lo mejor de la naturaleza a tu hogar, con el color, la alegría y la calidez de México y Uruguay.
        </p>
      </div>
      <div className="section-separator"></div>
    </section>
  );
}

function Contacto() {
  return (
    <section id="contacto" className="section-padding bg-gris-claro py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-2 md:px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-verde-oscuro mb-6 md:mb-8 font-serif">Contacto</h2>
        <p className="text-base md:text-lg text-gris mb-6 md:mb-8">
          ¿Tienes alguna pregunta sobre nuestros productos naturales?
        </p>
        <div className="card-minimal max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gris-claro p-6">
          <p className="text-base md:text-lg text-verde-oscuro mb-4">
            <strong>Email:</strong>
          </p>
          <a 
            href="mailto:info@mexinola.com" 
            className="btn-minimal btn-icon inline-block px-8 py-3"
          >
            <span>info@mexinola.com</span>
            <span>📧</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <Hero />
      <Sobre />
      <ProductosCarrusel />
      <Contacto />
    </main>
  );
}

export default Home;