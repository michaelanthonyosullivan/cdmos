import { forwardRef } from 'react';

interface NumberTileProps {
  number: number;
  isLarge?: boolean;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export const NumberTile = forwardRef<HTMLButtonElement, NumberTileProps>(({ 
  number, 
  isLarge = false,
  onClick, 
  selected = false,
  disabled = false 
}, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled || selected}
      className={`number-tile ${isLarge ? 'large' : ''} ${selected ? 'opacity-50 scale-95' : 'hover:scale-105'}`}
    >
      {number}
    </button>
  );
});

NumberTile.displayName = 'NumberTile';