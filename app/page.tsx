import Boton from '../components/boton-google';
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

