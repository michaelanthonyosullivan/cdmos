import { useState, useCallback, useEffect } from 'react';
import { NumberTile } from './NumberTile';
import { CountdownTimer } from './CountdownTimer';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { soundEffects } from '@/hooks/useSoundEffects';
import { useLanguage } from '@/hooks/useLanguage';
import { VirtualNumberKeyboard } from './VirtualNumberKeyboard';

interface NumbersRoundProps {
  onRoundComplete: (score: number) => void;
  roundNumber: number;
}

// Normalize expression: convert [] to (), x to *, = to +
const normalizeExpression = (expr: string): string => {
  return expr
    .replace(/\[/g, '(')
    .replace(/\]/g, ')')
    .replace(/x/gi, '*')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/=/g, '+')
    .trim();
};

// Find a solution using the given numbers to reach the target
const findSolution = (numbers: number[], target: number): string | null => {
  const ops = ['+', '-', '*', '/'];
  
  // Try combinations of 2 numbers
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i === j) continue;
      for (const op of ops) {
        const result = applyOp(numbers[i], numbers[j], op);
        if (result === target) {
          return `${numbers[i]} ${op === '*' ? 'x' : op} ${numbers[j]} = ${target}`;
        }
      }
    }
  }
  
  // Try combinations of 3 numbers
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i === j) continue;
      for (const op1 of ops) {
        const r1 = applyOp(numbers[i], numbers[j], op1);
        if (r1 === null || r1 <= 0) continue;
        
        for (let k = 0; k < numbers.length; k++) {
          if (k === i || k === j) continue;
          for (const op2 of ops) {
            const result = applyOp(r1, numbers[k], op2);
            if (result === target) {
              return `[${numbers[i]} ${op1 === '*' ? 'x' : op1} ${numbers[j]}] ${op2 === '*' ? 'x' : op2} ${numbers[k]} = ${target}`;
            }
          }
        }
      }
    }
  }
  
  // Try combinations of 4 numbers
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i === j) continue;
      for (const op1 of ops) {
        const r1 = applyOp(numbers[i], numbers[j], op1);
        if (r1 === null || r1 <= 0) continue;
        
        for (let k = 0; k < numbers.length; k++) {
          if (k === i || k === j) continue;
          for (const op2 of ops) {
            const r2 = applyOp(r1, numbers[k], op2);
            if (r2 === null || r2 <= 0) continue;
            
            for (let l = 0; l < numbers.length; l++) {
              if (l === i || l === j || l === k) continue;
              for (const op3 of ops) {
                const result = applyOp(r2, numbers[l], op3);
                if (result === target) {
                  return `[[${numbers[i]} ${op1 === '*' ? 'x' : op1} ${numbers[j]}] ${op2 === '*' ? 'x' : op2} ${numbers[k]}] ${op3 === '*' ? 'x' : op3} ${numbers[l]} = ${target}`;
                }
              }
            }
          }
        }
      }
    }
  }
  
  return null;
};

const applyOp = (a: number, b: number, op: string): number | null => {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b > 0 ? a - b : null;
    case '*': return a * b;
    case '/': return b !== 0 && a % b === 0 ? a / b : null;
    default: return null;
  }
};

// Generate a solvable target
const generateSolvableTarget = (numbers: number[]): { target: number; solution: string } => {
  // Try to find a target between 100-999 that's solvable
  for (let attempt = 0; attempt < 100; attempt++) {
    const target = Math.floor(Math.random() * 900) + 100;
    const solution = findSolution(numbers, target);
    if (solution) {
      return { target, solution };
    }
  }
  
  // Fallback: generate a target from the numbers themselves
  const sorted = [...numbers].sort((a, b) => b - a);
  if (sorted[0] * sorted[1] >= 100 && sorted[0] * sorted[1] <= 999) {
    const target = sorted[0] * sorted[1];
    return { target, solution: `${sorted[0]} x ${sorted[1]} = ${target}` };
  }
  
  // Simple addition fallback
  const sum = sorted[0] + sorted[1] + sorted[2];
  return { target: sum, solution: `${sorted[0]} + ${sorted[1]} + ${sorted[2]} = ${sum}` };
};

