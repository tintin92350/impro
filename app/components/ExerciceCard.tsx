import { Link } from "react-router";
import type { Exercice } from "~/types/content";

interface ExerciceCardProps {
  exercice: Exercice;
}

const niveauStyles: Record<string, string> = {
  débutant: "bg-green-100 text-green-700",
  intermédiaire: "bg-amber-100 text-amber-700",
  avancé: "bg-swiss-50 text-swiss-600",
};

function NiveauBadge({ niveau }: { niveau: string }) {
  const key = niveau.toLowerCase();
  const style = niveauStyles[key] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
      {niveau}
    </span>
  );
}

function formatDuree(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h${m}` : `${h}h`;
}

function formatJoueurs(nombreJoueurs: Exercice["nombreJoueurs"]): string {
  const { min, max } = nombreJoueurs;
  if (max === null) return `${min}+`;
  if (min === max) return `${min}`;
  return `${min}–${max}`;
}

export function ExerciceCard({ exercice }: ExerciceCardProps) {
  return (
    <Link
      to={`/exercices/${exercice.id}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-400 focus-visible:ring-offset-2"
    >
      <article className="p-5 flex flex-col gap-3 h-full">
        {/* Header row: niveau badge */}
        <div className="flex items-center justify-between gap-2">
          <NiveauBadge niveau={exercice.niveau} />
          {/* Meta: duration + players */}
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            {/* Clock icon + duration */}
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {formatDuree(exercice.duree)}
            </span>
            {/* People icon + players */}
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {formatJoueurs(exercice.nombreJoueurs)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-text-primary leading-snug group-hover:text-swiss-500 transition-colors duration-150">
          {exercice.titre}
        </h3>

        {/* Objectif — 1 line */}
        <p className="text-sm font-body text-text-secondary leading-relaxed line-clamp-1 flex-1">
          {exercice.objectif}
        </p>

        {/* CTA hint */}
        <span className="inline-flex items-center gap-1 text-xs font-medium text-swiss-400 group-hover:gap-2 transition-all duration-150 mt-auto">
          Voir l'exercice
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

export default ExerciceCard;
