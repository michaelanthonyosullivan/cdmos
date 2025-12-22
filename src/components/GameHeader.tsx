interface GameHeaderProps {
  score: number;
  round: number;
  totalRounds: number;
}

export const GameHeader = ({ score, round, totalRounds }: GameHeaderProps) => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b border-border/50">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wider">
          <span className="text-primary">COUNT</span>
          <span className="text-accent">DOWN</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">Round</p>
          <p className="font-display text-xl font-bold">
            {round}/{totalRounds}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">Score</p>
          <p className="font-display text-2xl font-bold text-accent">
            {score}
          </p>
        </div>
      </div>
    </header>
  );
};
