import { useParams, Link } from "react-router";
import { useContent } from "~/hooks/useContent";
import Tag from "~/components/Tag";

export default function FicheDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { fiches, loading } = useContent();

  if (loading) return <p className="text-center py-12 text-text-secondary text-lg">Chargement…</p>;

  const fiche = fiches.find((f) => f.id === id);
  if (!fiche) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary text-lg mb-4">Fiche introuvable.</p>
        <Link to="/fiches" className="text-swiss-400 font-medium">← Retour aux fiches</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/fiches" className="text-swiss-400 font-medium">← Retour aux fiches</Link>

      <div className="mt-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <Tag label={fiche.categorie} />
        <h1 className="text-3xl font-black mt-3 leading-tight">{fiche.titre}</h1>
        <p className="text-lg text-text-secondary mt-3 border-l-4 border-swiss-400 pl-4 leading-relaxed">
          {fiche.description}
        </p>

        <div className="mt-8 space-y-4 text-base leading-relaxed">
          {fiche.contenu.split(/\n\n+/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {fiche.tags.length > 0 && (
          <div className="mt-8 pt-5 border-t border-gray-200 flex flex-wrap gap-2">
            {fiche.tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}
