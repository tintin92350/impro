import { NavLink, Outlet } from "react-router";

const navItems = [
  { to: "/", label: "Accueil", end: true },
  { to: "/fiches", label: "Fiches", end: false },
  { to: "/exercices", label: "Exercices", end: false },
  { to: "/generateur", label: "Thèmes", end: false },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-page-bg flex flex-col">
      {/* Header desktop */}
      <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-white border-b border-gray-200">
        <NavLink to="/" className="text-xl font-bold text-swiss-400 tracking-tight">
          Impro Suisse
        </NavLink>
        <nav className="flex gap-8">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `text-base font-medium ${isActive ? "text-swiss-400" : "text-text-secondary hover:text-text-primary"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Header mobile */}
      <header className="lg:hidden flex items-center h-14 px-4 bg-white border-b border-gray-200">
        <NavLink to="/" className="text-lg font-bold text-swiss-400 tracking-tight">
          Impro Suisse
        </NavLink>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5 pb-20 lg:pb-8">
        <Outlet />
      </main>

      {/* Footer desktop */}
      <footer className="hidden lg:block border-t border-gray-200 bg-white py-4">
        <p className="text-center text-sm text-text-secondary">© 2026 Impro Suisse</p>
      </footer>

      {/* Bottom nav mobile */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex bg-white border-t border-gray-200 shadow-[0_-1px_4px_rgba(0,0,0,0.05)]">
        {navItems.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 py-3.5 text-center text-sm font-medium ${isActive ? "text-swiss-400" : "text-text-secondary"}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
