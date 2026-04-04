import { useState, useCallback } from "react";
import type { Theme } from "~/types/content";
import { useContent } from "~/hooks/useContent";

export function useRandomTheme(categorie?: string) {
  const { themes } = useContent();
  const [theme, setTheme] = useState<Theme | null>(null);

  const generate = useCallback(() => {
    const pool = categorie
      ? themes.filter((t) => t.categorie === categorie)
      : themes;

    if (pool.length === 0) return;

    const candidates = pool.length > 1 ? pool.filter((t) => t.id !== theme?.id) : pool;
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    setTheme(picked);
  }, [themes, categorie, theme]);

  return { theme, generate };
}
