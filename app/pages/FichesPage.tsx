import { useSearchParams } from "react-router";
import { useContent } from "~/hooks/useContent";
import { filterFiches } from "~/utils/search";
import SearchBar from "~/components/SearchBar";
import Tag from "~/components/Tag";
import FicheCard from "~/components/FicheCard";

const CATEGORIES = ["technique", "concept", "format", "regle"] as const;

export default function FichesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fiches, loading, error } = useContent();

  const query = searchParams.get("q") ?? "";
  const categorie = searchParams.get("categorie") ?? "";

  const filtered = filterFiches(fiches, query, categorie || undefined);

  function setQuery(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set("q", value);
      } else {
        next.delete("q");
      }
      return next;
    });
  }

  function setCategorie(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value && value !== categorie) {
        next.set("categorie", value);
      } else {
        next.delete("categorie");
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-swiss-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Fiches de définition
          </h1>
          <p className="font-body text-gray-500 text-lg">
            Concepts, techniques et règles de l'improvisation théâtrale.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8 animate-fade-in stagger-1">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Rechercher une fiche..."
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Tag
                key={cat}
                label={cat}
                active={categorie === cat}
                onClick={() => setCategorie(cat)}
              />
            ))}
          </div>
        </div>

        {/* Count */}
        {!loading && (
          <p className="font-body text-sm text-gray-400 mb-6 animate-fade-in stagger-2">
            {filtered.length} fiche{filtered.length !== 1 ? "s" : ""}
            {query || categorie ? " trouvée" + (filtered.length !== 1 ? "s" : "") : ""}
          </p>
        )}

        {/* States */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 rounded-full border-4 border-swiss-400/20 border-t-swiss-400 animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl bg-red-50 border border-red-100 p-6 text-red-700 font-body text-sm">
            Une erreur est survenue : {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 font-body text-gray-400">
            <p className="text-5xl mb-4">🎭</p>
            <p className="text-lg">Aucune fiche ne correspond à votre recherche.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in-up stagger-2">
            {filtered.map((fiche) => (
              <FicheCard key={fiche.id} fiche={fiche} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
