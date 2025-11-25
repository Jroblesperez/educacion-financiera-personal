import { useMemo, useState } from 'react';
import Input from '../components/Input.jsx';
import Select from '../components/Select.jsx';
import { alertasIniciales, transacciones } from '../data/mockData.js';

const categoriasAlertas = [
  { label: 'Selecciona una categoría', value: '', disabled: true },
  { label: 'Arriendo', value: 'Arriendo' },
  { label: 'Transporte', value: 'Transporte' },
  { label: 'Alimentación', value: 'Alimentación' },
  { label: 'Ocio', value: 'Ocio' },
  { label: 'Ahorro', value: 'Ahorro' }
];

function Alertas() {
  const [alertas, setAlertas] = useState(alertasIniciales);
  const [form, setForm] = useState({ categoria: '', umbral: '' });

  const egresosPorCategoria = useMemo(() => {
    return transacciones
      .filter((item) => item.tipo === 'egreso')
      .reduce((acc, item) => {
        acc[item.categoria] = (acc[item.categoria] || 0) + Number(item.monto);
        return acc;
      }, {});
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.categoria || !form.umbral) {
      return;
    }

    const nuevaAlerta = {
      id: Date.now(),
      ...form,
      umbral: Number(form.umbral)
    };

    setAlertas((prev) => [nuevaAlerta, ...prev]);
    setForm({ categoria: '', umbral: '' });
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-amber-600 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
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
            <p className="text-sm font-semibold text-amber-800">Alertas enfocadas en ahorro</p>
            <p className="text-xs text-amber-700">
              Mantén un ojo en tus aportes a ahorro y evita descuidar el fondo de emergencias. Define umbrales para no gastar más de lo planeado en categorías clave.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="text-xl font-semibold text-slate-800">Configura alertas</h2>
        <p className="mb-6 text-sm text-slate-500">
          Define umbrales para recibir notificaciones cuando tus gastos superen el límite definido. Usa "Ahorro" para proteger tus metas.
        </p>
        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
          <Select
            label="Categoría"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
            options={categoriasAlertas}
          />
          <Input
            label="Umbral (COP)"
            name="umbral"
            type="number"
            value={form.umbral}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-6 py-2 font-semibold text-white transition hover:bg-primary/90"
            >
              Guardar alerta
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-lg font-semibold text-slate-800">Alertas activas</h3>
        <ul className="mt-4 space-y-3">
          {alertas.map((alerta) => {
            const gastoActual = egresosPorCategoria[alerta.categoria] || 0;
            const excedido = gastoActual > alerta.umbral;
            return (
              <li
                key={alerta.id}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                  excedido
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <div>
                  <p className="font-semibold">{alerta.categoria}</p>
                  <p className="text-xs">
                    Umbral: {alerta.umbral.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-semibold">
                    Gasto actual: {gastoActual.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                  </p>
                  <p>{excedido ? '¡Umbral superado!' : 'Dentro del límite'}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Alertas;
