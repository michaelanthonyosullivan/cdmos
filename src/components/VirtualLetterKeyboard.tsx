interface VirtualLetterKeyboardProps {
  letters: string[];
  onInsert: (letter: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export const VirtualLetterKeyboard = ({ letters, onInsert, onDelete, onClear }: VirtualLetterKeyboardProps) => {
  return (
    <div className="w-full max-w-md space-y-3">
      {/* Available letters */}
      <div className="flex flex-wrap justify-center gap-2">
        {letters.map((letter, index) => (
          <button
            key={index}
            onClick={() => onInsert(letter)}
            className="w-11 h-12 md:w-12 md:h-14 rounded-lg bg-secondary border border-border text-foreground font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-colors uppercase"
          >
            {letter}
          </button>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-center gap-2">
        <button
          onClick={onDelete}
          className="px-4 h-10 rounded-lg bg-muted border border-border text-muted-foreground font-medium hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          ⌫
        </button>
        <button
          onClick={onClear}
          className="px-4 h-10 rounded-lg bg-muted border border-border text-muted-foreground font-medium hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
