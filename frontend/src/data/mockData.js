export const transacciones = [
  {
    id: 1,
    tipo: 'ingreso',
    monto: 2500000,
    categoria: 'Salario',
    fecha: '2023-09-30',
    descripcion: 'Pago mensual'
  },
  {
    id: 2,
    tipo: 'egreso',
    monto: 450000,
    categoria: 'Arriendo',
    fecha: '2023-10-01',
    descripcion: 'Apartamento'
  },
  {
    id: 3,
    tipo: 'egreso',
    monto: 200000,
    categoria: 'Transporte',
    fecha: '2023-10-02',
    descripcion: 'Transporte público'
  },
  {
    id: 4,
    tipo: 'egreso',
    monto: 180000,
    categoria: 'Alimentación',
    fecha: '2023-10-02',
    descripcion: 'Mercado semanal'
  }
];

export const reportesMensuales = [
  {
    mes: 'Agosto',
    ingresos: 2400000,
    egresos: 1700000
  },
  {
    mes: 'Septiembre',
    ingresos: 2500000,
    egresos: 1600000
  },
  {
    mes: 'Octubre',
    ingresos: 2550000,
    egresos: 1850000
  }
];

export const gastosPorCategoria = [
  { categoria: 'Arriendo', monto: 800000 },
  { categoria: 'Transporte', monto: 220000 },
  { categoria: 'Alimentación', monto: 350000 },
  { categoria: 'Ocio', monto: 180000 }
];

export const alertasIniciales = [
  { id: 1, categoria: 'Alimentación', umbral: 400000 },
  { id: 2, categoria: 'Ocio', umbral: 200000 }
];
