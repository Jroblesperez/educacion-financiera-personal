import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { gastosPorCategoria, reportesMensuales } from '../data/mockData.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Reportes() {
  const resumenMensual = useMemo(() => {
    const maxTotal = Math.max(
      ...reportesMensuales.map((item) => item.ingresos + item.egresos)
    );

    return reportesMensuales.map((item) => {
      const total = item.ingresos + item.egresos;
      const balance = item.ingresos - item.egresos;
      const balanceEsPositivo = balance >= 0;
      const porcentajeIngresos = Math.round((item.ingresos / maxTotal) * 100);
      const porcentajeEgresos = Math.round((item.egresos / maxTotal) * 100);

      return {
        ...item,
        total,
        balance,
        balanceEsPositivo,
        porcentajeIngresos,
        porcentajeEgresos
      };
    });
  }, []);

  const doughnutData = useMemo(
    () => ({
      labels: gastosPorCategoria.map((item) => item.categoria),
      datasets: [
        {
          data: gastosPorCategoria.map((item) => item.monto),
          backgroundColor: ['#2563eb', '#22c55e', '#f97316', '#a855f7'],
          borderWidth: 0
        }
      ]
    }),
    []
  );

  const metricasAhorro = useMemo(() => {
    const totales = reportesMensuales.reduce(
      (acc, item) => {
        acc.ingresos += item.ingresos;
        acc.egresos += item.egresos;
        acc.balance += item.ingresos - item.egresos;
        return acc;
      },
      { ingresos: 0, egresos: 0, balance: 0 }
    );

    const balancePromedio = Math.round(totales.balance / reportesMensuales.length);
    const ahorroPotencial = Math.max(0, Math.round(balancePromedio * 0.3));

    return {
      promedioBalance: balancePromedio,
      porcentajeAhorro: Math.min(50, Math.round((ahorroPotencial / totales.ingresos) * 1000) / 10),
      ahorroPotencial
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="text-xl font-semibold text-slate-800">Resumen mensual</h2>
        <p className="mb-6 text-sm text-slate-500">
          Observa la evolución de tus ingresos y egresos durante los últimos meses.
        </p>
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m0 0H7m5 0h5" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Balance promedio</p>
              <p className={`text-sm font-semibold ${metricasAhorro.promedioBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(metricasAhorro.promedioBalance)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 12h16m-9 5l-3.5 3.5M11 17l3.5 3.5M9.5 6.5L12 9m0 0l2.5-2.5M12 9v6" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Ahorro potencial</p>
              <p className="text-sm font-semibold text-emerald-700">
                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(metricasAhorro.ahorroPotencial)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 12h12M6 12a6 6 0 016-6m-6 6a6 6 0 006 6m0-12a6 6 0 016 6m-6-6a6 6 0 01-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Porcentaje sugerido</p>
              <p className="text-sm font-semibold text-amber-700">{metricasAhorro.porcentajeAhorro}% del ingreso</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resumenMensual.map((item) => (
            <div
              key={item.mes}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/40 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.mes}</p>
                  <p className="text-xs text-slate-400">Total movido</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.balanceEsPositivo
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {item.balanceEsPositivo ? 'Superávit' : 'Déficit'}
                </span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Ingresos</span>
                  <span className="font-semibold text-emerald-600">
                    {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      maximumFractionDigits: 0
                    }).format(item.ingresos)}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-emerald-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${item.porcentajeIngresos}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Egresos</span>
                  <span className="font-semibold text-rose-600">
                    {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      maximumFractionDigits: 0
                    }).format(item.egresos)}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-rose-100">
                  <div
                    className="h-full rounded-full bg-rose-500 transition-all"
                    style={{ width: `${item.porcentajeEgresos}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                <span>Total movido</span>
                <span className="font-semibold text-slate-500">
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    maximumFractionDigits: 0
                  }).format(item.total)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Balance neto</span>
                <span
                  className={`font-semibold ${
                    item.balanceEsPositivo ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    maximumFractionDigits: 0
                  }).format(item.balance)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h3 className="text-lg font-semibold text-slate-800">Distribución de gastos</h3>
          <p className="mb-6 text-sm text-slate-500">
            Identifica las categorías donde estás gastando más.
          </p>
          <div className="mx-auto max-w-xs">
            <Doughnut data={doughnutData} />
          </div>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow">
          <h3 className="text-lg font-semibold text-slate-800">Recomendaciones inteligentes</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Reduce en un 10% tus gastos de ocio para mejorar tu balance mensual.</li>
            <li>Considera automatizar un ahorro del 5% de tus ingresos.</li>
            <li>Programa alertas para categorías con egresos crecientes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reportes;
