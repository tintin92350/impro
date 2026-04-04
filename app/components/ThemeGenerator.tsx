import { useRandomTheme } from "~/hooks/useRandomTheme";

export default function ThemeGenerator({ categorie }: { categorie?: string }) {
  const { theme, generate } = useRandomTheme(categorie);

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <div className="min-h-[100px] flex items-center justify-center text-center px-4">
        {theme ? (
          <p key={theme.id} className="text-3xl font-bold leading-snug">
            « {theme.texte} »
          </p>
        ) : (
          <p className="text-text-secondary text-lg italic">Appuyez pour générer un thème</p>
        )}
      </div>
      {theme && (
        <span className="text-sm text-text-secondary capitalize">{theme.categorie}</span>
      )}
      <button
        type="button"
        onClick={generate}
        className="bg-swiss-400 active:bg-swiss-500 text-white font-bold rounded-2xl px-8 py-4 text-lg shadow-sm"
      >
        Générer un thème
      </button>
    </div>
  );
}
