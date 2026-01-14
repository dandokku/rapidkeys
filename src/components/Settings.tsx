import React from 'react';
import type { Difficulty } from '../utils/wordGenerator';

interface SettingsProps {
    duration: number;
    difficulty: Difficulty;
    onDurationChange: (duration: number) => void;
    onDifficultyChange: (difficulty: Difficulty) => void;
    isActive: boolean;
}

export const Settings: React.FC<SettingsProps> = ({
    duration,
    difficulty,
    onDurationChange,
    onDifficultyChange,
    isActive,
}) => {
    const durations = [15, 30, 60];
    const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

    return (
        <div className={`flex flex-wrap gap-8 justify-center items-center transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest text-center">Duration</span>
                <div className="glass p-1 rounded-xl flex gap-1">
                    {durations.map((d) => (
                        <button
                            key={d}
                            onClick={() => onDurationChange(d)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${duration === d
                                ? 'bg-brand-primary text-white shadow-md'
                                : 'text-[var(--text-secondary)] hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                                }`}
                        >
                            {d}s
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest text-center">Difficulty</span>
                <div className="glass p-1 rounded-xl flex gap-1">
                    {difficulties.map((diff) => (
                        <button
                            key={diff}
                            onClick={() => onDifficultyChange(diff)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${difficulty === diff
                                ? 'bg-brand-primary text-white shadow-md'
                                : 'text-[var(--text-secondary)] hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                                }`}
                        >
                            {diff}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
