import { Link } from "react-router";

export default function HomePage() {
  return (
    <div>
      <div className="text-center py-10">
        <h1 className="text-4xl font-black tracking-tight">Impro Suisse</h1>
        <p className="text-text-secondary mt-3 text-lg">
          Votre ressource pour l'improvisation théâtrale
        </p>
      </div>

      <div className="flex flex-col gap-4">
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
      className="block bg-white rounded-2xl p-5 border border-gray-200 shadow-sm active:bg-gray-50"
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-base text-text-secondary mt-1.5 leading-relaxed">{desc}</p>
    </Link>
  );
}
