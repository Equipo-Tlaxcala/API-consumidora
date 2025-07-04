'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { useState, ChangeEvent, FormEvent } from "react";

const LoginButton = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError(null);

    // Intenta iniciar sesión usando el provider 'credentials'
    const res = await signIn("credentials", {
      redirect: false,
      username: formData.username,
      password: formData.password,
    });

    if (res?.error) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <FaUserCircle size={80} className="text-gray-500 mb-4" />

      {!session ? (
        <form onSubmit={handleSubmit} className="w-full max-w-xs p-4 border rounded-md shadow bg-white">
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>
        </form>
      ) : (
        <>
          <p className="text-center mb-4">Hola, {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
};

export default LoginButton;