export const NumbersRound = ({ onRoundComplete, roundNumber }: NumbersRoundProps) => {
  const { t } = useLanguage();
  const [numbers, setNumbers] = useState<number[]>([]);
  const [target, setTarget] = useState(0);
  const [solution, setSolution] = useState('');
  const [phase, setPhase] = useState<'picking' | 'playing' | 'result'>('picking');
  const [timerRunning, setTimerRunning] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [roundScore, setRoundScore] = useState(0);
  const [largeCount, setLargeCount] = useState(0);

  const LARGE_NUMBERS = [25, 50, 75, 100];

  const pickLarge = () => {
    if (numbers.length >= 6) return;
    if (largeCount >= 4) {
      toast.error(t.maxLargeNumbers);
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
      const { target: newTarget, solution: newSolution } = generateSolvableTarget(numbers);
      setTarget(newTarget);
      setSolution(newSolution);
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
      const normalized = normalizeExpression(expr);
      // Only allow numbers, operators, parentheses, and spaces
      if (!/^[\d+\-*/() ]+$/.test(normalized)) {
        return null;
      }
      // Safely evaluate
      const result = Function(`"use strict"; return (${normalized})`)();
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
    const normalized = normalizeExpression(expr);
    // Extract all numbers from the expression
    const numbersInExpr = normalized.match(/\d+/g);
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
      toast.error(t.onlyUseAvailableNumbers);
      soundEffects.playError();
      setRoundScore(0);
      setPhase('result');
      return;
    }

    const result = evaluateExpression(answer);
    
    if (result === null) {
      toast.error(t.invalidExpression);
      soundEffects.playError();
      setRoundScore(0);
      setPhase('result');
      return;
    }

    const diff = Math.abs(target - result);
    let score = 0;

    if (diff === 0) {
      score = 10;
      toast.success(t.exactAnswer);
      soundEffects.playSuccess();
    } else if (diff <= 5) {
      score = 7;
      toast.success(t.within5(result));
      soundEffects.playSuccess();
    } else if (diff <= 10) {
      score = 5;
      toast.success(t.within10(result));
      soundEffects.playSuccess();
    } else {
      toast.info(t.tooFarFromTarget(result));
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
    setSolution('');
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
          {t.numbersRound}
        </h2>
        <p className="text-muted-foreground">
          {phase === 'picking' && t.pickMoreNumbers(6 - numbers.length)}
          {phase === 'playing' && t.getCloseToTarget}
          {phase === 'result' && t.roundComplete}
        </p>
      </div>

      {/* Target display */}
      {target > 0 && (
        <div className="card-game text-center animate-pop-in">
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">{t.target}</p>
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
            {t.large} ({largeCount}/4)
          </button>
          <button 
            onClick={pickSmall}
            className="game-button-primary"
            disabled={numbers.length >= 6}
          >
            {t.small}
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
              placeholder={t.inputPlaceholder}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value.replace(/=/g, '+'))}
              onKeyDown={handleKeyPress}
              className="text-center font-mono text-xl h-14 bg-secondary border-border focus:border-primary"
              autoFocus
            />
            <p className="text-muted-foreground text-sm text-center mt-2">
              {t.inputHint}
            </p>
          </div>
          <VirtualNumberKeyboard
            numbers={numbers}
            onInsert={(value) => setUserAnswer(prev => prev + value)}
            onDelete={() => setUserAnswer(prev => prev.slice(0, -1))}
            onClear={() => setUserAnswer('')}
          />
          <button 
            onClick={() => {
              setTimerRunning(false);
              submitAnswer();
            }}
            className="game-button-primary"
          >
            {t.submitAnswer}
          </button>
        </div>
      )}

      {/* Result phase */}
      {phase === 'result' && (
        <div className="flex flex-col items-center gap-6 mt-4 animate-slide-up">
          <div className="text-center">
            {userAnswer ? (
              <>
                <p className="text-muted-foreground mb-2">{t.yourCalculation}</p>
                <p className="font-mono text-xl text-foreground mb-2">{userAnswer}</p>
                <p className="text-muted-foreground mb-4">
                  = {evaluateExpression(userAnswer) ?? t.invalid}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground mb-4">{t.noAnswerSubmitted}</p>
            )}
            <p className="text-muted-foreground">{t.pointsEarned}</p>
            <p className="score-display">{roundScore}</p>
          </div>
          
          {/* Show solution */}
          <div className="card-game text-center">
            <p className="text-muted-foreground text-sm mb-2">{t.onePossibleSolution}</p>
            <p className="font-mono text-lg text-primary">{solution}</p>
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
