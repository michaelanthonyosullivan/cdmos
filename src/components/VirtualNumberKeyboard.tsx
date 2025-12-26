interface VirtualNumberKeyboardProps {
  numbers: number[];
  onInsert: (value: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export const VirtualNumberKeyboard = ({ numbers, onInsert, onDelete, onClear }: VirtualNumberKeyboardProps) => {
  const operators = ['+', '-', '×', '÷', '(', ')'];

  return (
    <div className="w-full max-w-md space-y-3">
      {/* Available numbers */}
      <div className="flex flex-wrap justify-center gap-2">
        {numbers.map((num, index) => (
          <button
            key={index}
            onClick={() => onInsert(num.toString())}
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-secondary border border-border text-foreground font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {num}
          </button>
        ))}
      </div>
      
      {/* Operators */}
      <div className="flex flex-wrap justify-center gap-2">
        {operators.map((op) => (
          <button
            key={op}
            onClick={() => onInsert(op === '×' ? '*' : op === '÷' ? '/' : op)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-accent/20 border border-accent/50 text-accent font-bold text-xl hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {op}
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
