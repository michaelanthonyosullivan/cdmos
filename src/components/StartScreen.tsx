import { useLanguage } from '@/hooks/useLanguage';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div className="animate-pop-in">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-wider mb-4">
          <span className="text-primary">{t.title}</span>
          <span className="text-accent">{t.titleSuffix}</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md">
          {t.tagline}
        </p>
      </div>
      
      <div className="card-game max-w-md animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">{t.howToPlay}</h3>
        <div className="space-y-3 text-left text-muted-foreground">
          <p>
            <span className="text-primary font-semibold">{t.lettersRound}:</span> {t.lettersRoundDesc}
          </p>
          <p>
            <span className="text-accent font-semibold">{t.numbersRound}:</span> {t.numbersRoundDesc}
          </p>
        </div>
      </div>
      
      <button 
        onClick={onStart}
        className="game-button-primary text-lg px-10 py-4 animate-pulse-glow"
        style={{ animationDelay: '400ms' }}
      >
        {t.startGame}
      </button>
    </div>
  );
};
