import type { Fiche, Exercice } from "~/types/content";

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matchesQuery(query: string, ...fields: string[]): boolean {
  const q = normalize(query);
  return fields.some((f) => normalize(f).includes(q));
}

export function filterFiches(
  fiches: Fiche[],
  query: string,
  categorie?: string
): Fiche[] {
  return fiches.filter((f) => {
    if (categorie && f.categorie !== categorie) return false;
    if (query && !matchesQuery(query, f.titre, f.description, ...f.tags))
      return false;
    return true;
  });
}

export function filterExercices(
  exercices: Exercice[],
  query: string,
  filters: {
    niveau?: string;
    categorie?: string;
    joueurs?: number;
    dureeMax?: number;
  }
): Exercice[] {
  return exercices.filter((e) => {
    if (filters.niveau && e.niveau !== filters.niveau) return false;
    if (filters.categorie && e.categorie !== filters.categorie) return false;
    if (filters.joueurs) {
      if (e.nombreJoueurs.min > filters.joueurs) return false;
      if (e.nombreJoueurs.max && e.nombreJoueurs.max < filters.joueurs)
        return false;
    }
    if (filters.dureeMax && e.duree > filters.dureeMax) return false;
    if (query && !matchesQuery(query, e.titre, e.objectif, e.description, ...e.tags))
      return false;
    return true;
  });
}
