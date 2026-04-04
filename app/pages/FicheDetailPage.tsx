import { useParams, Link } from "react-router";
import { useContent } from "~/hooks/useContent";
import Tag from "~/components/Tag";

export default function FicheDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { fiches, loading, error } = useContent();

  if (loading) {
    return (
      <div className="min-h-screen bg-swiss-50 flex justify-center items-center">
        <div className="w-10 h-10 rounded-full border-4 border-swiss-400/20 border-t-swiss-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-swiss-50 flex justify-center items-center px-6">
        <div className="rounded-xl bg-red-50 border border-red-100 p-6 text-red-700 font-body text-sm max-w-md w-full text-center">
          Une erreur est survenue : {error}
        </div>
      </div>
    );
  }

  const fiche = fiches.find((f) => f.id === id);

  if (!fiche) {
    return (
      <div className="min-h-screen bg-swiss-50 flex flex-col items-center justify-center px-6 text-center animate-fade-in">
        <p className="text-7xl mb-6">🎭</p>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">
          Fiche introuvable
        </h1>
        <p className="font-body text-gray-500 mb-8">
          Cette fiche n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/fiches"
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-swiss-400 hover:text-swiss-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux fiches
        </Link>
      </div>
    );
  }

  const paragraphs = fiche.contenu.split(/\n\n+/);

  return (
    <div className="min-h-screen bg-swiss-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          to="/fiches"
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-gray-400 hover:text-swiss-400 transition-colors mb-10 animate-fade-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Toutes les fiches
        </Link>

        {/* Content card */}
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 animate-fade-in-up">
          <div className="mb-6">
            <Tag label={fiche.categorie} />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {fiche.titre}
          </h1>

          {/* Description */}
          <p className="font-body text-lg text-gray-600 leading-relaxed border-l-4 border-swiss-400 pl-5 mb-10">
            {fiche.description}
          </p>

          {/* Contenu */}
          <div className="space-y-4">
            {paragraphs.map((para, i) => {
              const lines = para.split(/\n/);
              if (lines.length > 1) {
                return (
                  <div key={i} className="space-y-1">
                    {lines.map((line, j) => (
                      <p key={j} className="font-body text-gray-700 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              }
              return (
                <p key={i} className="font-body text-gray-700 leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {fiche.tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
              {fiche.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
