import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSwitcher } from './LanguageSwitcher';

interface GameHeaderProps {
  score: number;
  round: number;
  totalRounds: number;
}

export const GameHeader = ({ score, round, totalRounds }: GameHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b border-border/50">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wider">
          <span className="text-primary">{t.title}</span>
          <span className="text-accent">{t.titleSuffix}</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <LanguageSwitcher />
        
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">{t.round}</p>
          <p className="font-display text-xl font-bold">
            {round}/{totalRounds}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">{t.score}</p>
          <p className="font-display text-2xl font-bold text-accent">
            {score}
          </p>
        </div>
      </div>
    </header>
  );
};
