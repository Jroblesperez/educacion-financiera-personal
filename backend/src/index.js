import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {
  usuarios,
  transacciones,
  reportes,
  alertas,
  addTransaccion,
  addAlerta
} from './data/mockData.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de educación financiera personal' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find((item) => item.email === email && item.password === password);

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  res.json({ token: 'token-simulacion', usuario: { id: usuario.id, nombre: usuario.nombre, email } });
});

app.get('/transacciones', (req, res) => {
  res.json(transacciones);
});

app.post('/transacciones', (req, res) => {
  const { usuarioId = 1, tipo, monto, categoria, fecha, descripcion } = req.body;
  if (!tipo || !monto || !categoria || !fecha) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  const nuevaTransaccion = addTransaccion({
    usuarioId,
    tipo,
    monto,
    categoria,
    fecha,
    descripcion
  });

  res.status(201).json(nuevaTransaccion);
});

app.get('/reportes', (req, res) => {
  res.json(reportes);
});

app.post('/alertas', (req, res) => {
  const { usuarioId = 1, categoria, umbral } = req.body;
  if (!categoria || !umbral) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  const nuevaAlerta = addAlerta({ usuarioId, categoria, umbral });
  res.status(201).json(nuevaAlerta);
});

app.get('/alertas', (req, res) => {
  res.json(alertas);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
