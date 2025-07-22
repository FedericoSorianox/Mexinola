import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Inicio', type: 'internal' },
    { path: '/tienda', label: 'Tienda', type: 'page' },
    { path: '/#contacto', label: 'Contacto', type: 'section' },
  ];

  const isActiveLink = (link) => {
    if (link.type === 'page') {
      return location.pathname === link.path;
    }
    if (link.type === 'internal' && location.pathname === '/') {
      return true;
    }
    return false;
  };

  const scrollToSection = (id) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMenuOpen(false);
      }
    } else {
      window.location.href = `/#${id}`;
      setMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 left-0 w-full bg-white shadow-lg border-b border-gray-200 z-50 transition-all duration-300" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-center relative">
        {/* Logo centrado */}
        <Link
          to="/"
          className="flex items-center gap-3 select-none no-underline"
          style={{ minWidth: 0 }}
        >
          <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-verde-oscuro hover:text-rojo-acento transition-colors font-['Montserrat','Quicksand','Pacifico',cursive,serif] text-center navbar-logo-text flex items-center justify-center leading-tight no-underline" style={{ lineHeight: 1.1, letterSpacing: '-0.03em', minWidth: 0 }}>
            Mexinola
          </span>
        </Link>
        {/* Links y botón a la derecha */}
        <div className="flex items-center gap-8 ml-auto">
          <ul className="hidden md:flex items-center gap-8 list-none m-0">
            {navLinks.map(link => (
              <li key={link.path}>
                {link.type === 'section' ? (
                  <button
                    className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 ${isActiveLink(link) ? 'bg-rojo-acento text-white shadow' : 'bg-white text-verde-oscuro hover:bg-verde-mex hover:text-black hover:shadow'}`}
                    onClick={() => scrollToSection(link.path.substring(2))}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 ${isActiveLink(link) ? 'bg-rojo-acento text-white shadow' : 'bg-white text-verde-oscuro hover:bg-verde-mex hover:text-black hover:shadow'}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {/* Botón de acción desktop: Tienda siempre visible */}
          <Link
            to="/tienda"
            className={`hidden md:inline-block px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 ${location.pathname === '/tienda' ? 'bg-rojo-acento text-white shadow' : 'bg-white text-verde-oscuro hover:bg-verde-mex hover:text-white hover:shadow'}`}
            aria-label="Ver tienda"
          >
            Ver tienda
          </Link>
          {/* Botón hamburguesa mobile */}
          <button className="navbar-mobile-btn md:hidden ml-2 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            <span className="block w-9 h-9 relative">
              <span className={`absolute left-1/2 top-1/2 w-7 h-0.5 bg-verde-oscuro rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1' : '-translate-y-2'}`}></span>
              <span className={`absolute left-1/2 top-1/2 w-7 h-0.5 bg-verde-oscuro rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`absolute left-1/2 top-1/2 w-7 h-0.5 bg-verde-oscuro rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-2'}`}></span>
            </span>
          </button>
        </div>
      </div>
      {/* Overlay y menú mobile animado */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 animate-fade-in-up" onClick={() => setMenuOpen(false)}></div>
          <div className="navbar-mobile-menu md:hidden fixed right-4 top-20 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 z-50 animate-fade-in-up flex flex-col gap-2 min-w-[180px]">
            {navLinks.map(link => (
              <div key={link.path}>
                {link.type === 'section' ? (
                  <button
                    className={`w-full text-left px-5 py-2 rounded-full font-semibold text-lg transition-all duration-200 ${isActiveLink(link) ? 'bg-rojo-acento text-white shadow' : 'bg-white text-verde-oscuro hover:bg-verde-mex hover:text-white'}`}
                    onClick={() => scrollToSection(link.path.substring(2))}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`block w-full text-left px-5 py-2 rounded-full font-semibold text-lg transition-all duration-200 ${isActiveLink(link) ? 'bg-rojo-acento text-white shadow' : 'bg-white text-verde-oscuro hover:bg-verde-mex hover:text-white'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link 
              to="/tienda" 
              className={`mt-2 w-full block text-center px-5 py-2 rounded-full font-semibold text-lg transition-all duration-200 ${location.pathname === '/tienda' ? 'bg-rojo-acento text-white shadow' : 'bg-white text-verde-oscuro hover:bg-verde-mex hover:text-white'}`}
              onClick={() => setMenuOpen(false)}
              aria-label="Ver tienda"
            >
              Ver tienda
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;