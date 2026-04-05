import { motion } from "motion/react";

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
    ? "bg-swiss-400 text-white shadow-md"
    : "bg-white text-swiss-600 border border-gray-200";

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.92 }}
        className={`rounded-full px-4 py-2 text-sm font-bold ${style}`}
      >
        {label}
      </motion.button>
    );
  }
  return <span className={`rounded-full px-4 py-2 text-sm font-bold ${style}`}>{label}</span>;
}
