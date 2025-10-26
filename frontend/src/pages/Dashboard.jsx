import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-10 py-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Panel financiero</h1>
          <p className="text-sm text-slate-500">Visualiza tus movimientos, reportes y alertas.</p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Cerrar sesión
        </button>
      </header>
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
        <aside className="w-64 rounded-2xl bg-white p-6 shadow">
          <Navbar />
        </aside>
        <section className="flex-1">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
