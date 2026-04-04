import { useState } from "react";
import ThemeGenerator from "~/components/ThemeGenerator";

const CATEGORIES = ["situation", "lieu", "emotion", "objet", "personnage", "phrase"] as const;

export default function GenerateurPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-3xl font-black mb-5">Générateur de thèmes</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${
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
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize ${
              selected === c ? "bg-swiss-400 text-white" : "bg-swiss-50 text-swiss-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <ThemeGenerator categorie={selected ?? undefined} />
      </div>
    </div>
  );
}
