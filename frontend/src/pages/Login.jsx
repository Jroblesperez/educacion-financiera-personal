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
    <main
      className="relative flex min-h-screen items-center justify-center bg-slate-900"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,23,42,0.72), rgba(15,23,42,0.82)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-slate-900/30 to-slate-900/80" aria-hidden />
      <div className="relative z-10 grid w-full max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div className="text-white">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
            Educación financiera
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            Gestiona tus finanzas con claridad y metas de ahorro.
          </h1>
          <p className="mt-4 text-sm text-slate-200">
            Visualiza ingresos, egresos y crea alertas inteligentes para impulsar tu bienestar financiero.
          </p>
        </div>
        <div className="rounded-2xl bg-white/95 p-10 shadow-2xl backdrop-blur">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">Bienvenido</h2>
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
      </div>
    </main>
  );
}

export default Login;
