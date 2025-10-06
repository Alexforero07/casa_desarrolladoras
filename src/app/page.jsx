"use client";
import { useState, useEffect } from "react";

export default function BuscarEmpresa() {
  const [nombre, setNombre] = useState("");
  const [empresas, setEmpresas] = useState([]);

  // cargar todas al inicio
  useEffect(() => {
    const fetchEmpresas = async () => {
      const res = await fetch("/api/empresas");
      if (res.ok) {
        const data = await res.json();
        setEmpresas(data);
      }
    };
    fetchEmpresas();
  }, []);

  // buscar por nombre
  const handleBuscar = async () => {
    const res = await fetch(`/api/empresas?nombre=${encodeURIComponent(nombre)}`);
    if (res.ok) {
      const data = await res.json();
      setEmpresas(data);
    } else {
      setEmpresas([]);
      alert("Empresa no encontrada");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold mx-4 text-black">Directorios de Empresas</h1>

      {/* Buscador a la derecha */}
      <div className="flex justify-end mb-6 text-black">
        <input
          type="text"
          placeholder="Buscar empresa..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {/* Contenedor de empresas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {empresas.map((empresa) => (
          <div key={empresa._id} className="bg-white border rounded shadow p-4 flex flex-col items-center">
            {/* Imagen primero */}
            {empresa.imagen && (
              <img
                src={`data:image/png;base64,${empresa.imagen}`}
                alt={empresa.nombre}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}

            {/* Título */}
            <h2 className="text-xl font-semibold mb-2 text-center text-black">{empresa.nombre}</h2>

            {/* Descripción y datos */}
            <p className="text-gray-700 text-center mb-1">{empresa.descripcion}</p>
            <p className="text-gray-600 text-center mb-1">📧 {empresa.correo}</p>
            <p className="text-gray-600 text-center mb-2">📞 {empresa.telefono}</p>
            <a
              href={empresa.paginaWeb}
              target="_blank"
              className="text-blue-500 text-center"
            >
              {empresa.paginaWeb}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
