import { useSearchParams } from "react-router";
import { useContent } from "~/hooks/useContent";
import { filterFiches } from "~/utils/search";
import SearchBar from "~/components/SearchBar";
import Tag from "~/components/Tag";
import FicheCard from "~/components/FicheCard";

const CATEGORIES = ["technique", "concept", "format", "regle"] as const;

export default function FichesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fiches, loading } = useContent();

  const query = searchParams.get("q") ?? "";
  const categorie = searchParams.get("categorie") ?? "";
  const filtered = filterFiches(fiches, query, categorie || undefined);

  function setQuery(v: string) {
    setSearchParams((p) => {
      const n = new URLSearchParams(p);
      v ? n.set("q", v) : n.delete("q");
      return n;
    });
  }

  function toggleCat(c: string) {
    setSearchParams((p) => {
      const n = new URLSearchParams(p);
      c === categorie ? n.delete("categorie") : n.set("categorie", c);
      return n;
    });
  }

  if (loading) return <p className="text-center py-16 text-xl text-text-secondary">Chargement… ⏳</p>;

  return (
    <div>
      <h1 className="text-3xl font-black mb-5">📖 Fiches</h1>

      <div className="flex flex-col gap-3 mb-5">
        <SearchBar value={query} onChange={setQuery} placeholder="Rechercher une fiche…" />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Tag key={c} label={c} active={categorie === c} onClick={() => toggleCat(c)} />
          ))}
        </div>
      </div>

      <p className="text-sm text-text-secondary font-medium mb-4">
        {filtered.length} fiche{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="text-center py-12 text-lg text-text-secondary">Rien trouvé 🤷</p>
      ) : (
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
          {filtered.map((f, i) => <FicheCard key={f.id} fiche={f} index={i} />)}
        </div>
      )}
    </div>
  );
}
