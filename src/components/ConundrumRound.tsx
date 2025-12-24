import { useState, useCallback, useEffect } from 'react';
import { LetterTile } from './LetterTile';
import { CountdownTimer } from './CountdownTimer';
import { getRandomConundrumWord, scrambleWord } from '@/lib/conundrumWords';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { soundEffects } from '@/hooks/useSoundEffects';
import { useLanguage } from '@/hooks/useLanguage';

interface ConundrumRoundProps {
  onRoundComplete: (score: number) => void;
}

export const ConundrumRound = ({ onRoundComplete }: ConundrumRoundProps) => {
  const { t } = useLanguage();
  const [answer, setAnswer] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [phase, setPhase] = useState<'ready' | 'playing' | 'result'>('ready');
  const [timerRunning, setTimerRunning] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [roundScore, setRoundScore] = useState(0);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const word = getRandomConundrumWord();
    setAnswer(word);
    setScrambled(scrambleWord(word));
  }, []);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phase === 'playing') {
      submitGuess();
    }
  };

  const continueToNext = () => {
    onRoundComplete(roundScore);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center mb-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-accent glow-text mb-2">
          🎯 {t.conundrum}
        </h2>
        <p className="text-muted-foreground">
          {phase === 'ready' && t.unscrambleWord}
          {phase === 'playing' && t.findHiddenWord}
          {phase === 'result' && (solved ? t.conundrumSolved : t.timesUp)}
        </p>
      </div>

      {/* Scrambled letter tiles */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-xl">
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
        <div className="flex flex-col items-center gap-6 mt-4">
          <CountdownTimer 
            duration={30} 
            isRunning={timerRunning}
            onComplete={handleTimerComplete}
          />
          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder={t.typeYourAnswer}
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value.toUpperCase())}
              onKeyDown={handleKeyPress}
              className="text-center font-display text-2xl h-14 uppercase tracking-wider bg-secondary border-border focus:border-accent"
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
