import { useRandomTheme } from "~/hooks/useRandomTheme";

export default function ThemeGenerator({ categorie }: { categorie?: string }) {
  const { theme, generate } = useRandomTheme(categorie);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="min-h-[80px] flex items-center justify-center text-center px-4">
        {theme ? (
          <p key={theme.id} className="font-display text-2xl font-bold">
            {theme.texte}
          </p>
        ) : (
          <p className="text-text-secondary text-sm italic">Appuyez pour générer un thème</p>
        )}
      </div>
      {theme && (
        <span className="text-xs text-text-secondary capitalize">{theme.categorie}</span>
      )}
      <button
        type="button"
        onClick={generate}
        className="bg-swiss-400 active:bg-swiss-500 text-white font-medium rounded-xl px-6 py-3 text-base"
      >
        Générer un thème
      </button>
    </div>
  );
}
