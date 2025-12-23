import { useState, useCallback, useEffect } from 'react';
import { NumberTile } from './NumberTile';
import { CountdownTimer } from './CountdownTimer';
import { generateTarget } from '@/lib/gameUtils';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { soundEffects } from '@/hooks/useSoundEffects';

interface NumbersRoundProps {
  onRoundComplete: (score: number) => void;
  roundNumber: number;
}

export const NumbersRound = ({ onRoundComplete, roundNumber }: NumbersRoundProps) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [target, setTarget] = useState(0);
  const [phase, setPhase] = useState<'picking' | 'playing' | 'result'>('picking');
  const [timerRunning, setTimerRunning] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [roundScore, setRoundScore] = useState(0);
  const [largeCount, setLargeCount] = useState(0);

  const LARGE_NUMBERS = [25, 50, 75, 100];

  const pickLarge = () => {
    if (numbers.length >= 6) return;
    if (largeCount >= 4) {
      toast.error('Maximum 4 large numbers!');
      return;
    }
    const availableLarge = LARGE_NUMBERS.filter(n => 
      numbers.filter(x => x === n).length < 1
    );
    if (availableLarge.length === 0) return;
    const num = availableLarge[Math.floor(Math.random() * availableLarge.length)];
    setNumbers([...numbers, num]);
    setLargeCount(prev => prev + 1);
    soundEffects.playReveal();
  };

  const pickSmall = () => {
    if (numbers.length >= 6) return;
    const smallNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const num = smallNumbers[Math.floor(Math.random() * smallNumbers.length)];
    setNumbers([...numbers, num]);
    soundEffects.playReveal();
  };

  useEffect(() => {
    if (numbers.length === 6 && phase === 'picking') {
      const newTarget = generateTarget();
      setTarget(newTarget);
      setTimeout(() => {
        setPhase('playing');
        setTimerRunning(true);
      }, 500);
    }
  }, [numbers.length, phase]);

  const handleTimerComplete = useCallback(() => {
    setTimerRunning(false);
    submitAnswer();
  }, [userAnswer, target]);

  const evaluateExpression = (expr: string): number | null => {
    try {
      // Only allow numbers, operators, parentheses, and spaces
      if (!/^[\d+\-*/() ]+$/.test(expr)) {
        return null;
      }
      // Safely evaluate
      const result = Function(`"use strict"; return (${expr})`)();
      if (typeof result === 'number' && isFinite(result)) {
        return Math.round(result);
      }
      return null;
    } catch {
      return null;
    }
  };

  // Validate that the expression only uses available numbers
  const validateNumbersUsed = (expr: string): boolean => {
    // Extract all numbers from the expression
    const numbersInExpr = expr.match(/\d+/g);
    if (!numbersInExpr) return true; // No numbers is technically valid (empty)
    
    // Create a copy of available numbers to track usage
    const availableNumbers = [...numbers];
    
    for (const numStr of numbersInExpr) {
      const num = parseInt(numStr, 10);
      const index = availableNumbers.indexOf(num);
      if (index === -1) {
        return false; // Number not available or already used
      }
      availableNumbers.splice(index, 1); // Remove used number
    }
    
    return true;
  };

  const submitAnswer = () => {
    const answer = userAnswer.trim();
    
    if (!answer) {
      setRoundScore(0);
      setPhase('result');
      return;
    }

    // Validate numbers used
    if (!validateNumbersUsed(answer)) {
      toast.error("You can only use the available numbers, each once!");
      soundEffects.playError();
      setRoundScore(0);
      setPhase('result');
      return;
    }

    const result = evaluateExpression(answer);
    
    if (result === null) {
      toast.error("Invalid expression!");
      soundEffects.playError();
      setRoundScore(0);
      setPhase('result');
      return;
    }

    const diff = Math.abs(target - result);
    let score = 0;

    if (diff === 0) {
      score = 10;
      toast.success('Exact answer! +10 points');
      soundEffects.playSuccess();
    } else if (diff <= 5) {
      score = 7;
      toast.success(`Within 5! (${result}) +7 points`);
      soundEffects.playSuccess();
    } else if (diff <= 10) {
      score = 5;
      toast.success(`Within 10! (${result}) +5 points`);
      soundEffects.playSuccess();
    } else {
      toast.info(`Result: ${result} - Too far from target`);
      soundEffects.playError();
    }

    setRoundScore(score);
    setPhase('result');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phase === 'playing') {
      setTimerRunning(false);
      submitAnswer();
    }
  };

  const continueToNext = () => {
    onRoundComplete(roundScore);
  };

  const resetRound = () => {
    setNumbers([]);
    setTarget(0);
    setPhase('picking');
    setTimerRunning(false);
    setUserAnswer('');
    setRoundScore(0);
    setLargeCount(0);
  };

  useEffect(() => {
    resetRound();
  }, [roundNumber]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center mb-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary glow-text mb-2">
          Numbers Round
        </h2>
        <p className="text-muted-foreground">
          {phase === 'picking' && `Pick ${6 - numbers.length} more numbers`}
          {phase === 'playing' && 'Get as close to the target as you can!'}
          {phase === 'result' && 'Round Complete'}
        </p>
      </div>

      {/* Target display */}
      {target > 0 && (
        <div className="card-game text-center animate-pop-in">
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Target</p>
          <p className="font-display text-5xl md:text-6xl font-bold text-accent">
            {target}
          </p>
        </div>
      )}

      {/* Number tiles */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {numbers.map((number, index) => (
          <NumberTile 
            key={index} 
            number={number}
            isLarge={LARGE_NUMBERS.includes(number)}
          />
        ))}
        {Array.from({ length: 6 - numbers.length }).map((_, index) => (
          <div 
            key={`empty-${index}`}
            className="w-14 h-14 md:w-16 md:h-16 rounded-lg border-2 border-dashed border-muted opacity-30"
          />
        ))}
      </div>

      {/* Picking phase */}
      {phase === 'picking' && (
        <div className="flex gap-4 mt-4">
          <button 
            onClick={pickLarge}
            className="game-button-accent"
            disabled={numbers.length >= 6 || largeCount >= 4}
          >
            Large ({largeCount}/4)
          </button>
          <button 
            onClick={pickSmall}
            className="game-button-primary"
            disabled={numbers.length >= 6}
          >
            Small
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
              placeholder="e.g. (100 + 25) * 4"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              className="text-center font-mono text-xl h-14 bg-secondary border-border focus:border-primary"
              autoFocus
            />
            <p className="text-muted-foreground text-sm text-center mt-2">
              Use +, -, *, / and parentheses
            </p>
          </div>
          <button 
            onClick={() => {
              setTimerRunning(false);
              submitAnswer();
            }}
            className="game-button-primary"
          >
            Submit Answer
          </button>
        </div>
      )}

      {/* Result phase */}
      {phase === 'result' && (
        <div className="flex flex-col items-center gap-6 mt-4 animate-slide-up">
          <div className="text-center">
            {userAnswer ? (
              <>
                <p className="text-muted-foreground mb-2">Your calculation:</p>
                <p className="font-mono text-xl text-foreground mb-2">{userAnswer}</p>
                <p className="text-muted-foreground mb-4">
                  = {evaluateExpression(userAnswer) ?? 'Invalid'}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground mb-4">No answer submitted</p>
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
