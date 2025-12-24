import { getHighScores, clearHighScores, HighScore } from '@/lib/highScores';
import { useState, useEffect } from 'react';
import { Trophy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { soundEffects } from '@/hooks/useSoundEffects';
import { useLanguage } from '@/hooks/useLanguage';

interface HighScoreBoardProps {
  currentScore?: number;
  isNewHighScore?: boolean;
  rank?: number;
}

export const HighScoreBoard = ({ currentScore, isNewHighScore, rank }: HighScoreBoardProps) => {
  const { t } = useLanguage();
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    setScores(getHighScores());
  }, [currentScore]);

  const handleClear = () => {
    clearHighScores();
    setScores([]);
    soundEffects.playClick();
    toast.success(t.highScoresCleared);
  };

  if (scores.length === 0 && !currentScore) {
    return null;
  }

  return (
    <div className="card-game mt-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-score-gold" />
          <h3 className="font-display text-lg font-bold text-foreground">{t.highScores}</h3>
        </div>
        {scores.length > 0 && (
          <button
            onClick={handleClear}
            className="text-muted-foreground hover:text-destructive transition-colors p-1"
            title={t.clearHighScores}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {isNewHighScore && rank && (
        <div className="bg-accent/20 border border-accent/30 rounded-lg p-3 mb-4 text-center animate-pulse">
          <p className="text-accent font-bold">{t.newHighScore(rank)}</p>
        </div>
      )}

      <div className="space-y-2">
        {scores.slice(0, 5).map((score, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
              currentScore === score.score && isNewHighScore && index === (rank ?? 1) - 1
                ? 'bg-accent/10 border border-accent/30'
                : 'bg-muted/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-display text-lg font-bold ${
                index === 0 ? 'text-score-gold' : 
                index === 1 ? 'text-muted-foreground' : 
                index === 2 ? 'text-orange-400' : 'text-muted-foreground'
              }`}>
                #{index + 1}
              </span>
              <span className="text-foreground font-medium">{score.score} {t.pts}</span>
            </div>
            <span className="text-muted-foreground text-sm">{score.date}</span>
          </div>
        ))}
      </div>

      {scores.length === 0 && (
        <p className="text-muted-foreground text-center py-4">
          {t.noHighScoresYet}
        </p>
      )}
    </div>
  );
};
