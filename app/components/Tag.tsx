export default function Tag({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const style = active
    ? "bg-swiss-400 text-white"
    : "bg-swiss-50 text-swiss-600";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`rounded-full px-3 py-1 text-xs font-medium ${style}`}
      >
        {label}
      </button>
    );
  }
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${style}`}>{label}</span>;
}
