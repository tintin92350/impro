import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { useContent } from "~/hooks/useContent";
import Tag from "~/components/Tag";

const niveauEmoji: Record<string, string> = {
  débutant: "🟢",
  intermédiaire: "🟡",
  avancé: "🔴",
};

export default function ExerciceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { exercices, loading } = useContent();

  if (loading) return <p className="text-center py-16 text-xl text-text-secondary">Chargement… ⏳</p>;

  const exercice = exercices.find((e) => e.id === id);
  if (!exercice) {
    return (
      <div className="text-center py-16">
        <span className="text-5xl">🤔</span>
        <p className="text-lg text-text-secondary mt-4 mb-4">Exercice introuvable.</p>
        <Link to="/exercices" className="text-swiss-400 font-bold text-lg">← Retour</Link>
      </div>
    );
  }

  const joueurs = exercice.nombreJoueurs.max
    ? `${exercice.nombreJoueurs.min}–${exercice.nombreJoueurs.max}`
    : `${exercice.nombreJoueurs.min}+`;

  return (
    <div>
      <Link to="/exercices" className="text-swiss-400 font-bold">← Exercices</Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 bg-white rounded-3xl p-6 border border-gray-200/60 shadow-sm"
      >
        <div className="flex items-center gap-3 text-sm font-bold text-text-secondary">
          <span>{niveauEmoji[exercice.niveau]} {exercice.niveau}</span>
          <Tag label={exercice.categorie} />
        </div>

        <h1 className="text-3xl font-black mt-3 leading-tight">{exercice.titre}</h1>
        <p className="text-lg text-text-secondary mt-3 border-l-4 border-swiss-400 pl-4 leading-relaxed">
          {exercice.objectif}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mt-5">
          <div className="flex-1 bg-page-bg rounded-2xl p-4 text-center">
            <span className="text-2xl">⏱</span>
            <p className="text-lg font-black mt-1">{exercice.duree} min</p>
          </div>
          <div className="flex-1 bg-page-bg rounded-2xl p-4 text-center">
            <span className="text-2xl">👥</span>
            <p className="text-lg font-black mt-1">{joueurs}</p>
          </div>
        </div>

        <div className="mt-8 text-base leading-relaxed whitespace-pre-line">
          {exercice.description}
        </div>

        {exercice.variantes && exercice.variantes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-black mb-3">💡 Variantes</h2>
            <ul className="space-y-2 text-base">
              {exercice.variantes.map((v, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-swiss-400 font-bold">•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exercice.conseils && exercice.conseils.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-black mb-3">🎯 Conseils</h2>
            <ul className="space-y-2 text-base">
              {exercice.conseils.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-swiss-400 font-bold">•</span>
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
      </motion.div>
    </div>
  );
}
