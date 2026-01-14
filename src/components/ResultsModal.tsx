import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, Copy, RefreshCw, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';

interface ResultsModalProps {
    isOpen: boolean;
    stats: {
        wpm: number;
        accuracy: number;
        correctChars: number;
        incorrectChars: number;
        totalChars: number;
    };
    onRestart: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({ isOpen, stats, onRestart }) => {
    const resultRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && stats.wpm > 40) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#10b981', '#f59e0b']
            });
        }
    }, [isOpen, stats.wpm]);

    const getShareUrl = () => {
        const data = btoa(JSON.stringify({
            wpm: stats.wpm,
            accuracy: stats.accuracy,
            correct: stats.correctChars,
            mistakes: stats.incorrectChars
        }));
        return `${window.location.origin}${window.location.pathname}?result=${data}`;
    };

    const copyToClipboard = () => {
        const url = getShareUrl();
        const text = `🚀 My Typing Speed: ${stats.wpm} WPM\n🎯 Accuracy: ${stats.accuracy}%\n🔥 RapidKeys - Master Your Typing\nCheck it out: ${url}`;
        navigator.clipboard.writeText(text);
        alert('Stats and shareable link copied!');
    };

    const shareToX = () => {
        const url = getShareUrl();
        const text = `I just hit ${stats.wpm} WPM on RapidKeys! 🚀 Test your speed at ${url}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
    };

    const downloadImage = async () => {
        if (resultRef.current === null) return;
        const dataUrl = await toPng(resultRef.current, { cacheBust: true });
        const link = document.createElement('a');
        link.download = 'rapidkeys-result.png';
        link.href = dataUrl;
        link.click();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="glass max-w-lg w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
                    ref={resultRef}
                >
                    <div className="bg-gradient-to-br from-brand-primary to-blue-600 p-8 text-white text-center">
                        <h2 className="text-3xl font-bold mb-2">Well Done!</h2>
                        <p className="text-blue-100 opacity-90">You've completed the challenge</p>
                    </div>

                    <div className="p-8 bg-[var(--bg-primary)]">
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-4xl font-black text-brand-primary mb-1">{stats.wpm}</div>
                                <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Words Per Minute</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-brand-secondary mb-1">{stats.accuracy}%</div>
                                <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Accuracy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-[var(--text-primary)] mb-1">{stats.correctChars}</div>
                                <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Correct Chars</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-error mb-1">{stats.incorrectChars}</div>
                                <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Mistakes</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <button
                                    onClick={onRestart}
                                    className="flex-1 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-primary/30"
                                >
                                    <RefreshCw size={18} /> Try Again
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="p-4 glass rounded-2xl text-[var(--text-primary)] hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all"
                                    title="Copy results"
                                >
                                    <Copy size={20} />
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={downloadImage}
                                    className="flex-1 py-3 glass rounded-2xl text-[var(--text-primary)] font-semibold flex items-center justify-center gap-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all"
                                >
                                    <Download size={18} /> Save as Image
                                </button>
                                <button
                                    className="flex-1 py-3 glass rounded-2xl text-[var(--text-primary)] font-semibold flex items-center justify-center gap-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all"
                                    onClick={shareToX}
                                >
                                    <Share2 size={18} /> Share to X
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
