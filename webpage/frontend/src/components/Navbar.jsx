import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Inicio', type: 'internal' },
    { path: '/tienda', label: 'Tienda', type: 'page' }
  ];

  const isActiveLink = (link) => {
    if (link.type === 'page') {
      return location.pathname === link.path;
    }
    if (link.type === 'internal' && location.pathname === '/') {
      return true;
    }
    if (link.type === 'section' && location.pathname === '/' && location.hash === link.path) {
      return true;
    }
    if (link.type === 'external') {
      return false; // Los links externos nunca están "activos"
    }
    return false;
  };

  const scrollToSection = (id) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMenuOpen(false);
        window.history.pushState(null, null, `#${id}`);
      }
    } else {
      window.location.href = `/#${id}`;
      setMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100 z-50 transition-all duration-300" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between relative">
        {/* Logo con gradiente y efectos modernos */}
        <Link
          to="/"
          className="flex items-center gap-3 select-none no-underline group"
          style={{ minWidth: 0 }}
        >
          {/* Logo mexicano */}
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-br from-green-500 via-white to-red-500 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 border-2 border-white/50">
            <span className="text-xl md:text-2xl">🇲🇽</span>
          </div>
          
          <span className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-600 bg-clip-text text-transparent hover:from-red-500 hover:via-red-600 hover:to-orange-500 transition-all duration-500 font-['Montserrat','Quicksand','Pacifico',cursive,serif] text-center flex items-center justify-center leading-tight no-underline group-hover:scale-105 transform" style={{ lineHeight: 1.1, letterSpacing: '-0.03em', minWidth: 0 }}>
            Mexinola
          </span>
        </Link>

        {/* Links de navegación modernos */}
        <div className="flex items-center gap-6">
          <ul className="hidden lg:flex items-center gap-2 list-none m-0">
            {navLinks.map(link => (
              <li key={link.path}>
                {link.type === 'section' ? (
                  <button
                    className={`relative px-6 py-2.5 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden group ${
                      isActiveLink(link) 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 scale-105' 
                        : 'text-gray-700 hover:text-white hover:scale-105'
                    }`}
                    onClick={() => scrollToSection(link.path.substring(2))}
                  >
                    {!isActiveLink(link) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                ) : link.type === 'external' ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative px-6 py-2.5 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden group text-gray-700 hover:text-white hover:scale-105`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    <span className="relative z-10">{link.label}</span>
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className={`relative px-6 py-2.5 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden group ${
                      isActiveLink(link) 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 scale-105' 
                        : 'text-gray-700 hover:text-white hover:scale-105'
                    }`}
                  >
                    {!isActiveLink(link) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Botón hamburguesa moderno */}
          <button 
            className="lg:hidden relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-emerald-50 hover:to-emerald-100 border border-gray-200 hover:border-emerald-300 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Abrir menú"
          >
            <span className="block w-10 h-10 relative">
              <span className={`absolute left-1/2 top-1/2 w-5 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-300 transform -translate-x-1/2 ${menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
              <span className={`absolute left-1/2 top-1/2 w-5 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></span>
              <span className={`absolute left-1/2 top-1/2 w-5 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-300 transform -translate-x-1/2 ${menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
            </span>
          </button>
        </div>
      </div>

      {/* Overlay y menú mobile premium */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200" onClick={() => setMenuOpen(false)}></div>
          <div className="lg:hidden fixed right-4 top-20 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl shadow-black/10 p-6 z-50 animate-in slide-in-from-top-2 fade-in duration-300 flex flex-col gap-3 min-w-[200px]">
            {navLinks.map(link => (
              <div key={link.path}>
                {link.type === 'section' ? (
                  <button
                    className={`w-full text-left px-5 py-3 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden group ${
                      isActiveLink(link) 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                        : 'text-gray-700 hover:text-white hover:scale-102'
                    }`}
                    onClick={() => scrollToSection(link.path.substring(2))}
                  >
                    {!isActiveLink(link) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                ) : link.type === 'external' ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-left px-5 py-3 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden group text-gray-700 hover:text-white hover:scale-102`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    <span className="relative z-10">{link.label}</span>
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className={`block w-full text-left px-5 py-3 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden group ${
                      isActiveLink(link) 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                        : 'text-gray-700 hover:text-white hover:scale-102'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {!isActiveLink(link) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;