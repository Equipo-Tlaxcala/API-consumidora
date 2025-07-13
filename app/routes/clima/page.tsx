'use client';
import BackButton from '@/components/BackButton';
import React, { useEffect, useState } from 'react';

const API_KEY = "79f5c08eea380e0519406edfd64eba72";
const ciudades = [
  { nombre: "Ciudad de México", codigo: "Ciudad de México" },
  { nombre: "Buenos Aires", codigo: "Buenos Aires" },
  { nombre: "Madrid", codigo: "Madrid" },
  { nombre: "Cancún", codigo: "Cancún" },
  
  // Agrega más ciudades si lo deseas
];
const pais = "MX"; // Puedes cambiar esto si quieres hacerlo dinámico también

export default function ClimaBox() {
  const [clima, setClima] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [ciudad, setCiudad] = useState<string>("Ciudad de México");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)},${pais}&units=metric&lang=es&appid=${API_KEY}`;
    async function obtenerClima() {
      try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        if (datos.cod !== 200) {
          throw new Error(datos.message || "No se pudo obtener el clima");
        }
        setClima({
          temp: datos.main.temp,
          descripcion: datos.weather[0].description,
          icono: datos.weather[0].icon,
          ciudadNombre: datos.name,
        });
      } catch (err: any) {
        setError(err.message);
      }
    }
    obtenerClima();
  }, [ciudad]);

  const handleCiudadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCiudad(e.target.value);
  };

  if (error) {
    return <div className="p-4 border rounded bg-red-100 text-red-700">Error al obtener el clima: {error}</div>;
  }
  if (!clima) {
    return <div className="p-4 border rounded">Cargando clima...</div>;
  }
  return (
    <div className="p-6 border rounded shadow-md max-w-xs mx-auto bg-white">
      <h2 className="text-xl font-bold mb-2">Clima en {clima.ciudadNombre}</h2>
      <div className="mb-4">
        <label htmlFor="ciudad" className="block text-sm font-medium mb-1">Ciudad:</label>
        <select id="ciudad" value={ciudad} onChange={handleCiudadChange} className="w-full p-2 border rounded">
          {ciudades.map((c) => (
            <option key={c.codigo} value={c.codigo}>{c.nombre}</option>
          ))}
        </select>
      </div>
      <img src={`https://openweathermap.org/img/wn/${clima.icono}@2x.png`} alt="icono del clima" className="mx-auto" />
      <p><strong>Temperatura:</strong> {clima.temp}°C</p>
      <p><strong>Condición:</strong> {clima.descripcion}</p>
      <BackButton />
    </div>  
  );
  
}