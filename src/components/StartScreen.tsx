import { useLanguage } from '@/hooks/useLanguage';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 text-center">
      <div className="animate-pop-in">
        <h1 className="font-display text-3xl md:text-5xl lg:text-7xl font-bold tracking-wider mb-2 md:mb-4">
          <span className="text-primary">{t.title}</span>
          <span className="text-accent">{t.titleSuffix}</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-md mx-auto text-center">
          {t.tagline}
        </p>
      </div>
      
      <div className="card-game max-w-md animate-slide-up p-4 md:p-6" style={{ animationDelay: '200ms' }}>
        <h3 className="font-display text-base md:text-lg font-semibold text-foreground mb-2 md:mb-4">{t.howToPlay}</h3>
        <div className="space-y-2 md:space-y-3 text-left text-muted-foreground text-sm md:text-base">
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
        className="game-button-primary text-base md:text-lg px-6 md:px-10 py-3 md:py-4 animate-pulse-glow"
        style={{ animationDelay: '400ms' }}
      >
        {t.startGame}
      </button>
    </div>
  );
};
