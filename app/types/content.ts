export interface Fiche {
  id: string;
  titre: string;
  description: string;
  contenu: string;
  categorie: string;
  tags: string[];
}

export interface Exercice {
  id: string;
  titre: string;
  objectif: string;
  description: string;
  nombreJoueurs: {
    min: number;
    max: number | null;
  };
  duree: number;
  niveau: string;
  categorie: string;
  tags: string[];
  variantes?: string[];
  conseils?: string[];
}

export interface Theme {
  id: string;
  texte: string;
  categorie: string;
}
