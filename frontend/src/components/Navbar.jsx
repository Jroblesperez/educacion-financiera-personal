import { NavLink } from 'react-router-dom';

const links = [
  { to: '/app/registro', label: 'Registro' },
  { to: '/app/reportes', label: 'Reportes' },
  { to: '/app/alertas', label: 'Alertas' }
];

function Navbar() {
  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `rounded px-4 py-2 text-sm font-medium transition hover:bg-primary/10 ${
              isActive ? 'bg-primary text-white shadow' : 'text-slate-600'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
