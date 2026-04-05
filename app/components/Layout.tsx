import { NavLink, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { to: "/", label: "🏠 Accueil", short: "🏠", end: true },
  { to: "/fiches", label: "📖 Fiches", short: "📖", end: false },
  { to: "/exercices", label: "🎭 Exercices", short: "🎭", end: false },
  { to: "/generateur", label: "🎲 Thèmes", short: "🎲", end: false },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-page-bg flex flex-col">
      {/* Header desktop */}
      <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-white border-b border-gray-200/60">
        <NavLink to="/" className="text-xl font-black text-swiss-400 tracking-tight">
          🎪 Impro Suisse
        </NavLink>
        <nav className="flex gap-6">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `text-base font-bold rounded-full px-4 py-1.5 transition-colors ${
                  isActive
                    ? "bg-swiss-400 text-white"
                    : "text-text-secondary hover:bg-swiss-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-4 pb-24 lg:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom nav mobile */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex bg-white/95 backdrop-blur-sm border-t border-gray-200/60 safe-area-bottom">
        {navItems.map(({ to, short, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center py-3 text-2xl transition-transform ${
                isActive ? "scale-110" : "opacity-60"
              }`
            }
          >
            {short}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
