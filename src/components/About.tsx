import { NativeAdBanner } from './NativeAdBanner';

export function About() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white dark:bg-black p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">About</h2>

      <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center shadow-lg shadow-orange-500/20 mb-6">
          <span className="text-4xl text-white font-bold">=</span>
        </div>
        
        <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Calculator Pro</h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">Version 1.0.0</p>

        <div className="w-full text-left space-y-6">
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">This app includes:</h4>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Basic Calculator
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Scientific Calculator
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Age Calculator
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Currency Converter
              </li>
            </ul>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 italic">
            Designed for fast and accurate calculations.
          </p>

          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Developer</h4>
            <p className="text-lg font-semibold text-zinc-900 dark:text-white">Jaival Pandya</p>
          </div>

          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <NativeAdBanner />
          </div>
        </div>
      </div>
    </div>
  );
}
