import { useState } from "react";
import { useRandomTheme } from "~/hooks/useRandomTheme";

interface ThemeGeneratorProps {
  categorie?: string;
}

export function ThemeGenerator({ categorie }: ThemeGeneratorProps) {
  const { theme, generate } = useRandomTheme(categorie);
  const [animating, setAnimating] = useState(false);

  function handleGenerate() {
    setAnimating(false);
    // Force reflow so the animation re-triggers
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        generate();
        setAnimating(true);
      });
    });
  }

  return (
    <div className="flex flex-col items-center gap-8 py-6 w-full">
      {/* Theme display */}
      <div className="min-h-[7rem] flex items-center justify-center w-full">
        {theme ? (
          <p
            key={theme.id}
            className={`font-display text-4xl sm:text-5xl font-bold text-text-primary text-center leading-tight px-4 ${
              animating ? "animate-scale-pop" : ""
            }`}
            style={
              animating
                ? {
                    animation: "scale-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
                  }
                : undefined
            }
          >
            {theme.texte}
          </p>
        ) : (
          <p className="font-display text-2xl sm:text-3xl text-text-secondary text-center italic px-4">
            Appuyez pour générer un thème
          </p>
        )}
      </div>

      {/* Generate button */}
      <button
        type="button"
        onClick={handleGenerate}
        className="
          inline-flex items-center gap-3
          bg-swiss-400 hover:bg-swiss-500 active:bg-swiss-600
          text-white font-body font-semibold
          rounded-xl px-8 py-4 text-base
          shadow-sm hover:shadow-md
          transition-all duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-400 focus-visible:ring-offset-2
          cursor-pointer
        "
      >
        {/* Dice icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="3" ry="3" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
        Générer un thème
      </button>

      {/* Inline keyframe for the pop animation */}
      <style>{`
        @keyframes scale-pop {
          0%   { opacity: 0; transform: scale(0.8); }
          60%  { transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default ThemeGenerator;
