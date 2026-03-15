import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';
import { 
  Calculator, 
  FunctionSquare, 
  History, 
  CalendarDays, 
  Coins, 
  Share2, 
  Moon, 
  Sun, 
  Info,
  X
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
};

export function Sidebar({ isOpen, onClose, currentPage, onNavigate, theme, onToggleTheme }: SidebarProps) {
  const navItems = [
    { id: 'basic', label: 'Basic Calculator', icon: Calculator },
    { id: 'scientific', label: 'Scientific Calculator', icon: FunctionSquare },
    { id: 'history', label: 'History', icon: History },
    { id: 'age', label: 'Age Calculator', icon: CalendarDays },
    { id: 'currency', label: 'Currency Converter', icon: Coins },
    { id: 'about', label: 'About', icon: Info },
  ] as const;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Calculator Pro',
          text: 'Check out this amazing Calculator App!\nFast, Modern and Free.\n\nDownload now!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      alert('Sharing is not supported on this device.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-zinc-900 shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Calculator Pro
              </h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-1 px-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 font-medium' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </button>
                  );
                })}

                <div className="my-4 border-t border-zinc-200 dark:border-zinc-800" />

                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <Share2 size={20} />
                  Share App
                </button>

                <button
                  onClick={onToggleTheme}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </div>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-orange-500' : 'bg-zinc-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
