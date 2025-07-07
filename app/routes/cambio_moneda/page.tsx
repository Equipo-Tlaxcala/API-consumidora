'use client';
import { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';

export default function DolarPage() {
  const [tipoCambio, setTipoCambio] = useState<number | null>(null);
  const [cantidadUSD, setCantidadUSD] = useState('');
  const [resultadoMXN, setResultadoMXN] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/dolar')
      .then((res) => res.json())
      .then((data) => {
        if (data.dolar) {
          setTipoCambio(parseFloat(data.dolar.replace(',', '.')));
        } else {
          setError('No se pudo obtener el tipo de cambio.');
        }
      })
      .catch(() => setError('Error al conectar con la API.'));
  }, []);

  const convertir = () => {
    const cantidad = parseFloat(cantidadUSD);
    if (!isNaN(cantidad) && tipoCambio) {
      setResultadoMXN(cantidad * tipoCambio);
    } else {
      setResultadoMXN(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 gap-4">
      <h1 className="text-2xl font-semibold">💵 Tipo de cambio USD → MXN</h1>

      {error && <p className="text-red-600">{error}</p>}

      {tipoCambio && (
        <>
          <p className="text-xl">
            1 USD = <strong>${tipoCambio.toFixed(2)}</strong> MXN
          </p>

          <input
            type="number"
            placeholder="Cantidad en USD"
            value={cantidadUSD}
            onChange={(e) => setCantidadUSD(e.target.value)}
            className="mt-4 rounded border px-3 py-2"
          />
          <button
            onClick={convertir}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
          >
            Convertir
          </button>

          {resultadoMXN !== null && (
            <p className="text-lg mt-2">
              💰 <strong>${resultadoMXN.toFixed(2)}</strong> MXN
            </p>
          )}
        </>
      )}

      <BackButton />
    </main>
  );
}
