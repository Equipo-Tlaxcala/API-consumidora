import { NextResponse } from 'next/server';

const API_KEY = 'YOUR_API_KEY'; // Reemplazar con tu API key de OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Guatemala City'; // Ciudad por defecto

    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error('Error al obtener datos del clima');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener datos del clima' },
      { status: 500 }
    );
  }
}