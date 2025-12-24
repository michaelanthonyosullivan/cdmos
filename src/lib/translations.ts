export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // App title
    title: 'COUNT',
    titleSuffix: 'DOWN',
    tagline: 'The classic word and numbers game',
    
    // How to play
    howToPlay: 'How to Play',
    lettersRoundDesc: 'Pick 9 letters (vowels and consonants), then make the longest word you can in 30 seconds.',
    numbersRoundDesc: 'Pick 6 numbers, then use arithmetic to reach the target number.',
    
    // Buttons
    startGame: 'Start Game',
    playAgain: 'Play Again',
    continue: 'Continue',
    submitWord: 'Submit Word',
    submitAnswer: 'Submit Answer',
    checking: 'Checking...',
    startConundrum: 'Start Conundrum',
    seeFinalScore: 'See Final Score',
    
    // Letters round
    lettersRound: 'Letters Round',
    consonant: 'Consonant',
    vowel: 'Vowel',
    pickMoreLetters: (n: number) => `Pick ${n} more letters`,
    makeLongestWord: 'Make the longest word you can!',
    roundComplete: 'Round Complete',
    typeYourWord: 'Type your word...',
    yourWord: 'Your word:',
    noWordSubmitted: 'No word submitted',
    pointsEarned: 'Points earned:',
    onlyUseAvailableLetters: 'You can only use the available letters!',
    notValidWord: "That's not a valid word!",
    greatWord: (points: number) => `Great word! +${points} points`,
    needMinVowels: 'You need at least 3 vowels!',
    needMinConsonants: 'You need at least 4 consonants!',
    
    // Numbers round
    numbersRound: 'Numbers Round',
    large: 'Large',
    small: 'Small',
    pickMoreNumbers: (n: number) => `Pick ${n} more numbers`,
    getCloseToTarget: 'Get as close to the target as you can!',
    target: 'Target',
    yourCalculation: 'Your calculation:',
    noAnswerSubmitted: 'No answer submitted',
    inputPlaceholder: 'e.g. [100 + 25] x 4',
    inputHint: 'Use +, -, *, / or x. Use [] or () for brackets.',
    maxLargeNumbers: 'Maximum 4 large numbers!',
    onlyUseAvailableNumbers: 'You can only use the available numbers, each once!',
    invalidExpression: 'Invalid expression!',
    exactAnswer: 'Exact answer! +10 points',
    within5: (result: number) => `Within 5! (${result}) +7 points`,
    within10: (result: number) => `Within 10! (${result}) +5 points`,
    tooFarFromTarget: (result: number) => `Result: ${result} - Too far from target`,
    onePossibleSolution: 'One possible solution:',
    invalid: 'Invalid',
    
    // Conundrum
    conundrum: 'CONUNDRUM',
    unscrambleWord: 'Unscramble the 9-letter word!',
    findHiddenWord: 'Find the hidden word!',
    conundrumSolved: 'Conundrum Solved!',
    timesUp: "Time's Up!",
    typeYourAnswer: 'Type your answer...',
    youGotIt: 'You got it!',
    answerWas: 'The answer was:',
    brilliantSolved: 'Brilliant! You solved the Conundrum! +10 points',
    notQuiteTryAgain: 'Not quite! Try again...',
    
    // Game over
    gameOver: 'Game Over',
    finalScore: 'Final Score',
    outstanding: "Outstanding! You're a Countdown champion!",
    greatPerformance: 'Great performance!',
    goodEffort: 'Good effort!',
    keepPracticing: 'Keep practicing!',
    
    // High scores
    highScores: 'High Scores',
    clearHighScores: 'Clear high scores',
    newHighScore: (rank: number) => `🎉 New High Score! Rank #${rank}`,
    noHighScoresYet: 'No high scores yet. Play a game!',
    highScoresCleared: 'High scores cleared',
    pts: 'pts',
    
    // Header
    round: 'Round',
    score: 'Score',
    
    // Footer
    footer: "Inspired by the classic TV show - reimagined by Michael O'Sullivan",
    
    // Language
    language: 'Language',
    english: 'English',
    french: 'Français',
  },
  fr: {
    // App title
    title: 'DES CHIFFRES',
    titleSuffix: 'ET DES LETTRES',
    tagline: 'Le jeu classique de mots et de chiffres',
    
    // How to play
    howToPlay: 'Comment jouer',
    lettersRoundDesc: 'Choisissez 9 lettres (voyelles et consonnes), puis formez le mot le plus long en 30 secondes.',
    numbersRoundDesc: 'Choisissez 6 nombres, puis utilisez les opérations pour atteindre le nombre cible.',
    
    // Buttons
    startGame: 'Commencer',
    playAgain: 'Rejouer',
    continue: 'Continuer',
    submitWord: 'Valider le mot',
    submitAnswer: 'Valider',
    checking: 'Vérification...',
    startConundrum: 'Commencer le défi',
    seeFinalScore: 'Voir le score final',
    
    // Letters round
    lettersRound: 'Manche des lettres',
    consonant: 'Consonne',
    vowel: 'Voyelle',
    pickMoreLetters: (n: number) => `Choisissez ${n} lettres de plus`,
    makeLongestWord: 'Formez le mot le plus long possible !',
    roundComplete: 'Manche terminée',
    typeYourWord: 'Tapez votre mot...',
    yourWord: 'Votre mot :',
    noWordSubmitted: 'Aucun mot soumis',
    pointsEarned: 'Points gagnés :',
    onlyUseAvailableLetters: 'Vous ne pouvez utiliser que les lettres disponibles !',
    notValidWord: "Ce n'est pas un mot valide !",
    greatWord: (points: number) => `Excellent mot ! +${points} points`,
    needMinVowels: "Vous avez besoin d'au moins 3 voyelles !",
    needMinConsonants: "Vous avez besoin d'au moins 4 consonnes !",
    
    // Numbers round
    numbersRound: 'Manche des chiffres',
    large: 'Grand',
    small: 'Petit',
    pickMoreNumbers: (n: number) => `Choisissez ${n} nombres de plus`,
    getCloseToTarget: 'Approchez-vous le plus possible de la cible !',
    target: 'Cible',
    yourCalculation: 'Votre calcul :',
    noAnswerSubmitted: 'Aucune réponse soumise',
    inputPlaceholder: 'ex. [100 + 25] x 4',
    inputHint: 'Utilisez +, -, *, / ou x. Utilisez [] ou () pour les parenthèses.',
    maxLargeNumbers: 'Maximum 4 grands nombres !',
    onlyUseAvailableNumbers: 'Vous ne pouvez utiliser que les nombres disponibles, une seule fois chacun !',
    invalidExpression: 'Expression invalide !',
    exactAnswer: 'Réponse exacte ! +10 points',
    within5: (result: number) => `À 5 près ! (${result}) +7 points`,
    within10: (result: number) => `À 10 près ! (${result}) +5 points`,
    tooFarFromTarget: (result: number) => `Résultat : ${result} - Trop loin de la cible`,
    onePossibleSolution: 'Une solution possible :',
    invalid: 'Invalide',
    
    // Conundrum
    conundrum: 'ÉNIGME',
    unscrambleWord: 'Trouvez le mot de 9 lettres !',
    findHiddenWord: 'Trouvez le mot caché !',
    conundrumSolved: 'Énigme résolue !',
    timesUp: 'Temps écoulé !',
    typeYourAnswer: 'Tapez votre réponse...',
    youGotIt: "Vous l'avez trouvé !",
    answerWas: 'La réponse était :',
    brilliantSolved: "Brillant ! Vous avez résolu l'énigme ! +10 points",
    notQuiteTryAgain: 'Pas tout à fait ! Réessayez...',
    
    // Game over
    gameOver: 'Fin de partie',
    finalScore: 'Score final',
    outstanding: 'Extraordinaire ! Vous êtes un champion !',
    greatPerformance: 'Excellente performance !',
    goodEffort: 'Bon effort !',
    keepPracticing: 'Continuez à vous entraîner !',
    
    // High scores
    highScores: 'Meilleurs scores',
    clearHighScores: 'Effacer les scores',
    newHighScore: (rank: number) => `🎉 Nouveau record ! Rang #${rank}`,
    noHighScoresYet: 'Pas encore de scores. Jouez une partie !',
    highScoresCleared: 'Scores effacés',
    pts: 'pts',
    
    // Header
    round: 'Manche',
    score: 'Score',
    
    // Footer
    footer: "Inspiré de l'émission télévisée classique - réimaginé par Michael O'Sullivan",
    
    // Language
    language: 'Langue',
    english: 'English',
    french: 'Français',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
