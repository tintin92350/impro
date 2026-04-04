import { Link } from "react-router";

export default function HomePage() {
  return (
    <div>
      <div className="text-center py-8">
        <h1 className="font-display text-3xl font-bold">Impro Suisse</h1>
        <p className="text-text-secondary mt-2 text-sm">
          Votre ressource pour l'improvisation théâtrale
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <NavCard to="/fiches" title="Fiches" desc="Concepts, techniques et règles" />
        <NavCard to="/exercices" title="Exercices" desc="Échauffements et scènes pour tous niveaux" />
        <NavCard to="/generateur" title="Générateur de thèmes" desc="Un thème au hasard pour votre prochaine scène" />
      </div>
    </div>
  );
}

function NavCard({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link
      to={to}
      className="block bg-white rounded-xl p-4 border border-gray-200 active:bg-gray-50"
    >
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="text-sm text-text-secondary mt-1">{desc}</p>
    </Link>
  );
}
