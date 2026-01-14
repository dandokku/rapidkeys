import { Keyboard } from 'lucide-react';

export const Navbar: React.FC = () => {

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

            <div className="flex items-center gap-4">
                <div className="text-xs font-medium text-[var(--text-secondary)] glass px-3 py-1 rounded-full border-brand-primary/20">
                    BETA v1.0
                </div>
            </div>
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
