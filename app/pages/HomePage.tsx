import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-swiss-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-swiss-400/5" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-swiss-400/8" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-36 text-center animate-fade-in">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-swiss-400/10 text-swiss-500 text-sm font-body font-medium tracking-wide uppercase">
            Improvisation théâtrale
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Impro{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-swiss-400">Suisse</span>
              <span
                className="absolute bottom-1 left-0 w-full h-3 bg-swiss-400/15 -rotate-1"
                aria-hidden="true"
              />
            </span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Votre ressource pour l'improvisation théâtrale en Suisse
          </p>
        </div>
      </section>

      {/* Nav cards */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NavCard
            href="/fiches"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            }
            title="Fiches de définition"
            description="Concepts, techniques et règles du jeu d'improvisation expliqués clairement."
            stagger="stagger-1"
          />
          <NavCard
            href="/exercices"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
            }
            title="Exercices"
            description="Des échauffements aux scènes complètes, des exercices pour tous les niveaux."
            stagger="stagger-2"
          />
          <NavCard
            href="/generateur"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                />
              </svg>
            }
            title="Générateur de thèmes"
            description="Lancez le dé et obtenez un thème surprise pour votre prochaine scène d'impro."
            stagger="stagger-3"
          />
        </div>
      </section>
    </div>
  );
}

interface NavCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  stagger: string;
}

function NavCard({ href, icon, title, description, stagger }: NavCardProps) {
  return (
    <Link
      to={href}
      className={`group relative flex flex-col gap-4 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up ${stagger}`}
    >
      <div className="w-14 h-14 rounded-xl bg-swiss-400/10 text-swiss-400 flex items-center justify-center group-hover:bg-swiss-400 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h2 className="font-display text-xl font-semibold text-gray-900 mb-2 group-hover:text-swiss-400 transition-colors duration-200">
          {title}
        </h2>
        <p className="font-body text-gray-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 text-swiss-400 text-sm font-medium font-body opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Explorer
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
