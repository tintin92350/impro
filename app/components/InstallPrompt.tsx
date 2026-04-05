import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
    setDismissed(true);
  }

  if (!deferredPrompt || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-20 lg:bottom-6 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-200/60 flex items-center gap-4">
          <span className="text-3xl">🎪</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base">Installer Impro Suisse</p>
            <p className="text-sm text-text-secondary">Accès rapide depuis ton écran d'accueil</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setDismissed(true)}
              className="text-sm text-text-secondary font-medium px-3 py-2"
            >
              Plus tard
            </button>
            <motion.button
              onClick={handleInstall}
              whileTap={{ scale: 0.93 }}
              className="bg-swiss-400 text-white font-bold text-sm rounded-xl px-4 py-2"
            >
              Installer
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
