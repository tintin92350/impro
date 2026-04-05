import { motion, AnimatePresence } from "motion/react";
import { useRandomTheme } from "~/hooks/useRandomTheme";

export default function ThemeGenerator({ categorie }: { categorie?: string }) {
  const { theme, generate } = useRandomTheme(categorie);

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      <div className="min-h-[120px] flex items-center justify-center text-center px-2 w-full">
        <AnimatePresence mode="wait">
          {theme ? (
            <motion.p
              key={theme.id}
              initial={{ opacity: 0, scale: 0.8, rotateX: 40 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-3xl font-black leading-snug"
            >
              « {theme.texte} »
            </motion.p>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-text-secondary"
            >
              Prêt à jouer ? 🎭
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {theme && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-text-secondary font-medium capitalize bg-white rounded-full px-4 py-1 border border-gray-200"
        >
          {theme.categorie}
        </motion.span>
      )}

      <motion.button
        type="button"
        onClick={generate}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.03 }}
        className="bg-swiss-400 text-white font-black rounded-3xl px-10 py-5 text-xl shadow-lg shadow-swiss-400/25"
      >
        🎲 Générer !
      </motion.button>
    </div>
  );
}
