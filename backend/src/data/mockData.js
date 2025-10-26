export const usuarios = [
  { id: 1, nombre: 'Laura Gómez', email: 'laura@example.com', password: '123456' }
];

export let transacciones = [
  {
    id: 1,
    usuarioId: 1,
    tipo: 'ingreso',
    monto: 2500000,
    categoria: 'Salario',
    fecha: '2023-09-30',
    descripcion: 'Pago mensual'
  },
  {
    id: 2,
    usuarioId: 1,
    tipo: 'egreso',
    monto: 450000,
    categoria: 'Arriendo',
    fecha: '2023-10-01',
    descripcion: 'Apartamento'
  }
];

export const reportes = [
  { mes: 'Agosto', ingresos: 2400000, egresos: 1700000 },
  { mes: 'Septiembre', ingresos: 2500000, egresos: 1600000 },
  { mes: 'Octubre', ingresos: 2550000, egresos: 1850000 }
];

export let alertas = [
  { id: 1, usuarioId: 1, categoria: 'Alimentación', umbral: 400000 },
  { id: 2, usuarioId: 1, categoria: 'Ocio', umbral: 200000 }
];

export function addTransaccion(transaccion) {
  const nuevaTransaccion = { id: Date.now(), ...transaccion };
  transacciones = [nuevaTransaccion, ...transacciones];
  return nuevaTransaccion;
}

export function addAlerta(alerta) {
  const nuevaAlerta = { id: Date.now(), ...alerta };
  alertas = [nuevaAlerta, ...alertas];
  return nuevaAlerta;
}
