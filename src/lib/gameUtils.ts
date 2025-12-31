// Consonants with frequency distribution
const CONSONANTS = 'BBCCDDDDFFGGGHHJKLLLMMMNNNNNPPQRRRRRRSSSSTTTTTTVWXYZ'.split('');

// Vowels with frequency distribution
const VOWELS = 'AAAAAAAAAEEEEEEEEEEEEIIIIIIIIIOOOOOOOOUUUU'.split('');

// Large numbers for Numbers round
const LARGE_NUMBERS = [25, 50, 75, 100];

// Small numbers (1-10, each appears twice)
const SMALL_NUMBERS = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];

export const getRandomConsonant = (): string => {
  return CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
};

export const getRandomVowel = (): string => {
  return VOWELS[Math.floor(Math.random() * VOWELS.length)];
};

export const generateTarget = (): number => {
  return Math.floor(Math.random() * 900) + 100; // 100-999
};

export const pickNumbers = (largeCount: number): number[] => {
  const shuffledLarge = [...LARGE_NUMBERS].sort(() => Math.random() - 0.5);
  const shuffledSmall = [...SMALL_NUMBERS].sort(() => Math.random() - 0.5);

  const largeNums = shuffledLarge.slice(0, largeCount);
  const smallNums = shuffledSmall.slice(0, 6 - largeCount);

  return [...largeNums, ...smallNums].sort(() => Math.random() - 0.5);
};

// Check word validity using local dictionary
export const isValidWord = async (word: string, language: 'en' | 'fr' = 'en'): Promise<boolean> => {
  const lowerWord = word.toLowerCase();

  if (language === 'en') {
    // English validation - use local English dictionary
    const { ENGLISH_WORDS } = await import('./englishWords');
    if (ENGLISH_WORDS.has(lowerWord)) {
      return true;
    }
    // Fallback to API if not found locally (optional, but good for very rare words)
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lowerWord}`);
      return response.ok;
    } catch {
      return false;
    }

  } else {
    // French validation - use local French dictionary
    const { FRENCH_WORDS } = await import('./frenchWords');

    // Check exact match
    if (FRENCH_WORDS.has(lowerWord)) {
      return true;
    }

    // Also check without accents for common words
    const withoutAccents = lowerWord
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c');

    if (withoutAccents !== lowerWord && FRENCH_WORDS.has(withoutAccents)) {
      return true;
    }

    // Try French dictionary API as fallback
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/fr/${lowerWord}`);
      if (response.ok) {
        return true;
      }
      // Also try without accents
      if (withoutAccents !== lowerWord) {
        const responseNoAccents = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/fr/${withoutAccents}`);
        return responseNoAccents.ok;
      }
      return false;
    } catch {
      return false;
    }
  }
};

export const canFormWord = (word: string, availableLetters: string[]): boolean => {
  const letterCount: { [key: string]: number } = {};

  availableLetters.forEach(letter => {
    const l = letter.toUpperCase();
    letterCount[l] = (letterCount[l] || 0) + 1;
  });

  for (const char of word.toUpperCase()) {
    if (!letterCount[char] || letterCount[char] === 0) {
      return false;
    }
    letterCount[char]--;
  }

  return true;
};

export const calculateWordScore = (word: string): number => {
  return word.length;
};

// Find the longest valid word that can be formed from available letters
export const findLongestWord = async (availableLetters: string[], language: 'en' | 'fr' = 'en'): Promise<string | null> => {
  if (language === 'en') {
    // English: use local dictionary
    const { ENGLISH_WORDS } = await import('./englishWords');
    const sortedWords = Array.from(ENGLISH_WORDS).sort((a, b) => b.length - a.length);

    for (const word of sortedWords) {
      if (canFormWord(word, availableLetters)) {
        return word.toUpperCase();
      }
    }

    return null;
  } else {
    // French: use local dictionary
    const { FRENCH_WORDS } = await import('./frenchWords');
    const sortedWords = Array.from(FRENCH_WORDS).sort((a, b) => b.length - a.length);

    for (const word of sortedWords) {
      if (canFormWord(word, availableLetters)) {
        return word.toUpperCase();
      }
    }

    return null;
  }
};

