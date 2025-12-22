interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div className="animate-pop-in">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-wider mb-4">
          <span className="text-primary">COUNT</span>
          <span className="text-accent">DOWN</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md">
          The classic word and numbers game
        </p>
      </div>
      
      <div className="card-game max-w-md animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">How to Play</h3>
        <div className="space-y-3 text-left text-muted-foreground">
          <p>
            <span className="text-primary font-semibold">Letters Round:</span> Pick 9 letters (vowels and consonants), then make the longest word you can in 30 seconds.
          </p>
          <p>
            <span className="text-accent font-semibold">Numbers Round:</span> Pick 6 numbers, then use arithmetic to reach the target number.
          </p>
        </div>
      </div>
      
      <button 
        onClick={onStart}
        className="game-button-primary text-lg px-10 py-4 animate-pulse-glow"
        style={{ animationDelay: '400ms' }}
      >
        Start Game
      </button>
    </div>
  );
};
