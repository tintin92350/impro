import { useSearchParams } from "react-router";
import { useContent } from "~/hooks/useContent";
import { filterExercices } from "~/utils/search";
import SearchBar from "~/components/SearchBar";
import Tag from "~/components/Tag";
import ExerciceCard from "~/components/ExerciceCard";

const NIVEAUX = ["débutant", "intermédiaire", "avancé"] as const;
const CATEGORIES = ["échauffement", "écoute", "narration", "personnage", "espace"] as const;

export default function ExercicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { exercices, loading } = useContent();

  const query = searchParams.get("q") ?? "";
  const niveau = searchParams.get("niveau") ?? "";
  const categorie = searchParams.get("categorie") ?? "";

  const filtered = filterExercices(exercices, query, {
    niveau: niveau || undefined,
    categorie: categorie || undefined,
  });

  function setQuery(v: string) {
    setSearchParams((p) => {
      const n = new URLSearchParams(p);
      v ? n.set("q", v) : n.delete("q");
      return n;
    });
  }

  function toggle(key: string, value: string, current: string) {
    setSearchParams((p) => {
      const n = new URLSearchParams(p);
      value === current ? n.delete(key) : n.set(key, value);
      return n;
    });
  }

  if (loading) return <p className="text-center py-12 text-text-secondary">Chargement…</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-4">Exercices</h1>

      <div className="flex flex-col gap-3 mb-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Rechercher un exercice…" />
        <div className="flex flex-wrap gap-2">
          {NIVEAUX.map((n) => (
            <Tag key={n} label={n} active={niveau === n} onClick={() => toggle("niveau", n, niveau)} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Tag key={c} label={c} active={categorie === c} onClick={() => toggle("categorie", c, categorie)} />
          ))}
        </div>
      </div>

      <p className="text-xs text-text-secondary mb-3">{filtered.length} résultat{filtered.length !== 1 ? "s" : ""}</p>

      {filtered.length === 0 ? (
        <p className="text-center py-8 text-text-secondary">Aucun exercice trouvé.</p>
      ) : (
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => <ExerciceCard key={e.id} exercice={e} />)}
        </div>
      )}
    </div>
  );
}
