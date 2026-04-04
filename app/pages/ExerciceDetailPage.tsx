import { useParams, Link } from "react-router";
import { useContent } from "~/hooks/useContent";
import Tag from "~/components/Tag";

const NIVEAU_COLORS: Record<string, string> = {
  débutant: "bg-emerald-100 text-emerald-700",
  intermédiaire: "bg-amber-100 text-amber-700",
  avancé: "bg-rose-100 text-rose-700",
};

export default function ExerciceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { exercices, loading, error } = useContent();

  if (loading) {
    return (
      <div className="min-h-screen bg-swiss-50 flex justify-center items-center">
        <div className="w-10 h-10 rounded-full border-4 border-swiss-400/20 border-t-swiss-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-swiss-50 flex justify-center items-center px-6">
        <div className="rounded-xl bg-red-50 border border-red-100 p-6 text-red-700 font-body text-sm max-w-md w-full text-center">
          Une erreur est survenue : {error}
        </div>
      </div>
    );
  }

  const exercice = exercices.find((e) => e.id === id);

  if (!exercice) {
    return (
      <div className="min-h-screen bg-swiss-50 flex flex-col items-center justify-center px-6 text-center animate-fade-in">
        <p className="text-7xl mb-6">🎭</p>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">
          Exercice introuvable
        </h1>
        <p className="font-body text-gray-500 mb-8">
          Cet exercice n'existe pas ou a été déplacé.
        </p>
        <Link
          to="/exercices"
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-swiss-400 hover:text-swiss-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux exercices
        </Link>
      </div>
    );
  }

  const niveauClass = NIVEAU_COLORS[exercice.niveau] ?? "bg-gray-100 text-gray-700";
  const joueurs =
    exercice.nombreJoueurs.max === null
      ? `${exercice.nombreJoueurs.min}+`
      : exercice.nombreJoueurs.min === exercice.nombreJoueurs.max
        ? `${exercice.nombreJoueurs.min}`
        : `${exercice.nombreJoueurs.min}–${exercice.nombreJoueurs.max}`;

  return (
    <div className="min-h-screen bg-swiss-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          to="/exercices"
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-gray-400 hover:text-swiss-400 transition-colors mb-10 animate-fade-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Tous les exercices
        </Link>

        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 animate-fade-in-up">
          {/* Meta badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-body font-semibold capitalize ${niveauClass}`}
            >
              {exercice.niveau}
            </span>
            <Tag label={exercice.categorie} />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {exercice.titre}
          </h1>

          {/* Objectif */}
          <p className="font-body text-lg text-gray-600 leading-relaxed border-l-4 border-swiss-400 pl-5 mb-10">
            {exercice.objectif}
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl bg-swiss-50 p-4">
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">
                Durée
              </p>
              <p className="font-display text-2xl font-bold text-gray-900">
                {exercice.duree}
                <span className="text-base font-body font-normal text-gray-500 ml-1">min</span>
              </p>
            </div>
            <div className="rounded-xl bg-swiss-50 p-4">
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">
                Joueurs
              </p>
              <p className="font-display text-2xl font-bold text-gray-900">
                {joueurs}
                <span className="text-base font-body font-normal text-gray-500 ml-1">
                  {exercice.nombreJoueurs.min > 1 || exercice.nombreJoueurs.max !== 1
                    ? "joueurs"
                    : "joueur"}
                </span>
              </p>
            </div>
          </div>

          {/* Description */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <p className="font-body text-gray-700 leading-relaxed whitespace-pre-line">
              {exercice.description}
            </p>
          </section>

          {/* Variantes */}
          {exercice.variantes && exercice.variantes.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
                Variantes
              </h2>
              <ul className="space-y-2">
                {exercice.variantes.map((v, i) => (
                  <li key={i} className="flex gap-3 font-body text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-swiss-400 shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Conseils */}
          {exercice.conseils && exercice.conseils.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
                Conseils
              </h2>
              <ul className="space-y-2">
                {exercice.conseils.map((c, i) => (
                  <li key={i} className="flex gap-3 font-body text-gray-700">
                    <span className="text-swiss-400 shrink-0">💡</span>
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tags */}
          {exercice.tags.length > 0 && (
            <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-2">
              {exercice.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
