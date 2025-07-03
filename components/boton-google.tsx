
'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

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
      console.log('Payload:', payload);
      fetch('https://localhost:7268/api/Usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => console.log('API response:', data))
      .catch(error => console.error('Fetch error:', error));
    }
  }, [session]);

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("google")}>Iniciar sesión con Google</button>
      ) : (
        <div>
          <p>Bienvenido, {session?.user?.name}</p>
          <button onClick={() => signOut()}>Cerrar sesión</button>
        </div>
      )}
    </div>

  );
}
