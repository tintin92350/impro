import { Link } from "react-router";
import { motion } from "motion/react";
import type { Fiche } from "~/types/content";

const catEmoji: Record<string, string> = {
  technique: "🔧",
  concept: "💡",
  format: "🎬",
  regle: "📏",
};

export default function FicheCard({ fiche, index = 0 }: { fiche: Fiche; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={`/fiches/${fiche.id}`}
        className="block bg-white rounded-3xl p-5 border border-gray-200/60 shadow-sm active:scale-[0.97] transition-transform"
      >
        <span className="text-2xl">{catEmoji[fiche.categorie] ?? "📄"}</span>
        <h3 className="text-lg font-bold mt-2">{fiche.titre}</h3>
        <p className="text-base text-text-secondary mt-1 line-clamp-2 leading-relaxed">{fiche.description}</p>
        <span className="inline-block mt-3 text-sm font-bold text-swiss-400">Lire →</span>
      </Link>
    </motion.div>
  );
}
