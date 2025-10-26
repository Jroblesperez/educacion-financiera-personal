import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { gastosPorCategoria, reportesMensuales } from '../data/mockData.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Reportes() {
  const barData = {
    labels: reportesMensuales.map((item) => item.mes),
    datasets: [
      {
        label: 'Ingresos',
        data: reportesMensuales.map((item) => item.ingresos),
        backgroundColor: '#22c55e',
        borderRadius: 8
      },
      {
        label: 'Egresos',
        data: reportesMensuales.map((item) => item.egresos),
        backgroundColor: '#ef4444',
        borderRadius: 8
      }
    ]
  };

  const doughnutData = {
    labels: gastosPorCategoria.map((item) => item.categoria),
    datasets: [
      {
        data: gastosPorCategoria.map((item) => item.monto),
        backgroundColor: ['#2563eb', '#22c55e', '#f97316', '#a855f7'],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="text-xl font-semibold text-slate-800">Resumen mensual</h2>
        <p className="mb-6 text-sm text-slate-500">
          Observa la evolución de tus ingresos y egresos durante los últimos meses.
        </p>
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} height={320} />
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
