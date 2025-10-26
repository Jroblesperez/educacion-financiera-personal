import { useEffect, useMemo, useRef } from 'react';
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
  const barChartRef = useRef(null);

  const barData = useMemo(
    () => ({
      labels: reportesMensuales.map((item) => item.mes),
      datasets: [
        {
          label: 'Ingresos',
          data: reportesMensuales.map((item) => item.ingresos),
          backgroundColor: '#22c55e',
          borderRadius: 8,
          maxBarThickness: 48
        },
        {
          label: 'Egresos',
          data: reportesMensuales.map((item) => item.egresos),
          backgroundColor: '#ef4444',
          borderRadius: 8,
          maxBarThickness: 48
        }
      ]
    }),
    []
  );

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

  const barOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 200,
      animations: {
        resize: {
          duration: 0
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0
              }).format(context.parsed.y)}`
          }
        }
      },
      layout: {
        padding: {
          top: 12,
          right: 16,
          left: 16,
          bottom: 16
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) =>
              new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0
              }).format(value)
          }
        }
      }
    }),
    []
  );

  useEffect(() => {
    const chartInstance = barChartRef.current;
    if (!chartInstance) return;

    const canvas = chartInstance.canvas;
    if (!canvas) return;

    const blurOnFocus = () => {
      if (document.activeElement === canvas) {
        canvas.blur();
      }
    };

    blurOnFocus();
    canvas.addEventListener('focus', blurOnFocus);

    return () => {
      canvas.removeEventListener('focus', blurOnFocus);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="text-xl font-semibold text-slate-800">Resumen mensual</h2>
        <p className="mb-6 text-sm text-slate-500">
          Observa la evolución de tus ingresos y egresos durante los últimos meses.
        </p>
        <div className="relative w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50/40 p-4">
          <div className="relative h-[22rem] w-full">
            <Bar ref={barChartRef} data={barData} options={barOptions} />
          </div>
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
