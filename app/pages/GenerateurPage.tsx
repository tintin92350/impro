import { useState } from "react";
import ThemeGenerator from "~/components/ThemeGenerator";

const CATEGORIES = ["situation", "lieu", "emotion", "objet", "personnage", "phrase"] as const;

export default function GenerateurPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-4">Générateur de thèmes</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            selected === null ? "bg-swiss-400 text-white" : "bg-swiss-50 text-swiss-600"
          }`}
        >
          Toutes
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelected(selected === c ? null : c)}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
              selected === c ? "bg-swiss-400 text-white" : "bg-swiss-50 text-swiss-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ThemeGenerator categorie={selected ?? undefined} />
    </div>
  );
}
