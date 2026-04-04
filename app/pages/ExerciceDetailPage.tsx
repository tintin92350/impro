import { useParams, Link } from "react-router";
import { useContent } from "~/hooks/useContent";
import Tag from "~/components/Tag";

const niveauColor: Record<string, string> = {
  débutant: "bg-green-100 text-green-700",
  intermédiaire: "bg-amber-100 text-amber-700",
  avancé: "bg-red-100 text-red-700",
};

export default function ExerciceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { exercices, loading } = useContent();

  if (loading) return <p className="text-center py-12 text-text-secondary text-lg">Chargement…</p>;

  const exercice = exercices.find((e) => e.id === id);
  if (!exercice) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary text-lg mb-4">Exercice introuvable.</p>
        <Link to="/exercices" className="text-swiss-400 font-medium">← Retour aux exercices</Link>
      </div>
    );
  }

  const joueurs = exercice.nombreJoueurs.max
    ? `${exercice.nombreJoueurs.min}–${exercice.nombreJoueurs.max}`
    : `${exercice.nombreJoueurs.min}+`;

  return (
    <div>
      <Link to="/exercices" className="text-swiss-400 font-medium">← Retour aux exercices</Link>

      <div className="mt-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${niveauColor[exercice.niveau] ?? "bg-gray-100 text-gray-600"}`}>
            {exercice.niveau}
          </span>
          <Tag label={exercice.categorie} />
        </div>

        <h1 className="text-3xl font-black leading-tight">{exercice.titre}</h1>
        <p className="text-lg text-text-secondary mt-3 border-l-4 border-swiss-400 pl-4 leading-relaxed">
          {exercice.objectif}
        </p>

        <div className="flex gap-6 mt-5 text-base text-text-secondary font-medium">
          <span>{exercice.duree} min</span>
          <span>{joueurs} joueurs</span>
        </div>

        <div className="mt-8 text-base leading-relaxed whitespace-pre-line">
          {exercice.description}
        </div>

        {exercice.variantes && exercice.variantes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Variantes</h2>
            <ul className="space-y-2 text-base">
              {exercice.variantes.map((v, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-swiss-400 mt-0.5">•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exercice.conseils && exercice.conseils.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Conseils</h2>
            <ul className="space-y-2 text-base">
              {exercice.conseils.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-swiss-400 mt-0.5">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exercice.tags.length > 0 && (
          <div className="mt-8 pt-5 border-t border-gray-200 flex flex-wrap gap-2">
            {exercice.tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}
