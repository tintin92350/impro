import { NavLink, Outlet } from "react-router";

// ── Swiss Cross SVG (white cross on red circle) ────────────────────────────
function SwissCross({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="14" fill="#E51E25" />
      {/* Horizontal bar */}
      <rect x="6" y="11.5" width="16" height="5" rx="1" fill="white" />
      {/* Vertical bar */}
      <rect x="11.5" y="6" width="5" height="16" rx="1" fill="white" />
    </svg>
  );
}

// ── Nav icon components ────────────────────────────────────────────────────
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "none" : "none"}
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
      <polyline points="9 21 9 12 15 12 15 21" />
    </svg>
  );
}

function BookIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function PlayIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={active ? 0 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SparkleIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

// ── nav items config ───────────────────────────────────────────────────────
const navItems = [
  { to: "/", label: "Accueil", Icon: HomeIcon, end: true },
  { to: "/fiches", label: "Fiches", Icon: BookIcon, end: false },
  { to: "/exercices", label: "Exercices", Icon: PlayIcon, end: false },
  { to: "/generateur", label: "Générateur", Icon: SparkleIcon, end: false },
] as const;

// ── Desktop header link ────────────────────────────────────────────────────
function DesktopNavLink({
  to,
  label,
  end,
}: {
  to: string;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "relative font-body font-medium text-sm pb-0.5 transition-colors duration-150",
          "hover:text-swiss-400",
          isActive
            ? "text-swiss-400 after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-swiss-400"
            : "text-text-secondary",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

// ── Mobile bottom tab ──────────────────────────────────────────────────────
function MobileTab({
  to,
  label,
  Icon,
  end,
}: {
  to: string;
  label: string;
  Icon: React.ComponentType<{ active: boolean }>;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-[10px] font-medium font-body transition-colors duration-150",
          isActive ? "text-swiss-400" : "text-text-secondary",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <Icon active={isActive} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

// ── Layout shell ───────────────────────────────────────────────────────────
export default function Layout() {
  return (
    <div className="min-h-screen bg-page-bg flex flex-col">
      {/* ── Desktop header ─────────────────────────────────────────── */}
      <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-white border-b border-gray-100 shadow-sm">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-400 rounded"
        >
          <SwissCross size={30} />
          <span className="font-display text-xl font-bold text-text-primary tracking-tight group-hover:text-swiss-500 transition-colors duration-150">
            Impro Suisse
          </span>
        </NavLink>

        {/* Nav links */}
        <nav className="flex items-center gap-8" aria-label="Navigation principale">
          {navItems.map(({ to, label, end }) => (
            <DesktopNavLink key={to} to={to} label={label} end={end} />
          ))}
        </nav>
      </header>

      {/* ── Mobile top bar (logo only, no nav) ─────────────────────── */}
      <header className="lg:hidden flex items-center h-14 px-4 bg-white border-b border-gray-100 shadow-sm">
        <NavLink to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-400 rounded">
          <SwissCross size={26} />
          <span className="font-display text-lg font-bold text-text-primary tracking-tight">
            Impro Suisse
          </span>
        </NavLink>
      </header>

      {/* ── Main content ───────────────────────────────────────────── */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-6">
          <Outlet />
        </div>
      </main>

      {/* ── Desktop footer ─────────────────────────────────────────── */}
      <footer className="hidden lg:block border-t border-gray-100 bg-white py-4">
        <p className="text-center text-xs font-body text-text-secondary">
          © 2026 Impro Suisse
        </p>
      </footer>

      {/* ── Mobile bottom nav ──────────────────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex bg-white border-t border-gray-100 shadow-[0_-1px_8px_rgba(0,0,0,0.06)]"
        aria-label="Navigation mobile"
      >
        {navItems.map(({ to, label, Icon, end }) => (
          <MobileTab key={to} to={to} label={label} Icon={Icon} end={end} />
        ))}
      </nav>
    </div>
  );
}
