import { Link } from "react-router";
import type { Fiche } from "~/types/content";
import Tag from "~/components/Tag";

export default function FicheCard({ fiche }: { fiche: Fiche }) {
  return (
    <Link
      to={`/fiches/${fiche.id}`}
      className="block bg-white rounded-2xl p-5 border border-gray-200 shadow-sm active:bg-gray-50"
    >
      <Tag label={fiche.categorie} />
      <h3 className="text-lg font-bold mt-3">{fiche.titre}</h3>
      <p className="text-base text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">{fiche.description}</p>
    </Link>
  );
}
