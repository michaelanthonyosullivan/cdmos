export interface HighScore {
  score: number;
  date: string;
  rounds: number;
}

const HIGH_SCORES_KEY = 'countdown_high_scores';
const MAX_SCORES = 10;

export const getHighScores = (): HighScore[] => {
  try {
    const stored = localStorage.getItem(HIGH_SCORES_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveHighScore = (score: number, rounds: number): { isHighScore: boolean; rank: number } => {
  const scores = getHighScores();
  
  const newScore: HighScore = {
    score,
    date: new Date().toLocaleDateString(),
    rounds,
  };

  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score);
  
  const rank = scores.findIndex(s => s === newScore) + 1;
  const isHighScore = rank <= MAX_SCORES;

  // Keep only top scores
  const topScores = scores.slice(0, MAX_SCORES);
  localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(topScores));

  return { isHighScore, rank };
};

export const clearHighScores = (): void => {
  localStorage.removeItem(HIGH_SCORES_KEY);
};

export const isNewHighScore = (score: number): boolean => {
  const scores = getHighScores();
  if (scores.length < MAX_SCORES) return true;
  return score > scores[scores.length - 1].score;
};
