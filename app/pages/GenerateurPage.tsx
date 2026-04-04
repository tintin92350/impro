import { useState } from "react";
import ThemeGenerator from "~/components/ThemeGenerator";

const CATEGORIES = [
  "situation",
  "lieu",
  "emotion",
  "objet",
  "personnage",
  "phrase",
] as const;

type Categorie = (typeof CATEGORIES)[number];

export default function GenerateurPage() {
  const [selectedCategorie, setSelectedCategorie] = useState<Categorie | null>(null);

  function toggle(cat: Categorie) {
    setSelectedCategorie((prev) => (prev === cat ? null : cat));
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Theatrical spotlight background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-swiss-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-swiss-400/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-swiss-400/30 text-swiss-400 text-sm font-body font-medium tracking-widest uppercase">
            Générateur aléatoire
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Générateur de{" "}
            <span className="text-swiss-400">thèmes</span>
          </h1>
          <p className="font-body text-gray-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Un thème, une scène, l'infini. Laissez le hasard guider votre imagination.
          </p>
        </div>

        {/* Category filter */}
        <div className="w-full mb-12 animate-fade-in stagger-1">
          <p className="font-body text-xs text-gray-500 uppercase tracking-widest text-center mb-4">
            Filtrer par catégorie
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategorie(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 border ${
                selectedCategorie === null
                  ? "bg-swiss-400 border-swiss-400 text-white"
                  : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
              }`}
            >
              Toutes
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => toggle(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-body font-medium capitalize transition-all duration-200 border ${
                  selectedCategorie === cat
                    ? "bg-swiss-400 border-swiss-400 text-white"
                    : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Generator */}
        <div className="w-full animate-fade-in-up stagger-2">
          <ThemeGenerator categorie={selectedCategorie ?? undefined} />
        </div>

        {/* Footer decoration */}
        <div className="mt-20 flex items-center gap-3 animate-fade-in stagger-4">
          <span className="w-12 h-px bg-gray-800" />
          <span className="text-gray-700 text-sm font-body">
            L'impro commence dans ta tête
          </span>
          <span className="w-12 h-px bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
