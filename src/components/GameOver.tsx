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
    <div ref={ref} className="flex flex-col items-center justify-center gap-8 text-center animate-slide-up">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-primary glow-text">
        {t.gameOver}
      </h2>
      
      <div className="card-game">
        <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
          {t.finalScore}
        </p>
        <p className="score-display text-6xl md:text-7xl">{score}</p>
      </div>
      
      <p className="text-xl text-foreground max-w-md">
        {getMessage()}
      </p>
      
      <button 
        onClick={handlePlayAgain}
        className="game-button-primary text-lg px-8 py-4"
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
