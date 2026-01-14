import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { generateWords, type Difficulty } from '../utils/wordGenerator';

export const useTypingTest = (duration: number = 30, difficulty: Difficulty = 'easy') => {
    const [words, setWords] = useState<string[]>([]);
    const [userInput, setUserInput] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [stats, setStats] = useState({
        wpm: 0,
        cpm: 0,
        accuracy: 0,
        correctChars: 0,
        incorrectChars: 0,
        totalChars: 0,
    });

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const wordsString = useMemo(() => words.join(' '), [words]);

    const restart = useCallback(() => {
        const newWords = generateWords(100, difficulty);
        setWords(newWords);
        setUserInput('');
        setCurrentIndex(0);
        setTimeLeft(duration);
        setIsActive(false);
        setIsFinished(false);
        setStats({
            wpm: 0,
            cpm: 0,
            accuracy: 100,
            correctChars: 0,
            incorrectChars: 0,
            totalChars: 0,
        });
        if (timerRef.current) clearInterval(timerRef.current);
    }, [duration, difficulty]);

    useEffect(() => {
        restart();
    }, [restart]);

    const startTimer = useCallback(() => {
        if (isActive || isFinished) return;
        setIsActive(true);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setIsActive(false);
                    setIsFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [isActive, isFinished]);

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFinished) return;
        if (!isActive) startTimer();

        const inputValue = e.target.value;
        const targetChar = wordsString[userInput.length];
        const lastChar = inputValue[inputValue.length - 1];

        if (inputValue.length < userInput.length) {
            // Backspace handled implicitly by state update
            setUserInput(inputValue);
            return;
        }

        // Update stats on each character
        setStats((prev) => {
            const isCorrect = lastChar === targetChar;
            const newCorrectChars = isCorrect ? prev.correctChars + 1 : prev.correctChars;
            const newIncorrectChars = !isCorrect ? prev.incorrectChars + 1 : prev.incorrectChars;
            const newTotalChars = prev.totalChars + 1;
            const timeElapsed = (duration - timeLeft) / 60;

            // WPM = (total correct chars / 5) / time elapsed in minutes
            const wpm = timeElapsed > 0 ? Math.round((newCorrectChars / 5) / timeElapsed) : 0;
            const cpm = timeElapsed > 0 ? Math.round(newCorrectChars / timeElapsed) : 0;
            const accuracy = newTotalChars > 0 ? Math.round((newCorrectChars / newTotalChars) * 100) : 100;

            return {
                ...prev,
                wpm,
                cpm,
                accuracy,
                correctChars: newCorrectChars,
                incorrectChars: newIncorrectChars,
                totalChars: newTotalChars,
            };
        });

        setUserInput(inputValue);
    }, [isActive, isFinished, startTimer, wordsString, userInput.length, duration, timeLeft]);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return {
        words,
        wordsString,
        userInput,
        timeLeft,
        isActive,
        isFinished,
        stats,
        handleInput,
        restart,
    };
};
