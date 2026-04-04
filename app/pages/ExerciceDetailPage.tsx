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

  if (loading) return <p className="text-center py-12 text-text-secondary">Chargement…</p>;

  const exercice = exercices.find((e) => e.id === id);
  if (!exercice) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-4">Exercice introuvable.</p>
        <Link to="/exercices" className="text-swiss-400 text-sm font-medium">← Retour aux exercices</Link>
      </div>
    );
  }

  const joueurs = exercice.nombreJoueurs.max
    ? `${exercice.nombreJoueurs.min}–${exercice.nombreJoueurs.max}`
    : `${exercice.nombreJoueurs.min}+`;

  return (
    <div>
      <Link to="/exercices" className="text-swiss-400 text-sm font-medium">← Retour aux exercices</Link>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${niveauColor[exercice.niveau] ?? "bg-gray-100 text-gray-600"}`}>
            {exercice.niveau}
          </span>
          <Tag label={exercice.categorie} />
        </div>

        <h1 className="font-display text-2xl font-bold">{exercice.titre}</h1>
        <p className="text-text-secondary mt-2 border-l-3 border-swiss-400 pl-3">{exercice.objectif}</p>

        <div className="flex gap-4 mt-4 text-sm text-text-secondary">
          <span>{exercice.duree} min</span>
          <span>{joueurs} joueurs</span>
        </div>

        <div className="mt-6 text-sm leading-relaxed whitespace-pre-line">
          {exercice.description}
        </div>

        {exercice.variantes && exercice.variantes.length > 0 && (
          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold mb-2">Variantes</h2>
            <ul className="space-y-1 text-sm">
              {exercice.variantes.map((v, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-swiss-400 mt-1">•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exercice.conseils && exercice.conseils.length > 0 && (
          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold mb-2">Conseils</h2>
            <ul className="space-y-1 text-sm">
              {exercice.conseils.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-swiss-400 mt-1">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exercice.tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
            {exercice.tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}
