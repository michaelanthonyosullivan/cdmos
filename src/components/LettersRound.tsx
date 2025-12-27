import { useState, useCallback, useEffect } from 'react';
import { LetterTile } from './LetterTile';
import { CountdownTimer } from './CountdownTimer';
import { getRandomConsonant, getRandomVowel, isValidWord, canFormWord, calculateWordScore } from '@/lib/gameUtils';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { soundEffects } from '@/hooks/useSoundEffects';
import { useLanguage } from '@/hooks/useLanguage';
import { VirtualLetterKeyboard } from './VirtualLetterKeyboard';
interface LettersRoundProps {
  onRoundComplete: (score: number) => void;
  roundNumber: number;
}

export const LettersRound = ({ onRoundComplete, roundNumber }: LettersRoundProps) => {
  const { t, language } = useLanguage();
  const [letters, setLetters] = useState<string[]>([]);
  const [phase, setPhase] = useState<'picking' | 'playing' | 'result'>('picking');
  const [timerRunning, setTimerRunning] = useState(false);
  const [userWord, setUserWord] = useState('');
  const [roundScore, setRoundScore] = useState(0);
  const [vowelCount, setVowelCount] = useState(0);
  const [consonantCount, setConsonantCount] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  const MAX_LETTERS = 9;
  const MIN_VOWELS = 3;
  const MIN_CONSONANTS = 4;

  const addConsonant = () => {
    if (letters.length >= MAX_LETTERS) return;
    if (consonantCount >= MAX_LETTERS - MIN_VOWELS) {
      toast.error(t.needMinVowels);
      return;
    }
    const newLetter = getRandomConsonant();
    setLetters([...letters, newLetter]);
    setConsonantCount(prev => prev + 1);
    soundEffects.playReveal();
  };

  const addVowel = () => {
    if (letters.length >= MAX_LETTERS) return;
    if (vowelCount >= MAX_LETTERS - MIN_CONSONANTS) {
      toast.error(t.needMinConsonants);
      return;
    }
    const newLetter = getRandomVowel();
    setLetters([...letters, newLetter]);
    setVowelCount(prev => prev + 1);
    soundEffects.playReveal();
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

  const submitWord = async () => {
    const word = userWord.trim().toUpperCase();
    
    if (!word) {
      setRoundScore(0);
      setPhase('result');
      return;
    }

    if (!canFormWord(word, letters)) {
      toast.error(t.onlyUseAvailableLetters);
      soundEffects.playError();
      setRoundScore(0);
      setPhase('result');
      return;
    }

    setIsValidating(true);
    const valid = await isValidWord(word, language);
    setIsValidating(false);

    if (!valid) {
      toast.error(t.notValidWord);
      soundEffects.playError();
      setRoundScore(0);
      setPhase('result');
      return;
    }

    const score = calculateWordScore(word);
    setRoundScore(score);
    setPhase('result');
    toast.success(t.greatWord(score));
    soundEffects.playSuccess();
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
          {t.lettersRound}
        </h2>
        <p className="text-muted-foreground">
          {phase === 'picking' && t.pickMoreLetters(MAX_LETTERS - letters.length)}
          {phase === 'playing' && t.makeLongestWord}
          {phase === 'result' && t.roundComplete}
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
            {t.consonant}
          </button>
          <button 
            onClick={addVowel}
            className="game-button-accent"
            disabled={letters.length >= MAX_LETTERS}
          >
            {t.vowel}
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
              placeholder={t.typeYourWord}
              value={userWord}
              onChange={(e) => setUserWord(e.target.value.toUpperCase())}
              onKeyDown={handleKeyPress}
              className="text-center font-display text-2xl h-14 uppercase tracking-wider bg-secondary border-border focus:border-primary"
              autoFocus
            />
          </div>
          <VirtualLetterKeyboard
            letters={letters}
            onInsert={(letter) => setUserWord(prev => prev + letter)}
          />
          <button 
            onClick={() => {
              setTimerRunning(false);
              submitWord();
            }}
            className="game-button-primary"
            disabled={isValidating}
          >
            {isValidating ? t.checking : t.submitWord}
          </button>
        </div>
      )}

      {/* Result phase */}
      {phase === 'result' && (
        <div className="flex flex-col items-center gap-6 mt-4 animate-slide-up">
          <div className="text-center">
            {userWord ? (
              <>
                <p className="text-muted-foreground mb-2">{t.yourWord}</p>
                <p className="font-display text-3xl font-bold text-foreground mb-4">{userWord}</p>
              </>
            ) : (
              <p className="text-muted-foreground mb-4">{t.noWordSubmitted}</p>
            )}
            <p className="text-muted-foreground">{t.pointsEarned}</p>
            <p className="score-display">{roundScore}</p>
          </div>
          <button 
            onClick={continueToNext}
            className="game-button-primary"
          >
            {t.continue}
          </button>
        </div>
      )}
    </div>
  );
};
