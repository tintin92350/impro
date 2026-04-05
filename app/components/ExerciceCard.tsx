import { Link } from "react-router";
import { motion } from "motion/react";
import type { Exercice } from "~/types/content";

const niveauEmoji: Record<string, string> = {
  débutant: "🟢",
  intermédiaire: "🟡",
  avancé: "🔴",
};

export default function ExerciceCard({ exercice, index = 0 }: { exercice: Exercice; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={`/exercices/${exercice.id}`}
        className="block bg-white rounded-3xl p-5 border border-gray-200/60 shadow-sm active:scale-[0.97] transition-transform"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-text-secondary">
          <span>{niveauEmoji[exercice.niveau] ?? "⚪"} {exercice.niveau}</span>
          <span>·</span>
          <span>⏱ {exercice.duree} min</span>
          <span>·</span>
          <span>👥 {exercice.nombreJoueurs.min}{exercice.nombreJoueurs.max ? `–${exercice.nombreJoueurs.max}` : "+"}</span>
        </div>
        <h3 className="text-lg font-bold mt-2">{exercice.titre}</h3>
        <p className="text-base text-text-secondary mt-1 line-clamp-2 leading-relaxed">{exercice.objectif}</p>
        <span className="inline-block mt-3 text-sm font-bold text-swiss-400">Voir →</span>
      </Link>
    </motion.div>
  );
}
