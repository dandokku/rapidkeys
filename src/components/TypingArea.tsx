import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn'; // I'll create this utility

interface TypingAreaProps {
    wordsString: string;
    userInput: string;
    isActive: boolean;
    isFinished: boolean;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
    wordsString,
    userInput,
    isActive,
    isFinished,
    handleInput,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isFinished) {
            inputRef.current?.focus();
        }
    }, [isFinished]);

    const characters = wordsString.split('');

    return (
        <div className="relative w-full max-w-4xl mx-auto mt-8">
            <input
                ref={inputRef}
                type="text"
                className="absolute inset-0 opacity-0 cursor-default"
                value={userInput}
                onChange={handleInput}
                autoFocus
                disabled={isFinished}
            />

            <div
                className="glass p-8 rounded-3xl min-h-[200px] text-2xl md:text-3xl font-mono leading-relaxed select-none cursor-text mb-8"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="typing-container relative">
                    {characters.map((char, index) => {
                        let status = 'neutral';
                        if (index < userInput.length) {
                            status = char === userInput[index] ? 'correct' : 'incorrect';
                        }

                        const isCurrent = index === userInput.length;

                        return (
                            <span
                                key={index}
                                className={cn(
                                    "character relative inline-block whitespace-pre",
                                    status === 'correct' && "text-brand-secondary",
                                    status === 'incorrect' && "text-error underline decoration-error/50",
                                    isCurrent && "text-[var(--accent-color)]",
                                    status === 'neutral' && index >= userInput.length && "text-[var(--text-secondary)]/40"
                                )}
                            >
                                {isCurrent && !isFinished && (
                                    <motion.span
                                        layoutId="caret"
                                        className="absolute -left-[1px] top-1/10 h-[80%] w-[3px] bg-brand-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                        animate={{ opacity: [1, 1, 0, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1,
                                            times: [0, 0.5, 0.5, 1],
                                            ease: "linear"
                                        }}
                                    />
                                )}
                                {char}
                            </span>
                        );
                    })}
                </div>
            </div>

            {!isActive && !isFinished && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)]/50 backdrop-blur-[2px] rounded-3xl pointer-events-none">
                    <p className="text-[var(--text-secondary)] animate-pulse font-medium">Click or press any key to start typing...</p>
                </div>
            )}
        </div>
    );
};
