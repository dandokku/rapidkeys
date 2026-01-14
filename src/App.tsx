import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { TypingArea } from './components/TypingArea';
import { StatsPanel } from './components/StatsPanel';
import { Settings } from './components/Settings';
import { ResultsModal } from './components/ResultsModal';
import { useTypingTest } from './hooks/useTypingTest';
import type { Difficulty } from './utils/wordGenerator';
import { soundEngine } from './utils/soundEngine';
import { Volume2, VolumeX } from 'lucide-react';

function App() {
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [soundEnabled, setSoundEnabled] = useState(soundEngine.isEnabled());

  const {
    wordsString,
    userInput,
    timeLeft,
    isActive,
    isFinished,
    stats,
    handleInput,
    restart,
  } = useTypingTest(duration, difficulty);

  // Handle shareable URL on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get('result');
    if (result) {
      try {
        const decoded = JSON.parse(atob(result));
        // We could show a readonly preview modal here if needed
        console.log('Shared Result:', decoded);
      } catch (e) {
        console.error('Invalid shareable URL');
      }
    }
  }, []);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const lastChar = e.target.value[e.target.value.length - 1];
    const targetChar = wordsString[userInput.length];

    if (e.target.value.length >= userInput.length) {
      if (lastChar === targetChar) {
        soundEngine.playKeySound();
      } else {
        soundEngine.playErrorSound();
      }
    }

    handleInput(e);
  }, [handleInput, userInput.length, wordsString]);

  const toggleSound = () => {
    const newState = !soundEnabled;
    soundEngine.setEnabled(newState);
    setSoundEnabled(newState);
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl flex flex-col items-center">
        {!isFinished && (
          <Settings
            duration={duration}
            difficulty={difficulty}
            onDurationChange={setDuration}
            onDifficultyChange={setDifficulty}
            isActive={isActive}
          />
        )}

        <StatsPanel
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          timeLeft={timeLeft}
        />

        <TypingArea
          wordsString={wordsString}
          userInput={userInput}
          isActive={isActive}
          isFinished={isFinished}
          handleInput={onInputChange}
        />

        <div className="mt-8 flex gap-4">
          <button
            onClick={toggleSound}
            className="p-3 glass rounded-xl text-[var(--text-secondary)] hover:text-brand-primary transition-colors duration-300"
            title={soundEnabled ? "Disable sound" : "Enable sound"}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {!isActive && !isFinished && (
            <div className="text-sm font-medium text-[var(--text-secondary)] flex items-center glass px-4 rounded-xl">
              Tip: Press any key to start typing!
            </div>
          )}
        </div>
      </div>

      <ResultsModal
        isOpen={isFinished}
        stats={stats}
        onRestart={restart}
      />
    </Layout>
  );
}

export default App;
