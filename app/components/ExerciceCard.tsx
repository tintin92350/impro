import { Link } from "react-router";
import type { Exercice } from "~/types/content";

const niveauColor: Record<string, string> = {
  débutant: "bg-green-100 text-green-700",
  intermédiaire: "bg-amber-100 text-amber-700",
  avancé: "bg-red-100 text-red-700",
};

export default function ExerciceCard({ exercice }: { exercice: Exercice }) {
  return (
    <Link
      to={`/exercices/${exercice.id}`}
      className="block bg-white rounded-2xl p-5 border border-gray-200 shadow-sm active:bg-gray-50"
    >
      <div className="flex items-center gap-2 text-sm">
        <span className={`rounded-full px-2.5 py-0.5 font-medium ${niveauColor[exercice.niveau] ?? "bg-gray-100 text-gray-600"}`}>
          {exercice.niveau}
        </span>
        <span className="text-text-secondary">{exercice.duree} min</span>
        <span className="text-text-secondary">
          {exercice.nombreJoueurs.min}{exercice.nombreJoueurs.max ? `–${exercice.nombreJoueurs.max}` : "+"} joueurs
        </span>
      </div>
      <h3 className="text-lg font-bold mt-3">{exercice.titre}</h3>
      <p className="text-base text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">{exercice.objectif}</p>
    </Link>
  );
}
