import { useMemo, useState } from 'react';
import Input from '../components/Input.jsx';
import Select from '../components/Select.jsx';
import { transacciones as transaccionesIniciales } from '../data/mockData.js';

const categorias = [
  { label: 'Selecciona una categoría', value: '', disabled: true },
  { label: 'Salario', value: 'Salario' },
  { label: 'Arriendo', value: 'Arriendo' },
  { label: 'Transporte', value: 'Transporte' },
  { label: 'Alimentación', value: 'Alimentación' },
  { label: 'Ocio', value: 'Ocio' },
  { label: 'Ahorro', value: 'Ahorro' },
  { label: 'Educación', value: 'Educación' }
];

const tipos = [
  { label: 'Ingreso', value: 'ingreso' },
  { label: 'Egreso', value: 'egreso' }
];

function Registro() {
  const [transacciones, setTransacciones] = useState(transaccionesIniciales);
  const [form, setForm] = useState({
    tipo: 'ingreso',
    monto: '',
    categoria: '',
    fecha: new Date().toISOString().substring(0, 10),
    descripcion: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.monto || !form.categoria) {
      return;
    }

    const nuevaTransaccion = {
      ...form,
      id: Date.now(),
      monto: Number(form.monto)
    };

    setTransacciones((prev) => [nuevaTransaccion, ...prev]);
    setForm((prev) => ({ ...prev, monto: '', descripcion: '' }));
  };

  const resumen = useMemo(() => {
    const ingresos = transacciones
      .filter((item) => item.tipo === 'ingreso')
      .reduce((acc, item) => acc + Number(item.monto), 0);
    const egresos = transacciones
      .filter((item) => item.tipo === 'egreso')
      .reduce((acc, item) => acc + Number(item.monto), 0);
    const ahorro = transacciones
      .filter((item) => item.categoria === 'Ahorro')
      .reduce((acc, item) => acc + Number(item.monto), 0);

    return {
      ingresos,
      egresos,
      balance: ingresos - egresos,
      ahorro
    };
  }, [transacciones]);

  const metaAhorro = useMemo(() => ({
    objetivo: 500000,
    sugerido: Math.round(resumen.ingresos * 0.1),
    progreso: Math.min(100, Math.round((resumen.ahorro / 500000) * 100))
  }), [resumen.ahorro, resumen.ingresos]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="text-xl font-semibold text-slate-800">Registrar transacción</h2>
        <p className="mb-6 text-sm text-slate-500">
          Añade ingresos o egresos y manten tus finanzas actualizadas.
        </p>
        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          <Select
            label="Tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            options={tipos}
          />
          <Input
            label="Monto (COP)"
            name="monto"
            type="number"
            value={form.monto}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
          <Select
            label="Categoría"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
            options={categorias}
          />
          <Input
            label="Fecha"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            required
          />
          <div className="md:col-span-2">
            <Input
              label="Descripción"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Detalle opcional"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-2 font-semibold text-white transition hover:bg-primary/90"
            >
              Guardar transacción
            </button>
          </div>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-slate-500">Ingresos</h3>
          <p className="mt-2 text-2xl font-bold text-emerald-500">
            {resumen.ingresos.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-slate-500">Egresos</h3>
          <p className="mt-2 text-2xl font-bold text-rose-500">
            {resumen.egresos.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-slate-500">Balance</h3>
          <p
            className={`mt-2 text-2xl font-bold ${
              resumen.balance >= 0 ? 'text-emerald-500' : 'text-rose-500'
            }`}
          >
            {resumen.balance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 6v4m0 0a2 2 0 100 4h.01M12 10h2.4a2.6 2.6 0 110 5.2H12m0 0H9.6"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Meta de ahorro</p>
              <p className="text-sm text-emerald-800">Impulsa tu fondo de emergencia o próximas metas.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-emerald-800">
            <span>Ahorro acumulado</span>
            <span className="font-semibold">
              {resumen.ahorro.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
            </span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-white/70">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${metaAhorro.progreso}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-emerald-700">
            <span>Objetivo: {metaAhorro.objetivo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
            <span>Sugerido mes: {metaAhorro.sugerido.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-slate-800">Ideas para tus próximas metas</h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                💡
              </span>
              Reserva el 10% de cada ingreso en la categoría <strong>Ahorro</strong>.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                🎯
              </span>
              Crea una subcategoría de <em>Educación</em> para cursos o certificaciones futuras.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                🧭
              </span>
              Si tu balance es positivo, destina una parte a tu fondo de emergencias.
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-lg font-semibold text-slate-800">Historial de transacciones</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3 text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transacciones.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(item.fecha).toLocaleDateString('es-CO')}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-600">{item.tipo}</td>
                  <td className="px-4 py-3 text-slate-600">{item.categoria}</td>
                  <td className="px-4 py-3 text-slate-500">{item.descripcion || '—'}</td>
                  <td
                    className={`px-4 py-3 text-right font-semibold ${
                      item.tipo === 'ingreso' ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {Number(item.monto).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Registro;
