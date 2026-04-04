import { Link } from "react-router";
import type { Fiche } from "~/types/content";
import Tag from "~/components/Tag";

export default function FicheCard({ fiche }: { fiche: Fiche }) {
  return (
    <Link
      to={`/fiches/${fiche.id}`}
      className="block bg-white rounded-xl p-4 border border-gray-200 active:bg-gray-50"
    >
      <Tag label={fiche.categorie} />
      <h3 className="font-display text-base font-semibold mt-2">{fiche.titre}</h3>
      <p className="text-sm text-text-secondary mt-1 line-clamp-2">{fiche.description}</p>
    </Link>
  );
}
