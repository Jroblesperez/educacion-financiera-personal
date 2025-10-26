import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Registro from './pages/Registro.jsx';
import Reportes from './pages/Reportes.jsx';
import Alertas from './pages/Alertas.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<Dashboard />}>
        <Route path="registro" element={<Registro />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="alertas" element={<Alertas />} />
        <Route index element={<Navigate to="registro" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
