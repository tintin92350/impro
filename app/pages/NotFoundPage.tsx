import { Link } from "react-router";
import { motion } from "motion/react";

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <span className="text-6xl">🎭</span>
        <h1 className="text-3xl font-black mt-4 mb-2">La scène est vide…</h1>
        <p className="text-lg text-text-secondary mb-8">Cette page n'existe pas !</p>
        <Link
          to="/"
          className="inline-block bg-swiss-400 text-white font-black rounded-2xl px-8 py-4 text-lg shadow-lg shadow-swiss-400/20 active:scale-95 transition-transform"
        >
          ← Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
}
