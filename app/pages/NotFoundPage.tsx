import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="text-center py-16">
      <h1 className="font-display text-3xl font-bold mb-2">La scène est vide…</h1>
      <p className="text-text-secondary mb-6">Cette page n'existe pas.</p>
      <Link to="/" className="text-swiss-400 font-medium text-sm">← Retour à l'accueil</Link>
    </div>
  );
}
