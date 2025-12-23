interface LetterTileProps {
  letter: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  delay?: number;
  isConundrum?: boolean;
}

export const LetterTile = ({ 
  letter, 
  onClick, 
  selected = false,
  disabled = false,
  delay = 0,
  isConundrum = false
}: LetterTileProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || selected}
      className={`letter-tile animate-pop-in ${selected ? 'selected' : ''} ${isConundrum ? 'conundrum' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {letter}
    </button>
  );
};
