import React, { useState, useEffect } from 'react';
import { Moon, Sun, History, LogOut, User } from 'lucide-react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { BarComparison, RadarComparison } from './components/Charts';
import { AuthForm } from './components/AuthForm';
import { calculateLegacy } from './utils/calculations';
import { getCurrentUser, logoutUser } from './utils/auth';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Initialize theme and auth
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Check for existing JWT token
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setAuthChecked(true);

    // Load history
    const savedHistory = localStorage.getItem('legacy_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  const handleCalculate = (dob) => {
    const data = calculateLegacy(dob);
    setResults({ dob, ...data, id: Date.now() });
    setShowHistory(false);
  };

  const handleSaveResult = (data) => {
    const existing = history.find(h => h.id === data.id);
    if (!existing) {
      const newHistory = [data, ...history];
      setHistory(newHistory);
      localStorage.setItem('legacy_history', JSON.stringify(newHistory));
      alert('Result saved to history successfully!');
    } else {
      alert('This result is already saved in history.');
    }
  };

  const loadFromHistory = (item) => {
    setResults(item);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('legacy_history');
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setResults(null);
    setShowHistory(false);
  };

  // Don't render until auth check is complete
  if (!authChecked) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => { setResults(null); setShowHistory(false); }}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">NV</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Neutrino Veda
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            {user && (
              <>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded-full transition-colors relative"
                  title="History"
                >
                  <History size={20} />
                  {history.length > 0 && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                  )}
                </button>

                {/* User info */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <User size={16} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:bg-red-50 hover:text-red-500 dark:text-slate-400 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-full transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded-full transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Auth Gate - Show login if not authenticated */}
        {!user && (
          <AuthForm onAuthSuccess={handleAuthSuccess} />
        )}

        {/* Authenticated Content */}
        {user && (
          <>
            {/* Intro / Form */}
            {!showHistory && !results && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                    Parental Legacy & Life Factors Calculator
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                    Discover the genetic, mental, and spiritual lineage inherited from your parents. Enter your birth date to unlock your personal life factors.
                  </p>
                </div>
                <div className="w-full max-w-md">
                  <CalculatorForm onCalculate={handleCalculate} />
                </div>
              </div>
            )}

            {/* History View */}
            {showHistory && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Saved Results History</h2>
                  {history.length > 0 && (
                    <button onClick={clearHistory} className="text-sm text-red-500 hover:text-red-600">Clear History</button>
                  )}
                </div>
                {history.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center text-slate-500 dark:text-slate-400">
                    No history saved yet.
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {history.map((item) => (
                      <div key={item.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => loadFromHistory(item)}>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">DOB: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.dob}</span></div>
                        <div className="font-medium text-slate-800 dark:text-white mb-3">Higher Legacy: {item.higherParent}</div>
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-pink-600 dark:text-pink-400">Mother: {item.motherTotal.toFixed(2)}</span>
                          <span className="text-blue-600 dark:text-blue-400">Father: {item.fatherTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Results View */}
            {results && !showHistory && (
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <button onClick={() => setResults(null)} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                    &larr; Calculate New Date
                  </button>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Showing results for DOB: <span className="font-semibold text-slate-800 dark:text-slate-200">{results.dob}</span>
                  </div>
                </div>

                <ResultsDisplay data={results} onSave={handleSaveResult} />
                
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <RadarComparison data={results.factors} />
                  <BarComparison data={results.factors} />
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-sm text-slate-500 dark:text-slate-500 mt-auto">
        <p>Awaken Your Potential. Align with Purpose. Achieve Quantum Vedic Success.</p>
        <p className="mt-1">© {new Date().getFullYear()} Neutrino Veda. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
