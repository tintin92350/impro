import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-black mb-3">La scène est vide…</h1>
      <p className="text-lg text-text-secondary mb-8">Cette page n'existe pas.</p>
      <Link to="/" className="text-swiss-400 font-bold text-lg">← Retour à l'accueil</Link>
    </div>
  );
}
