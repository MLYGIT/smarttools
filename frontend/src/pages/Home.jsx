import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">SmartTools Suite</h1>
          <nav className="flex gap-4">
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600">Precios</Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Ingresar</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Registrarse
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gray-900 mb-6"
        >
          Herramientas profesionales
          <span className="text-blue-600 block">que comprás una sola vez</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Pagá una vez, usalas para siempre. Sin suscripciones, sin límites ocultos.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            to="/pricing" 
            className="bg-blue-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-blue-700 inline-block font-semibold"
          >
            Ver herramientas
          </Link>
        </motion.div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Pago único</h3>
              <p className="text-gray-600">Pagás una vez y tenés acceso de por vida</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Sin límites</h3>
              <p className="text-gray-600">Usá las herramientas todo lo que quieras</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Pago seguro</h3>
              <p className="text-gray-600">Procesado por MercadoPago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}