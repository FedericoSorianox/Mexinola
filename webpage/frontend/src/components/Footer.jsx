import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t border-gris-claro shadow-inner py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-verde-oscuro shadow-sm">
            <span className="text-verde-oscuro font-bold text-xl font-serif">M</span>
          </div>
          <span className="text-2xl font-bold font-serif text-verde-oscuro tracking-tight">Mexinola</span>
        </div>
        <div className="text-base text-gris text-center md:text-left">
          © {new Date().getFullYear()} Mexinola. Todos los derechos reservados.
        </div>
        <div className="footer-social flex gap-6 mt-2 md:mt-0">
          <a href="#" aria-label="Instagram" className="text-2xl text-verde-oscuro hover:text-rojo-acento transition-colors">📸</a>
          <a href="#" aria-label="Facebook" className="text-2xl text-verde-oscuro hover:text-rojo-acento transition-colors">👍</a>
          <a href="#" aria-label="WhatsApp" className="text-2xl text-verde-oscuro hover:text-rojo-acento transition-colors">💬</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 