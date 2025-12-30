import { useEffect, useState, forwardRef } from 'react';
import { HighScoreBoard } from './HighScoreBoard';
import { saveHighScore, isNewHighScore, getHighScoreRank } from '@/lib/highScores';
import { soundEffects } from '@/hooks/useSoundEffects';
import { useLanguage } from '@/hooks/useLanguage';

interface GameOverProps {
  score: number;
  onPlayAgain: () => void;
}

export const GameOver = forwardRef<HTMLDivElement, GameOverProps>(({ score, onPlayAgain }, ref) => {
  const { t } = useLanguage();
  const [isNew, setIsNew] = useState(false);
  const [rank, setRank] = useState<number | undefined>(undefined);

  useEffect(() => {
    const newHighScore = isNewHighScore(score);
    setIsNew(newHighScore);
    
    if (newHighScore) {
      const highScoreRank = getHighScoreRank(score);
      setRank(highScoreRank);
      saveHighScore(score, 7); // 7 rounds total
      soundEffects.playSuccess();
    }
    
    soundEffects.playGameOver();
  }, [score]);

  const getMessage = () => {
    if (score >= 50) return t.outstanding;
    if (score >= 35) return t.greatPerformance;
    if (score >= 20) return t.goodEffort;
    return t.keepPracticing;
  };

  const handlePlayAgain = () => {
    soundEffects.playClick();
    onPlayAgain();
  };

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 text-center animate-slide-up w-full max-h-full overflow-y-auto">
      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary glow-text">
        {t.gameOver}
      </h2>
      
      <div className="card-game p-4 md:p-6">
        <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-wider mb-2">
          {t.finalScore}
        </p>
        <p className="score-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl">{score}</p>
      </div>
      
      <p className="text-base md:text-lg lg:text-xl text-foreground max-w-md px-4">
        {getMessage()}
      </p>
      
      <button 
        onClick={handlePlayAgain}
        className="game-button-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
      >
        {t.playAgain}
      </button>

      <HighScoreBoard 
        currentScore={score} 
        isNewHighScore={isNew} 
        rank={rank} 
      />
    </div>
  );
});

GameOver.displayName = 'GameOver';
