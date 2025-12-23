import { useState } from 'react';
import { GameHeader } from '@/components/GameHeader';
import { StartScreen } from '@/components/StartScreen';
import { LettersRound } from '@/components/LettersRound';
import { NumbersRound } from '@/components/NumbersRound';
import { ConundrumRound } from '@/components/ConundrumRound';
import { GameOver } from '@/components/GameOver';
import { HighScoreBoard } from '@/components/HighScoreBoard';

type GamePhase = 'start' | 'letters' | 'numbers' | 'conundrum' | 'gameover';

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundKey, setRoundKey] = useState(0);
  
  const TOTAL_ROUNDS = 7; // 3 letters + 3 numbers + 1 conundrum

  const startGame = () => {
    setScore(0);
    setCurrentRound(1);
    setPhase('letters');
    setRoundKey(0);
  };

  const handleRoundComplete = (roundScore: number) => {
    setScore(prev => prev + roundScore);
    
    // After round 6 (3 letters + 3 numbers), go to conundrum
    if (currentRound === 6) {
      setCurrentRound(7);
      setPhase('conundrum');
    } else if (currentRound >= TOTAL_ROUNDS) {
      setPhase('gameover');
    } else {
      setCurrentRound(prev => prev + 1);
      setRoundKey(prev => prev + 1);
      
      // Alternate between letters and numbers
      if (phase === 'letters') {
        setPhase('numbers');
      } else if (phase === 'numbers') {
        setPhase('letters');
      }
    }
  };

  const handleConundrumComplete = (roundScore: number) => {
    setScore(prev => prev + roundScore);
    setPhase('gameover');
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
            <>
              <StartScreen onStart={startGame} />
              <HighScoreBoard />
            </>
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

          {phase === 'conundrum' && (
            <ConundrumRound 
              key="conundrum"
              onRoundComplete={handleConundrumComplete}
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