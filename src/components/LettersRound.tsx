import { useState, useCallback, useEffect } from 'react';
import { LetterTile } from './LetterTile';
import { CountdownTimer } from './CountdownTimer';
import { getRandomConsonant, getRandomVowel, isValidWord, canFormWord, calculateWordScore } from '@/lib/gameUtils';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface LettersRoundProps {
  onRoundComplete: (score: number) => void;
  roundNumber: number;
}

export const LettersRound = ({ onRoundComplete, roundNumber }: LettersRoundProps) => {
  const [letters, setLetters] = useState<string[]>([]);
  const [phase, setPhase] = useState<'picking' | 'playing' | 'result'>('picking');
  const [timerRunning, setTimerRunning] = useState(false);
  const [userWord, setUserWord] = useState('');
  const [roundScore, setRoundScore] = useState(0);
  const [vowelCount, setVowelCount] = useState(0);
  const [consonantCount, setConsonantCount] = useState(0);

  const MAX_LETTERS = 9;
  const MIN_VOWELS = 3;
  const MIN_CONSONANTS = 4;

  const addConsonant = () => {
    if (letters.length >= MAX_LETTERS) return;
    if (consonantCount >= MAX_LETTERS - MIN_VOWELS) {
      toast.error('You need at least 3 vowels!');
      return;
    }
    const newLetter = getRandomConsonant();
    setLetters([...letters, newLetter]);
    setConsonantCount(prev => prev + 1);
  };

  const addVowel = () => {
    if (letters.length >= MAX_LETTERS) return;
    if (vowelCount >= MAX_LETTERS - MIN_CONSONANTS) {
      toast.error('You need at least 4 consonants!');
      return;
    }
    const newLetter = getRandomVowel();
    setLetters([...letters, newLetter]);
    setVowelCount(prev => prev + 1);
  };

  useEffect(() => {
    if (letters.length === MAX_LETTERS && phase === 'picking') {
      setTimeout(() => {
        setPhase('playing');
        setTimerRunning(true);
      }, 500);
    }
  }, [letters.length, phase]);

  const handleTimerComplete = useCallback(() => {
    setTimerRunning(false);
    submitWord();
  }, [userWord, letters]);

  const submitWord = () => {
    const word = userWord.trim().toUpperCase();
    
    if (!word) {
      setRoundScore(0);
      setPhase('result');
      return;
    }

    if (!canFormWord(word, letters)) {
      toast.error("You can only use the available letters!");
      setRoundScore(0);
      setPhase('result');
      return;
    }

    if (!isValidWord(word)) {
      toast.error("That's not a valid word!");
      setRoundScore(0);
      setPhase('result');
      return;
    }

    const score = calculateWordScore(word);
    setRoundScore(score);
    setPhase('result');
    toast.success(`Great word! +${score} points`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phase === 'playing') {
      setTimerRunning(false);
      submitWord();
    }
  };

  const continueToNext = () => {
    onRoundComplete(roundScore);
  };

  const resetRound = () => {
    setLetters([]);
    setPhase('picking');
    setTimerRunning(false);
    setUserWord('');
    setRoundScore(0);
    setVowelCount(0);
    setConsonantCount(0);
  };

  useEffect(() => {
    resetRound();
  }, [roundNumber]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center mb-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary glow-text mb-2">
          Letters Round
        </h2>
        <p className="text-muted-foreground">
          {phase === 'picking' && `Pick ${MAX_LETTERS - letters.length} more letters`}
          {phase === 'playing' && 'Make the longest word you can!'}
          {phase === 'result' && 'Round Complete'}
        </p>
      </div>

      {/* Letter tiles */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-xl">
        {letters.map((letter, index) => (
          <LetterTile 
            key={index} 
            letter={letter} 
            delay={index * 100}
          />
        ))}
        {Array.from({ length: MAX_LETTERS - letters.length }).map((_, index) => (
          <div 
            key={`empty-${index}`}
            className="w-16 h-20 md:w-20 md:h-24 rounded-lg border-2 border-dashed border-muted opacity-30"
          />
        ))}
      </div>

      {/* Picking phase */}
      {phase === 'picking' && (
        <div className="flex gap-4 mt-4">
          <button 
            onClick={addConsonant}
            className="game-button-primary"
            disabled={letters.length >= MAX_LETTERS}
          >
            Consonant
          </button>
          <button 
            onClick={addVowel}
            className="game-button-accent"
            disabled={letters.length >= MAX_LETTERS}
          >
            Vowel
          </button>
        </div>
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
              placeholder="Type your word..."
              value={userWord}
              onChange={(e) => setUserWord(e.target.value.toUpperCase())}
              onKeyDown={handleKeyPress}
              className="text-center font-display text-2xl h-14 uppercase tracking-wider bg-secondary border-border focus:border-primary"
              autoFocus
            />
          </div>
          <button 
            onClick={() => {
              setTimerRunning(false);
              submitWord();
            }}
            className="game-button-primary"
          >
            Submit Word
          </button>
        </div>
      )}

      {/* Result phase */}
      {phase === 'result' && (
        <div className="flex flex-col items-center gap-6 mt-4 animate-slide-up">
          <div className="text-center">
            {userWord ? (
              <>
                <p className="text-muted-foreground mb-2">Your word:</p>
                <p className="font-display text-3xl font-bold text-foreground mb-4">{userWord}</p>
              </>
            ) : (
              <p className="text-muted-foreground mb-4">No word submitted</p>
            )}
            <p className="text-muted-foreground">Points earned:</p>
            <p className="score-display">{roundScore}</p>
          </div>
          <button 
            onClick={continueToNext}
            className="game-button-primary"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
