export const insertAtCursor = (text: string, insert: string, cursor: number | null) => {
    const pos = cursor ?? text.length;
    const newText = text.slice(0, pos) + insert + text.slice(pos);
    const newCursor = pos + insert.length;
    return { newText, newCursor };
};

export const deleteAtCursor = (text: string, cursor: number | null) => {
    const pos = cursor ?? text.length;
    if (pos === 0) return { newText: text, newCursor: 0 };

    const newText = text.slice(0, pos - 1) + text.slice(pos);
    const newCursor = pos - 1;
    return { newText, newCursor };
};
