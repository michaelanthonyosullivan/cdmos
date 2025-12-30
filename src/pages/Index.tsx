import { useState } from 'react';
import { GameHeader } from '@/components/GameHeader';
import { StartScreen } from '@/components/StartScreen';
import { LettersRound } from '@/components/LettersRound';
import { NumbersRound } from '@/components/NumbersRound';
import { ConundrumRound } from '@/components/ConundrumRound';
import { GameOver } from '@/components/GameOver';
import { HighScoreBoard } from '@/components/HighScoreBoard';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Settings } from '@/components/Settings';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon } from 'lucide-react';

type GamePhase = 'start' | 'letters' | 'numbers' | 'conundrum' | 'gameover' | 'settings';

const Index = () => {
  const { t } = useLanguage();
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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* SEO */}
      <title>Countdown - Word & Numbers Game</title>
      <meta name="description" content="Play Countdown online - the classic British TV game show. Challenge yourself with letters and numbers rounds!" />
      
      {phase !== 'start' && phase !== 'gameover' && (
        <GameHeader score={score} round={currentRound} totalRounds={TOTAL_ROUNDS} />
      )}
      
      {/* Language switcher and settings button on start screen */}
      {phase === 'start' && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPhase('settings')}
            className="text-muted-foreground hover:text-foreground"
          >
            <SettingsIcon className="h-5 w-5" />
          </Button>
          <LanguageSwitcher />
        </div>
      )}
      
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 overflow-hidden">
        <div className="w-full max-w-3xl h-full flex flex-col items-center justify-center overflow-y-auto">
          {phase === 'start' && (
            <>
              <StartScreen onStart={startGame} />
              <HighScoreBoard />
            </>
          )}
          
          {phase === 'settings' && (
            <div className="w-full flex flex-col items-center gap-4">
              <Settings onClose={() => setPhase('start')} />
            </div>
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
      
      {/* Footer - only show on start screen */}
      {phase === 'start' && (
        <footer className="py-2 md:py-4 text-center text-muted-foreground text-xs md:text-sm">
          <p>{t.footer}</p>
        </footer>
      )}
    </div>
  );
};

export default Index;
