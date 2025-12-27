interface VirtualLetterKeyboardProps {
  letters: string[];
  onInsert: (letter: string) => void;
}

export const VirtualLetterKeyboard = ({ letters, onInsert }: VirtualLetterKeyboardProps) => {
  return (
    <div className="w-full max-w-md">
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
    </div>
  );
};
