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
  { label: 'Ocio', value: 'Ocio' }
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

    return {
      ingresos,
      egresos,
      balance: ingresos - egresos
    };
  }, [transacciones]);

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
