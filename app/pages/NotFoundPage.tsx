import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-swiss-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="animate-fade-in">
        {/* Theatrical curtain icon */}
        <div className="mb-8 relative inline-block">
          <span
            className="block text-8xl select-none leading-none"
            role="img"
            aria-label="rideau de théâtre"
          >
            🎭
          </span>
          <span className="absolute -top-2 -right-4 font-display text-5xl font-black text-swiss-400 select-none">
            404
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight animate-fade-in-up stagger-1">
          La scène est vide…
        </h1>

        <p className="font-body text-gray-500 text-lg max-w-md mx-auto mb-3 animate-fade-in-up stagger-2">
          Cette page n'existe pas. Peut-être s'est-elle improvisée ailleurs ?
        </p>
        <p className="font-body text-gray-400 text-sm italic mb-10 animate-fade-in-up stagger-3">
          « Dans l'impro, il n'y a pas d'erreur — seulement des choix inattendus. »
        </p>

        <div className="animate-fade-in-up stagger-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-swiss-400 hover:bg-swiss-500 text-white font-body font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
