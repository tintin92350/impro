import { useState } from "react";
import { motion } from "motion/react";
import ThemeGenerator from "~/components/ThemeGenerator";
import Tag from "~/components/Tag";

const CATEGORIES = ["situation", "lieu", "emotion", "objet", "personnage", "phrase"] as const;

export default function GenerateurPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-3xl font-black mb-5">🎲 Générateur</h1>

      <div className="flex flex-wrap gap-2 mb-5">
        <Tag
          label="Toutes"
          active={selected === null}
          onClick={() => setSelected(null)}
        />
        {CATEGORIES.map((c) => (
          <Tag
            key={c}
            label={c}
            active={selected === c}
            onClick={() => setSelected(selected === c ? null : c)}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 border border-gray-200/60 shadow-sm"
      >
        <ThemeGenerator categorie={selected ?? undefined} />
      </motion.div>
    </div>
  );
}
