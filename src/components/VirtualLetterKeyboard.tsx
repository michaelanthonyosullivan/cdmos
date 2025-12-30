interface VirtualLetterKeyboardProps {
  letters: string[];
  usedLetters?: string[];
  onInsert: (letter: string) => void;
}

export const VirtualLetterKeyboard = ({ letters, usedLetters = [], onInsert }: VirtualLetterKeyboardProps) => {
  const isLetterUsed = (letter: string, index: number): boolean => {
    // Count how many times this letter appears before this index
    const occurrencesBefore = letters.slice(0, index).filter(l => l === letter).length;
    const usedCount = usedLetters.filter(l => l === letter).length;
    return usedCount > occurrencesBefore;
  };

  return (
    <div className="w-full max-w-md">
      {/* Available letters */}
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
        {letters.map((letter, index) => {
          const isUsed = isLetterUsed(letter, index);
          return (
            <button
              key={index}
              onClick={() => !isUsed && onInsert(letter)}
              disabled={isUsed}
              className={`w-10 h-11 md:w-11 md:h-12 lg:w-12 lg:h-14 rounded-lg border font-bold text-sm md:text-base lg:text-lg uppercase transition-colors ${
                isUsed
                  ? 'bg-muted border-muted text-muted-foreground opacity-50 cursor-not-allowed'
                  : 'bg-secondary border-border text-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};
