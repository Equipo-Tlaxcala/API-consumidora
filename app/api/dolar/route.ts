import { NextResponse } from 'next/server';

const TOKEN = '882a6ddfcfdd55c2f5f009e6e350eaee577de377294608fe915d23aff4f5ebfc';
const SERIE_DOLAR = 'SF43718'; 
const BASE_URL = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series';

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/${SERIE_DOLAR}/datos/oportuno`, {
      headers: {
        'Bmx-Token': TOKEN,
      },
    });

    if (!res.ok) throw new Error('Error al obtener datos de Banxico');

    const json = await res.json();
    const valor = json?.bmx?.series?.[0]?.datos?.[0]?.dato;

    return NextResponse.json({ dolar: valor });
  } catch (error) {
    return NextResponse.json(
      { error: 'No se pudo obtener el tipo de cambio' },
      { status: 500 }
    );
  }
}
