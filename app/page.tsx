/*import Boton from '../components/boton-google';
import Login from '../components/form-login';

export default function Home() {
  return (
    <div className=''>
      <div className=''>
        <Login/>
      </div>
      <p className='text-center p-10'>O</p>
      <div className=''>
        <Boton/>
      </div>
    </div>
  );
}
*/
'use client';
import MenuButton from '@/components/MenuButton';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="mb-6 text-3xl font-bold">Menú principal</h1>
      <MenuButton href="/clima" label="🌤️ Ver clima" />
      <MenuButton href="/dolar" label="💵 Tipo de cambio" />
    </main>
  );
}
