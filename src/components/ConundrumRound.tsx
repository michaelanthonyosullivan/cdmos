import { useState, useCallback, useEffect } from 'react';
import { LetterTile } from './LetterTile';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { getRandomConundrumWord, scrambleWord } from '@/lib/conundrumWords';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { soundEffects } from '@/hooks/useSoundEffects';
import { useSettings } from '@/hooks/useSettings';
import { CountdownTimer } from './CountdownTimer';

interface ConundrumRoundProps {
  onRoundComplete: (score: number) => void;
}

export const ConundrumRound = ({ onRoundComplete }: ConundrumRoundProps) => {
  const { t, language } = useLanguage();
  const { settings } = useSettings();
  const [answer, setAnswer] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [phase, setPhase] = useState<'ready' | 'playing' | 'result'>('ready');
  const [timerRunning, setTimerRunning] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [roundScore, setRoundScore] = useState(0);
  const [solved, setSolved] = useState(false);

  // Global Enter key listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (phase === 'playing') {
          // Input usually handles this via onKeyDown, but global backup is good
          // However, ConundrumRound submitGuess relies on state 'userGuess'
          // We can just rely on the existing onKeyDown for input, 
          // but for checking 'result' phase we need this.
          // Since the input is autoFocused and captures Enter, we might only need this for 'result'.
          // But let's be safe. Interaction might be tricky if input isn't focused.
        }
        if (phase === 'result') {
          e.preventDefault();
          onRoundComplete(roundScore);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [phase, roundScore, onRoundComplete]);

  useEffect(() => {
    const word = getRandomConundrumWord(language);
    setAnswer(word);
    setScrambled(scrambleWord(word));
  }, [language]);

  const startRound = () => {
    setPhase('playing');
    setTimerRunning(true);
    soundEffects.playClick();
  };

  const handleTimerComplete = useCallback(() => {
    setTimerRunning(false);
    soundEffects.playTimeUp();
    if (!solved) {
      setRoundScore(0);
      setPhase('result');
    }
  }, [solved]);

  const submitGuess = () => {
    const guess = userGuess.trim().toUpperCase();

    if (!guess) {
      return;
    }

    if (guess === answer) {
      setSolved(true);
      setTimerRunning(false);
      setRoundScore(10);
      setPhase('result');
      soundEffects.playSuccess();
      toast.success(t.brilliantSolved);
    } else {
      soundEffects.playError();
      toast.error(t.notQuiteTryAgain);
      setUserGuess('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && phase === 'playing') {
      e.preventDefault();
      submitGuess();
    }
  };

  const continueToNext = () => {
    onRoundComplete(roundScore);
  };

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-h-full overflow-y-auto">
      <div className="text-center mb-2 md:mb-4">
        <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-accent glow-text mb-1 md:mb-2">
          🎯 {t.conundrum}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          {phase === 'ready' && t.unscrambleWord}
          {phase === 'playing' && t.findHiddenWord}
          {phase === 'result' && (solved ? t.conundrumSolved : t.timesUp)}
        </p>
      </div>

      {/* Scrambled letter tiles */}
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 lg:gap-3 max-w-xl">
        {scrambled.split('').map((letter, index) => (
          <LetterTile
            key={index}
            letter={letter}
            delay={index * 100}
            isConundrum
          />
        ))}
      </div>

      {/* Ready phase */}
      {phase === 'ready' && (
        <button
          onClick={startRound}
          className="game-button-accent text-lg px-8 py-4 mt-4"
        >
          {t.startConundrum}
        </button>
      )}

      {/* Playing phase */}
      {phase === 'playing' && (
        <div className="flex flex-col items-center gap-3 md:gap-4 mt-2 md:mt-4">
          <CountdownTimer
            duration={settings.conundrumTimeoutDuration}
            isRunning={timerRunning}
            onComplete={handleTimerComplete}
            size={120}
          />
          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder={t.typeYourAnswer}
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              className="text-center font-display text-xl md:text-2xl h-12 md:h-14 uppercase tracking-wider bg-secondary border-border focus:border-accent"
              autoFocus
              maxLength={9}
            />
          </div>
          <button
            onClick={submitGuess}
            className="game-button-accent"
          >
            {t.submitAnswer}
          </button>
        </div>
      )}

      {/* Result phase */}
      {phase === 'result' && (
        <div className="flex flex-col items-center gap-6 mt-4 animate-slide-up">
          <div className="text-center">
            {solved ? (
              <>
                <p className="text-muted-foreground mb-2">{t.youGotIt}</p>
                <p className="font-display text-3xl font-bold text-accent mb-4">{answer}</p>
              </>
            ) : (
              <>
                <p className="text-muted-foreground mb-2">{t.answerWas}</p>
                <p className="font-display text-3xl font-bold text-foreground mb-4">{answer}</p>
              </>
            )}
            <p className="text-muted-foreground">{t.pointsEarned}</p>
            <p className="score-display">{roundScore}</p>
          </div>
          <button
            onClick={continueToNext}
            className="game-button-primary"
          >
            {t.seeFinalScore}
          </button>
        </div>
      )}
    </div>
  );
};
