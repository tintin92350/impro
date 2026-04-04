import { useParams, Link } from "react-router";
import { useContent } from "~/hooks/useContent";
import Tag from "~/components/Tag";

export default function FicheDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { fiches, loading } = useContent();

  if (loading) return <p className="text-center py-12 text-text-secondary">Chargement…</p>;

  const fiche = fiches.find((f) => f.id === id);
  if (!fiche) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-4">Fiche introuvable.</p>
        <Link to="/fiches" className="text-swiss-400 text-sm font-medium">← Retour aux fiches</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/fiches" className="text-swiss-400 text-sm font-medium">← Retour aux fiches</Link>

      <div className="mt-4">
        <Tag label={fiche.categorie} />
        <h1 className="font-display text-2xl font-bold mt-2">{fiche.titre}</h1>
        <p className="text-text-secondary mt-2 border-l-3 border-swiss-400 pl-3">{fiche.description}</p>

        <div className="mt-6 space-y-3 text-sm leading-relaxed">
          {fiche.contenu.split(/\n\n+/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {fiche.tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
            {fiche.tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}
