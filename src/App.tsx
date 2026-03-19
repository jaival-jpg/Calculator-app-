/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { BasicCalculator } from './components/BasicCalculator';
import { ScientificCalculator } from './components/ScientificCalculator';
import { History } from './components/History';
import { AgeCalculator } from './components/AgeCalculator';
import { CurrencyConverter } from './components/CurrencyConverter';
import { About } from './components/About';
import { HiddenGalleryAuth } from './components/HiddenGalleryAuth';
import { useHistory } from './hooks/useHistory';
import { useTheme } from './hooks/useTheme';
import { Page } from './types';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('basic');
  const { history, addHistory, clearHistory } = useHistory();
  const { theme, toggleTheme } = useTheme();

  const renderPage = () => {
    switch (currentPage) {
      case 'basic':
        return <BasicCalculator onSaveHistory={addHistory} />;
      case 'scientific':
        return <ScientificCalculator onSaveHistory={addHistory} />;
      case 'history':
        return <History history={history} onClear={clearHistory} />;
      case 'age':
        return <AgeCalculator />;
      case 'currency':
        return <CurrencyConverter />;
      case 'hidden-gallery':
        return <HiddenGalleryAuth />;
      case 'about':
        return <About />;
      default:
        return <BasicCalculator onSaveHistory={addHistory} />;
    }
  };

  return (
    <div className="h-screen w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col overflow-hidden font-sans selection:bg-orange-500/30">
      {/* Header */}
      <header className="h-16 flex items-center px-4 shrink-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-10 border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent capitalize">
          {currentPage.replace('-', ' ')}
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {renderPage()}
      </main>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}

