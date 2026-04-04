import { Link } from "react-router";
import type { Fiche } from "~/types/content";
import { Tag } from "~/components/Tag";

interface FicheCardProps {
  fiche: Fiche;
}

export function FicheCard({ fiche }: FicheCardProps) {
  return (
    <Link
      to={`/fiches/${fiche.id}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-400 focus-visible:ring-offset-2"
    >
      <article className="p-5 flex flex-col gap-3 h-full">
        {/* Category badge */}
        <div>
          <Tag label={fiche.categorie} />
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-text-primary leading-snug group-hover:text-swiss-500 transition-colors duration-150">
          {fiche.titre}
        </h3>

        {/* Description — truncated to 2 lines */}
        <p className="text-sm font-body text-text-secondary leading-relaxed line-clamp-2 flex-1">
          {fiche.description}
        </p>

        {/* Read more hint */}
        <span className="inline-flex items-center gap-1 text-xs font-medium text-swiss-400 group-hover:gap-2 transition-all duration-150 mt-auto">
          Lire la fiche
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </article>
    </Link>
  );
}

export default FicheCard;
