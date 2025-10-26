import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input.jsx';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.usuario || !form.password) {
      setError('Por favor ingresa tu usuario y contraseña.');
      return;
    }

    setError('');
    navigate('/app');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-white">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">Bienvenido</h1>
        <p className="mb-8 text-sm text-slate-500">
          Inicia sesión para gestionar tus finanzas personales.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Usuario"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:bg-primary/90"
          >
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
