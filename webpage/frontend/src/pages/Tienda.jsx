import React, { useState, useEffect } from "react";

function agruparPorCategoria(productos) {
  const categorias = {};
  productos.forEach((producto) => {
    const cat = producto.categoria?.slug || "otros";
    if (!categorias[cat]) categorias[cat] = [];
    categorias[cat].push(producto);
  });
  return categorias;
}

const categorias = [
  { id: "mixes", nombre: "Mixes", icono: "🥜" },
  { id: "granolas", nombre: "Granolas", icono: "🌾" },
  { id: "semillas", nombre: "Semillas", icono: "🌱" },
  { id: "frutos-secos", nombre: "Frutos Secos", icono: "🥜" },
  { id: "cereales", nombre: "Cereales", icono: "🌾" },
  { id: "frutas-deshidratadas", nombre: "Frutas Deshidratadas", icono: "🍎" },
  { id: "otros", nombre: "Otros", icono: "🍯" },
];

function Tienda() {
  const [agrupados, setAgrupados] = useState({});
  const [categoriaActiva, setCategoriaActiva] = useState("mixes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Función para traer todas las páginas de la API
    const fetchAllPages = async (url, acumulado = []) => {
      const res = await fetch(url);
      const data = await res.json();
      const productos = data.results || [];
      const nuevos = acumulado.concat(productos);
      if (data.next) {
        return fetchAllPages(data.next, nuevos);
      }
      return nuevos;
    };

    fetchAllPages("/api/productos/")
      .then((todos) => {
        console.log('API productos:', todos);
        setAgrupados(agruparPorCategoria(todos));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gris-claro">
      {/* Header de la tienda */}
      <div className="bg-white shadow border-b border-gris-claro py-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-verde-oscuro mb-4 font-serif drop-shadow-lg">Nuestra Tienda</h1>
          <p className="text-xl text-gris max-w-2xl mx-auto mb-2">
            Descubre nuestra amplia selección de productos naturales, orgánicos y artesanales. Todos nuestros productos son cuidadosamente seleccionados para ofrecerte la mejor calidad.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Filtros de categorías */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaActiva(categoria.id)}
              className={`px-5 py-2 rounded-full text-base font-semibold transition-all duration-200 shadow-sm border border-gris-claro flex items-center gap-2 ${
                categoriaActiva === categoria.id
                  ? "bg-rojo-acento text-white shadow-lg scale-105"
                  : "bg-white text-verde-oscuro hover:bg-verde-mex hover:text-white hover:shadow"
              }`}
            >
              <span>{categoria.icono}</span>
              {categoria.nombre}
            </button>
          ))}
        </div>

        {/* Productos de la categoría activa */}
        {loading ? (
          <div className="text-center text-xl text-gris py-20">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(agrupados[categoriaActiva] || []).map((producto) => {
              const precios = producto.precios || (producto.precio_principal ? [producto.precio_principal] : []);
              return (
                <div key={producto.id} className="card-minimal group hover:scale-105 transition-transform duration-300 shadow-lg border border-gris-claro rounded-2xl bg-white flex flex-col">
                  <div className="relative mb-4">
                    <img
                      src={producto.imagen_final || producto.imagen_url}
                      alt={producto.nombre}
                      className="mx-auto object-cover rounded-xl shadow-md border border-gris-claro bg-white" style={{ width: '80px', height: '80px', marginTop: '16px', marginBottom: '8px', display: 'block' }}
                    />
                    <div className="absolute top-2 right-2 bg-rojo-acento text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                      {precios.length > 1 ? "Múltiples tamaños" : precios[0]?.cantidad}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <h3 className="text-xl font-bold text-verde-oscuro mb-2 font-serif">{producto.nombre}</h3>
                    <p className="text-gris text-sm mb-4 line-clamp-2">{producto.descripcion}</p>
                    <div className="space-y-2 mb-4">
                      {precios.map((precio, idx) => (
                        <div key={precio.id || idx} className="flex justify-between items-center">
                          <span className="text-sm text-gris">{precio.cantidad}</span>
                          <span className="font-bold text-rojo-acento">${precio.precio}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Promoción especial */}
        <div className="mt-16 card-minimal bg-gradient-to-r from-rojo-acento to-verde-oscuro text-white text-center shadow-xl rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-2 font-serif">¡Oferta Especial!</h3>
          <p className="text-lg mb-4">
            Compra por 1kg y obtén 10% de descuento en todos nuestros productos
          </p>
          <div className="text-3xl font-bold">$ x 100g | 1kg 10% OFF</div>
        </div>
      </div>
    </div>
  );
}

export default Tienda; 