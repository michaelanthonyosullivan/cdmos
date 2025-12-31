import { useSettings } from '@/hooks/useSettings';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface SettingsProps {
  onClose?: () => void;
}

export const Settings = ({ onClose }: SettingsProps) => {
  const { settings, updateSettings } = useSettings();
  const { t } = useLanguage();

  const timeoutOptions = [
    { value: 30, label: '30s' },
    { value: 60, label: '1min' },
    { value: 90, label: '1.5min' },
    { value: 120, label: '2min' },
    { value: 150, label: '2.5min' },
    { value: 180, label: '3min' },
    { value: 210, label: '3.5min' },
    { value: 240, label: '4min' },
    { value: 270, label: '4.5min' },
    { value: 300, label: '5min' },
  ];

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) {
      return `${minutes}min`;
    }
    return `${minutes}.${remainingSeconds / 60 * 10}min`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-display">{t.settings || 'Settings'}</CardTitle>
        <CardDescription>
          {t.settingsDescription || 'Configure your game preferences'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Letters Timeout */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="letters-timeout" className="text-base">
              {t.lettersRound || 'Letters Round'}: {t.timeoutDuration || 'Timeout'}
            </Label>
            <span className="font-display text-lg font-semibold text-accent">
              {formatDuration(settings.lettersTimeoutDuration)}
            </span>
          </div>
          <div className="space-y-2">
            <Slider
              id="letters-timeout"
              min={30}
              max={300}
              step={30}
              value={[settings.lettersTimeoutDuration]}
              onValueChange={(value) => updateSettings({ lettersTimeoutDuration: value[0] })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30s</span>
              <span>5min</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 pt-2">
            {timeoutOptions.map((option) => (
              <Button
                key={`letters-${option.value}`}
                variant={settings.lettersTimeoutDuration === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSettings({ lettersTimeoutDuration: option.value })}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Numbers Timeout */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="numbers-timeout" className="text-base">
              {t.numbersRound || 'Numbers Round'}: {t.timeoutDuration || 'Timeout'}
            </Label>
            <span className="font-display text-lg font-semibold text-accent">
              {formatDuration(settings.numbersTimeoutDuration)}
            </span>
          </div>
          <div className="space-y-2">
            <Slider
              id="numbers-timeout"
              min={30}
              max={300}
              step={30}
              value={[settings.numbersTimeoutDuration]}
              onValueChange={(value) => updateSettings({ numbersTimeoutDuration: value[0] })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30s</span>
              <span>5min</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 pt-2">
            {timeoutOptions.map((option) => (
              <Button
                key={`numbers-${option.value}`}
                variant={settings.numbersTimeoutDuration === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSettings({ numbersTimeoutDuration: option.value })}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Conundrum Timeout */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="conundrum-timeout" className="text-base">
              {t.conundrumRound || 'Conundrum Round'}: {t.timeoutDuration || 'Timeout'}
            </Label>
            <span className="font-display text-lg font-semibold text-accent">
              {formatDuration(settings.conundrumTimeoutDuration)}
            </span>
          </div>
          <div className="space-y-2">
            <Slider
              id="conundrum-timeout"
              min={30}
              max={300}
              step={30}
              value={[settings.conundrumTimeoutDuration]}
              onValueChange={(value) => updateSettings({ conundrumTimeoutDuration: value[0] })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30s</span>
              <span>5min</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 pt-2">
            {timeoutOptions.map((option) => (
              <Button
                key={`conundrum-${option.value}`}
                variant={settings.conundrumTimeoutDuration === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSettings({ conundrumTimeoutDuration: option.value })}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        {onClose && (
          <Button onClick={onClose} className="w-full game-button-primary">
            {t.close || 'Close'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

