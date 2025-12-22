interface LetterTileProps {
  letter: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  delay?: number;
}

export const LetterTile = ({ 
  letter, 
  onClick, 
  selected = false,
  disabled = false,
  delay = 0 
}: LetterTileProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || selected}
      className={`letter-tile animate-pop-in ${selected ? 'selected' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {letter}
    </button>
  );
};
