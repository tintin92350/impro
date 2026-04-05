import { Link } from "react-router";
import { motion } from "motion/react";

const sections = [
  { to: "/fiches", emoji: "📖", title: "Fiches", desc: "Concepts et techniques d'impro", color: "bg-amber-50 border-amber-200/60" },
  { to: "/exercices", emoji: "🎭", title: "Exercices", desc: "Échauffements et jeux pour tous", color: "bg-blue-50 border-blue-200/60" },
  { to: "/generateur", emoji: "🎲", title: "Générateur", desc: "Un thème au hasard, c'est parti !", color: "bg-swiss-50 border-swiss-200/60" },
];

export default function HomePage() {
  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-5xl">🎪</span>
        <h1 className="text-4xl font-black mt-3 tracking-tight">Impro Suisse</h1>
        <p className="text-lg text-text-secondary mt-2">
          Ton compagnon d'improvisation 🇨🇭
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {sections.map(({ to, emoji, title, desc, color }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
          >
            <Link
              to={to}
              className={`flex items-center gap-5 rounded-3xl p-5 border shadow-sm active:scale-[0.97] transition-transform ${color}`}
            >
              <span className="text-4xl">{emoji}</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black">{title}</h2>
                <p className="text-base text-text-secondary mt-0.5">{desc}</p>
              </div>
              <span className="text-2xl text-text-secondary/40">›</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
