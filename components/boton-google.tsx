
'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const payload = {
        nombre: session.user?.name || "",
        userName: session.user?.email || "",
        password: "google-oauth",
        fkRol: 1
      };
      const apiUrl = "https://localhost:7268/api/Usuario";
      const userEmail = session.user?.email || "";
      if (!userEmail) return;
      // Verifica si el usuario existe
      fetch(`${apiUrl}/by-email/${encodeURIComponent(userEmail)}`)
        .then(res => {
          if (res.status === 404) {
            // Usuario no existe, haz el POST
            return fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload)
            });
          } else if (res.ok) {
            console.log('El usuario ya existe, no se hace POST');
            return null;
          } else {
            throw new Error(`Error al verificar usuario: ${res.status}`);
          }
        })
        .then(postRes => {
          if (postRes && !postRes.ok) throw new Error(`HTTP error! status: ${postRes.status}`);
          if (postRes) return postRes.json();
        })
        .then(data => {
          if (data) console.log('API response:', data);
        })
        .catch(error => console.error('Fetch error:', error));
    }
  }, [session]);

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <FaUserCircle size={80} className="text-gray-600 mb-6"/>
      {!session ? (
        <button onClick={() => signIn("google")} 
         className="flex px-6 py-3 bg-transparent text-black rounded-xl shadow-md border-1 hover:bg-black hover:text-white transition duration-300">

          <FcGoogle size={28} />
          Iniciar sesión con Google
        </button>
      ) : (
        <div>
          <p>Bienvenido, {session?.user?.name}</p>
          <button onClick={() => signOut()}>Cerrar sesión</button>
        </div>
      )}
    </div>

  );
}
