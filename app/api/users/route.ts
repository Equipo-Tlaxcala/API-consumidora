import { NextResponse } from 'next/server';

// Función para obtener todos los usuarios
export async function GET() {
  try {
    const response = await fetch('https://localhost:7268/api/Usuario');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    );
  }
}

// Función para crear un nuevo usuario
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://localhost:7268/api/Usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    );
  }
}