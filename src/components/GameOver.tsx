interface GameOverProps {
  score: number;
  onPlayAgain: () => void;
}

export const GameOver = ({ score, onPlayAgain }: GameOverProps) => {
  const getMessage = () => {
    if (score >= 50) return "Outstanding! You're a Countdown champion!";
    if (score >= 35) return "Great performance!";
    if (score >= 20) return "Good effort!";
    return "Keep practicing!";
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center animate-slide-up">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-primary glow-text">
        Game Over
      </h2>
      
      <div className="card-game">
        <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
          Final Score
        </p>
        <p className="score-display text-6xl md:text-7xl">{score}</p>
      </div>
      
      <p className="text-xl text-foreground max-w-md">
        {getMessage()}
      </p>
      
      <button 
        onClick={onPlayAgain}
        className="game-button-primary text-lg px-8 py-4"
      >
        Play Again
      </button>
    </div>
  );
};
