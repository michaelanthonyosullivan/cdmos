import { Delete } from "lucide-react";

interface VirtualNumberKeyboardProps {
  numbers: number[];
  usedNumbers?: number[];
  onInsert: (value: string) => void;
  onDelete: () => void;
}

export const VirtualNumberKeyboard = ({ numbers, usedNumbers = [], onInsert, onDelete }: VirtualNumberKeyboardProps) => {
  const operators = ['+', '-', '×', '÷', '(', ')'];

  const getNumberUsageCount = (num: number): number => {
    return usedNumbers.filter(n => n === num).length;
  };

  const getAvailableCount = (num: number): number => {
    return numbers.filter(n => n === num).length;
  };

  const isNumberUsed = (num: number, index: number): boolean => {
    // Count how many times this number appears before this index
    const occurrencesBefore = numbers.slice(0, index).filter(n => n === num).length;
    const usedCount = getNumberUsageCount(num);
    return usedCount > occurrencesBefore;
  };

  return (
    <div className="w-full max-w-md space-y-2 md:space-y-3">
      {/* Available numbers */}
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
        {numbers.map((num, index) => {
          const isUsed = isNumberUsed(num, index);
          return (
            <button
              key={index}
              onClick={() => !isUsed && onInsert(num.toString())}
              disabled={isUsed}
              className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg border font-bold text-sm md:text-base lg:text-lg transition-colors ${isUsed
                  ? 'bg-muted border-muted text-muted-foreground opacity-50 cursor-not-allowed'
                  : 'bg-secondary border-border text-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* Operators */}
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
        {operators.map((op) => (
          <button
            key={op}
            onClick={() => onInsert(op === '×' ? '*' : op === '÷' ? '/' : op)}
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg bg-accent/20 border border-accent/50 text-accent font-bold text-base md:text-lg lg:text-xl hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {op}
          </button>
        ))}
        <button
          onClick={onDelete}
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg border bg-secondary border-border text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center"
          aria-label="Delete"
        >
          <Delete className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
      </div>
    </div>
  );
};
