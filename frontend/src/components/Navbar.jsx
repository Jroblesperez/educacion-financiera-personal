import { NavLink } from 'react-router-dom';

const links = [
  {
    to: '/app/registro',
    label: 'Registro',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 6v12m-6-6h12"
        />
      </svg>
    )
  },
  {
    to: '/app/reportes',
    label: 'Reportes',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 19h16M8 15v-5m4 5V5m4 10V9"
        />
      </svg>
    )
  },
  {
    to: '/app/alertas',
    label: 'Alertas',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 9v4m0 4h.01M5.07 19h13.86a1 1 0 00.9-1.45L12.9 4.55a1 1 0 00-1.8 0L4.17 17.55A1 1 0 005.07 19z"
        />
      </svg>
    )
  }
];

function Navbar() {
  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded px-4 py-2 text-sm font-medium transition hover:bg-primary/10 ${
              isActive ? 'bg-primary text-white shadow' : 'text-slate-600'
            }`
          }
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-primary ${
              link.to === '/app/alertas' ? 'bg-amber-50' : 'bg-primary/10'
            } ${link.to === '/app/alertas' ? 'text-amber-600' : ''}`}
          >
            {link.icon}
          </span>
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
