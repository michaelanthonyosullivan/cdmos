import { useLanguage } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex gap-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            language === 'en'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('fr')}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            language === 'fr'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          FR
        </button>
      </div>
    </div>
  );
};
