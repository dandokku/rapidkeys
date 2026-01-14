import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Keyboard } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-primary rounded-xl text-white shadow-lg shadow-brand-primary/20">
                    <Keyboard size={24} />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                    Rapid<span className="text-brand-primary">Keys</span>
                </h1>
            </div>

            <button
                onClick={toggleTheme}
                className="p-2 rounded-xl glass hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all duration-300 text-[var(--text-primary)]"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </nav>
    );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] transition-colors duration-300">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-5xl mx-auto w-full">
                {children}
            </main>
            <footer className="py-8 text-center text-sm text-[var(--text-secondary)]">
                <p>© 2026 RapidKeys • Master your typing speed</p>
            </footer>
        </div>
    );
};
