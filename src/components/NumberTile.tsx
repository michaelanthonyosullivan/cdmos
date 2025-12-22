interface NumberTileProps {
  number: number;
  isLarge?: boolean;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export const NumberTile = ({ 
  number, 
  isLarge = false,
  onClick, 
  selected = false,
  disabled = false 
}: NumberTileProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || selected}
      className={`number-tile ${isLarge ? 'large' : ''} ${selected ? 'opacity-50 scale-95' : 'hover:scale-105'}`}
    >
      {number}
    </button>
  );
};
