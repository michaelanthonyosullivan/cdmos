import { useState } from 'react';
import { GameHeader } from '@/components/GameHeader';
import { StartScreen } from '@/components/StartScreen';
import { LettersRound } from '@/components/LettersRound';
import { NumbersRound } from '@/components/NumbersRound';
import { GameOver } from '@/components/GameOver';

type GamePhase = 'start' | 'letters' | 'numbers' | 'gameover';

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundKey, setRoundKey] = useState(0);
  
  const TOTAL_ROUNDS = 6; // 3 letters + 3 numbers

  const startGame = () => {
    setScore(0);
    setCurrentRound(1);
    setPhase('letters');
    setRoundKey(0);
  };

  const handleRoundComplete = (roundScore: number) => {
    setScore(prev => prev + roundScore);
    
    if (currentRound >= TOTAL_ROUNDS) {
      setPhase('gameover');
    } else {
      setCurrentRound(prev => prev + 1);
      setRoundKey(prev => prev + 1);
      
      // Alternate between letters and numbers
      if (phase === 'letters') {
        setPhase('numbers');
      } else {
        setPhase('letters');
      }
    }
  };

  const resetGame = () => {
    setPhase('start');
    setScore(0);
    setCurrentRound(1);
    setRoundKey(0);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* SEO */}
      <title>Countdown - Word & Numbers Game</title>
      <meta name="description" content="Play Countdown online - the classic British TV game show. Challenge yourself with letters and numbers rounds!" />
      
      {phase !== 'start' && phase !== 'gameover' && (
        <GameHeader score={score} round={currentRound} totalRounds={TOTAL_ROUNDS} />
      )}
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          {phase === 'start' && (
            <StartScreen onStart={startGame} />
          )}
          
          {phase === 'letters' && (
            <LettersRound 
              key={`letters-${roundKey}`}
              onRoundComplete={handleRoundComplete}
              roundNumber={roundKey}
            />
          )}
          
          {phase === 'numbers' && (
            <NumbersRound 
              key={`numbers-${roundKey}`}
              onRoundComplete={handleRoundComplete}
              roundNumber={roundKey}
            />
          )}
          
          {phase === 'gameover' && (
            <GameOver score={score} onPlayAgain={resetGame} />
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 text-center text-muted-foreground text-sm">
        <p>Inspired by the classic TV show - reimagined by Michael O'Sullivan</p>
      </footer>
    </div>
  );
};

export default Index;
