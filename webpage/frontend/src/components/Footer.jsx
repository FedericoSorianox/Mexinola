import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-white/95 backdrop-blur-lg shadow-xl border-t border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Logo y copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Mexinola */}
          <Link
            to="/"
            className="flex items-center gap-3 select-none no-underline group"
          >
            {/* Logo mexicano */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-br from-green-500 via-white to-red-500 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 border-2 border-white/50">
              <span className="text-xl md:text-2xl">🇲🇽</span>
            </div>
            
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-600 bg-clip-text text-transparent hover:from-red-500 hover:via-red-600 hover:to-orange-500 transition-all duration-500 font-['Montserrat','Quicksand','Pacifico',cursive,serif] leading-tight no-underline group-hover:scale-105 transform" style={{ lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Mexinola
            </span>
          </Link>

          {/* Copyright */}
          <div className="flex items-center gap-4 text-gray-600">
            <span className="text-sm md:text-base font-medium">
              © 2025 Mexinola. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;