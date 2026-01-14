import React from 'react';
import { Timer, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsPanelProps {
    wpm: number;
    accuracy: number;
    timeLeft: number;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ wpm, accuracy, timeLeft }) => {
    return (
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl mx-auto mb-8">
            <StatCard
                label="Time Left"
                value={`${timeLeft}s`}
                icon={<Timer className="text-blue-500" />}
                color="blue"
            />
            <StatCard
                label="WPM"
                value={wpm}
                icon={<Zap className="text-amber-500" />}
                color="amber"
            />
            <StatCard
                label="Accuracy"
                value={`${accuracy}%`}
                icon={<Target className="text-emerald-500" />}
                color="emerald"
            />
        </div>
    );
};

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'blue' | 'amber' | 'emerald';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
    const bgStyles = {
        blue: "bg-blue-500/10 text-blue-500",
        amber: "bg-amber-500/10 text-amber-500",
        emerald: "bg-emerald-500/10 text-emerald-500",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center"
        >
            <div className={`p-2 rounded-xl mb-2 ${bgStyles[color]}`}>
                {icon}
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{value}</div>
            <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">{label}</div>
        </motion.div>
    );
};
