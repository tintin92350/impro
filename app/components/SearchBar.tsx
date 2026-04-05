export default function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-white border border-gray-200 pl-12 pr-10 py-3.5 text-base font-medium placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-swiss-400/30 focus:border-swiss-400 shadow-sm"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary text-sm font-bold"
        >
          ✕
        </button>
      )}
    </div>
  );
}
