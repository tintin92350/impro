interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Rechercher…" }: SearchBarProps) {
  return (
    <div className="relative flex items-center w-full">
      {/* Search icon */}
      <span className="absolute left-4 text-text-secondary pointer-events-none" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full rounded-xl border border-gray-200 bg-white
          pl-11 pr-10 py-3
          text-sm font-body text-text-primary placeholder:text-text-secondary
          shadow-sm
          transition-all duration-150
          focus:outline-none focus:border-swiss-400 focus:ring-2 focus:ring-swiss-400/20
        "
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
          className="
            absolute right-3 flex items-center justify-center
            w-6 h-6 rounded-full
            text-text-secondary hover:text-text-primary hover:bg-gray-100
            transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-400
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
