import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Fiche, Exercice, Theme } from "~/types/content";

interface ContentState {
  fiches: Fiche[];
  exercices: Exercice[];
  themes: Theme[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  fiches: [],
  exercices: [],
  themes: [],
  loading: true,
  error: null,
};

export const ContentContext = createContext<ContentState>(initialState);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>(initialState);

  useEffect(() => {
    Promise.all([
      fetch("/content/fiches.json").then<Fiche[]>((r) => r.json()),
      fetch("/content/exercices.json").then<Exercice[]>((r) => r.json()),
      fetch("/content/themes.json").then<Theme[]>((r) => r.json()),
    ])
      .then(([fiches, exercices, themes]) => {
        setState({ fiches, exercices, themes, loading: false, error: null });
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Erreur de chargement";
        setState((prev) => ({ ...prev, loading: false, error: message }));
      });
  }, []);

  return (
    <ContentContext value={state}>
      {children}
    </ContentContext>
  );
}
