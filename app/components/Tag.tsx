export interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function Tag({ label, active = false, onClick }: TagProps) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors duration-150 select-none";
  const inactive = "bg-swiss-50 text-swiss-600";
  const activeStyle = "bg-swiss-400 text-white";
  const interactive =
    "cursor-pointer hover:bg-swiss-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-400 focus-visible:ring-offset-1";

  const classes = [base, active ? activeStyle : inactive, onClick ? interactive : ""].join(" ");

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {label}
      </button>
    );
  }

  return <span className={classes}>{label}</span>;
}

export default Tag;
