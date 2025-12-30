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

// Common English words list (simplified - in production you'd use a full dictionary API)
const COMMON_WORDS = new Set([
  // 2 letters
  'an', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'if', 'in', 'is', 'it', 'me', 'my', 'no', 'of', 'on', 'or', 'so', 'to', 'up', 'us', 'we',
  // 3 letters
  'ace', 'act', 'add', 'age', 'ago', 'aid', 'aim', 'air', 'all', 'and', 'ant', 'any', 'ape', 'arc', 'are', 'ark', 'arm', 'art', 'ask', 'ate', 'bad', 'bag', 'ban', 'bar', 'bat', 'bay', 'bed', 'bee', 'bet', 'bid', 'big', 'bin', 'bit', 'bow', 'box', 'boy', 'bud', 'bug', 'bus', 'but', 'buy', 'cab', 'can', 'cap', 'car', 'cat', 'cop', 'cow', 'cry', 'cub', 'cup', 'cut', 'dad', 'dam', 'day', 'den', 'dew', 'did', 'die', 'dig', 'dim', 'dip', 'dog', 'dot', 'dry', 'due', 'dug', 'dye', 'ear', 'eat', 'egg', 'end', 'era', 'eve', 'eye', 'fan', 'far', 'fat', 'fax', 'fed', 'fee', 'few', 'fig', 'fin', 'fit', 'fix', 'fly', 'foe', 'fog', 'for', 'fox', 'fry', 'fun', 'fur', 'gap', 'gas', 'gay', 'gel', 'gem', 'get', 'god', 'got', 'gum', 'gun', 'gut', 'guy', 'gym', 'had', 'ham', 'has', 'hat', 'hay', 'hen', 'her', 'hid', 'him', 'hip', 'his', 'hit', 'hog', 'hop', 'hot', 'how', 'hub', 'hug', 'hut', 'ice', 'icy', 'ill', 'ink', 'inn', 'ion', 'its', 'jam', 'jar', 'jaw', 'jet', 'job', 'jog', 'joy', 'jug', 'key', 'kid', 'kin', 'kit', 'lab', 'lad', 'lag', 'lap', 'law', 'lay', 'led', 'leg', 'let', 'lid', 'lie', 'lip', 'lit', 'log', 'lot', 'low', 'mad', 'man', 'map', 'mat', 'may', 'men', 'met', 'mid', 'mix', 'mob', 'mom', 'mop', 'mud', 'mug', 'nap', 'net', 'new', 'nil', 'nod', 'nor', 'not', 'now', 'nun', 'nut', 'oak', 'odd', 'off', 'oil', 'old', 'one', 'opt', 'orb', 'ore', 'our', 'out', 'owe', 'owl', 'own', 'pad', 'pan', 'pat', 'paw', 'pay', 'pea', 'pen', 'per', 'pet', 'pie', 'pig', 'pin', 'pit', 'pod', 'pop', 'pot', 'pro', 'pub', 'pun', 'pup', 'put', 'rag', 'ram', 'ran', 'rat', 'raw', 'ray', 'red', 'ref', 'rib', 'rid', 'rig', 'rim', 'rip', 'rob', 'rod', 'rot', 'row', 'rub', 'rug', 'run', 'rut', 'sad', 'sag', 'sat', 'saw', 'say', 'sea', 'set', 'sew', 'she', 'shy', 'sin', 'sip', 'sir', 'sis', 'sit', 'six', 'ski', 'sky', 'sly', 'sob', 'sod', 'son', 'sop', 'sow', 'spa', 'spy', 'sub', 'sue', 'sum', 'sun', 'tab', 'tag', 'tan', 'tap', 'tar', 'tax', 'tea', 'ten', 'the', 'thy', 'tie', 'tin', 'tip', 'toe', 'ton', 'too', 'top', 'tow', 'toy', 'try', 'tub', 'tug', 'two', 'urn', 'use', 'van', 'vat', 'vet', 'via', 'vie', 'vow', 'wad', 'war', 'was', 'wax', 'way', 'web', 'wed', 'wet', 'who', 'why', 'wig', 'win', 'wit', 'woe', 'wok', 'won', 'woo', 'wow', 'yam', 'yap', 'yaw', 'yes', 'yet', 'yew', 'you', 'zap', 'zed', 'zen', 'zip', 'zoo',
  // 4 letters
  'able', 'ache', 'acid', 'aged', 'also', 'area', 'army', 'away', 'baby', 'back', 'ball', 'band', 'bank', 'base', 'bath', 'bear', 'beat', 'been', 'beer', 'bell', 'belt', 'bend', 'bent', 'best', 'bill', 'bird', 'bite', 'blow', 'blue', 'boat', 'body', 'boil', 'bold', 'bomb', 'bond', 'bone', 'book', 'boom', 'born', 'boss', 'both', 'bowl', 'burn', 'bush', 'busy', 'call', 'calm', 'came', 'camp', 'card', 'care', 'case', 'cash', 'cast', 'cell', 'chat', 'chip', 'city', 'club', 'coal', 'coat', 'code', 'coin', 'cold', 'come', 'cook', 'cool', 'cope', 'copy', 'core', 'cost', 'crew', 'crop', 'dark', 'data', 'date', 'dawn', 'days', 'dead', 'deal', 'dear', 'debt', 'deep', 'deny', 'desk', 'diet', 'dire', 'dirt', 'does', 'done', 'door', 'dose', 'down', 'draw', 'drew', 'drop', 'drug', 'dual', 'duke', 'dust', 'duty', 'each', 'earn', 'ease', 'east', 'easy', 'edge', 'else', 'even', 'ever', 'evil', 'exam', 'exit', 'face', 'fact', 'fail', 'fair', 'fall', 'fame', 'farm', 'fast', 'fate', 'fear', 'feed', 'feel', 'feet', 'fell', 'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'firm', 'fish', 'five', 'flag', 'flat', 'fled', 'flew', 'flow', 'fold', 'folk', 'food', 'foot', 'ford', 'form', 'fort', 'four', 'free', 'from', 'fuel', 'full', 'fund', 'gain', 'game', 'gate', 'gave', 'gear', 'gene', 'gift', 'girl', 'give', 'glad', 'goal', 'goes', 'gold', 'gone', 'good', 'grab', 'gray', 'grew', 'grey', 'grow', 'gulf', 'hair', 'half', 'hall', 'hand', 'hang', 'hard', 'harm', 'hate', 'have', 'head', 'hear', 'heat', 'held', 'hell', 'help', 'here', 'hero', 'hide', 'high', 'hill', 'hire', 'hold', 'hole', 'holy', 'home', 'hope', 'host', 'hour', 'huge', 'hung', 'hunt', 'hurt', 'idea', 'inch', 'into', 'iron', 'item', 'jack', 'jane', 'jean', 'jobs', 'john', 'join', 'joke', 'jump', 'jury', 'just', 'keen', 'keep', 'kept', 'kick', 'kill', 'kind', 'king', 'knee', 'knew', 'know', 'lack', 'lady', 'laid', 'lake', 'land', 'lane', 'last', 'late', 'lead', 'left', 'lend', 'less', 'life', 'lift', 'like', 'line', 'link', 'list', 'live', 'load', 'loan', 'lock', 'long', 'look', 'lord', 'lose', 'loss', 'lost', 'love', 'luck', 'made', 'mail', 'main', 'make', 'male', 'many', 'mark', 'mass', 'mate', 'meal', 'mean', 'meat', 'meet', 'mere', 'mile', 'milk', 'mind', 'mine', 'miss', 'mode', 'mood', 'moon', 'more', 'most', 'move', 'much', 'must', 'name', 'near', 'neck', 'need', 'news', 'next', 'nice', 'nick', 'nine', 'none', 'nose', 'note', 'okay', 'once', 'only', 'onto', 'open', 'oral', 'over', 'pace', 'pack', 'page', 'paid', 'pain', 'pair', 'pale', 'palm', 'park', 'part', 'pass', 'past', 'path', 'peak', 'pick', 'pine', 'pink', 'pipe', 'plan', 'play', 'plot', 'plug', 'plus', 'poem', 'poet', 'pole', 'poll', 'pond', 'pool', 'poor', 'pope', 'port', 'pose', 'post', 'pour', 'pray', 'pull', 'pure', 'push', 'race', 'rail', 'rain', 'rank', 'rare', 'rate', 'read', 'real', 'rear', 'rely', 'rent', 'rest', 'rice', 'rich', 'ride', 'ring', 'rise', 'risk', 'road', 'rock', 'rode', 'role', 'roll', 'roof', 'room', 'root', 'rose', 'rule', 'rush', 'safe', 'said', 'sail', 'sake', 'sale', 'salt', 'same', 'sand', 'sang', 'save', 'seat', 'seed', 'seek', 'seem', 'seen', 'self', 'sell', 'send', 'sent', 'ship', 'shop', 'shot', 'show', 'shut', 'sick', 'side', 'sign', 'site', 'size', 'skin', 'slip', 'slow', 'snow', 'soft', 'soil', 'sold', 'sole', 'some', 'song', 'soon', 'sort', 'soul', 'spot', 'star', 'stay', 'stem', 'step', 'stop', 'such', 'suit', 'sure', 'swim', 'tail', 'take', 'tale', 'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tear', 'tell', 'tend', 'term', 'test', 'text', 'than', 'that', 'them', 'then', 'they', 'thin', 'this', 'thus', 'till', 'time', 'tiny', 'told', 'tone', 'took', 'tool', 'tour', 'town', 'trap', 'tree', 'trip', 'true', 'tube', 'tune', 'turn', 'twin', 'type', 'unit', 'upon', 'used', 'user', 'vary', 'vast', 'very', 'vice', 'view', 'vote', 'wage', 'wait', 'wake', 'walk', 'wall', 'want', 'warm', 'warn', 'wash', 'wave', 'ways', 'weak', 'wear', 'week', 'well', 'went', 'were', 'west', 'what', 'when', 'whom', 'wide', 'wife', 'wild', 'will', 'wind', 'wine', 'wing', 'wire', 'wise', 'wish', 'with', 'woke', 'wood', 'word', 'wore', 'work', 'worn', 'wrap', 'yard', 'yeah', 'year', 'your', 'zero', 'zone',
  // 5 letters
  'about', 'above', 'abuse', 'actor', 'acute', 'admit', 'adopt', 'adult', 'after', 'again', 'agent', 'agree', 'ahead', 'alarm', 'album', 'alien', 'alike', 'alive', 'allow', 'alone', 'along', 'alter', 'among', 'anger', 'angle', 'angry', 'apart', 'apple', 'apply', 'arena', 'argue', 'arise', 'armed', 'armor', 'array', 'aside', 'asset', 'avoid', 'award', 'aware', 'awful', 'basic', 'basis', 'beach', 'began', 'begin', 'being', 'belly', 'below', 'bench', 'birth', 'black', 'blade', 'blame', 'blank', 'blast', 'blend', 'bless', 'blind', 'block', 'blood', 'blown', 'blues', 'board', 'bonus', 'boost', 'booth', 'bound', 'brain', 'brand', 'brave', 'bread', 'break', 'breed', 'brick', 'bride', 'brief', 'bring', 'broad', 'broke', 'brown', 'brush', 'build', 'bunch', 'burst', 'buyer', 'cabin', 'cable', 'candy', 'carry', 'catch', 'cause', 'chain', 'chair', 'chaos', 'charm', 'chart', 'chase', 'cheap', 'check', 'chest', 'chief', 'child', 'china', 'chose', 'chunk', 'civic', 'civil', 'claim', 'class', 'clean', 'clear', 'click', 'cliff', 'climb', 'clock', 'close', 'cloth', 'cloud', 'coach', 'coast', 'color', 'couch', 'could', 'count', 'court', 'cover', 'crack', 'craft', 'crash', 'crazy', 'cream', 'crime', 'cross', 'crowd', 'crown', 'crude', 'crush', 'curve', 'cycle', 'daily', 'dance', 'dated', 'dealt', 'death', 'debut', 'delay', 'depth', 'devil', 'dirty', 'doing', 'doubt', 'dozen', 'draft', 'drain', 'drama', 'drank', 'drawn', 'dream', 'dress', 'dried', 'drink', 'drive', 'drops', 'drove', 'drugs', 'drunk', 'dying', 'eager', 'early', 'earth', 'eaten', 'edge', 'eight', 'elder', 'elect', 'elite', 'email', 'empty', 'enemy', 'enjoy', 'enter', 'entry', 'equal', 'error', 'essay', 'event', 'every', 'exact', 'exist', 'extra', 'faced', 'faith', 'false', 'fancy', 'fatal', 'fault', 'favor', 'feast', 'fence', 'ferry', 'fewer', 'fiber', 'field', 'fifth', 'fifty', 'fight', 'filed', 'final', 'first', 'fixed', 'flame', 'flash', 'fleet', 'flesh', 'float', 'flood', 'floor', 'flour', 'fluid', 'focus', 'force', 'forge', 'forth', 'forty', 'forum', 'found', 'frame', 'frank', 'fraud', 'fresh', 'front', 'frost', 'fruit', 'fully', 'funny', 'ghost', 'giant', 'given', 'glass', 'globe', 'glory', 'glove', 'going', 'grace', 'grade', 'grain', 'grand', 'grant', 'grape', 'grasp', 'grass', 'grave', 'great', 'green', 'greet', 'grief', 'grill', 'gross', 'group', 'grown', 'guard', 'guess', 'guest', 'guide', 'guilt', 'happy', 'harsh', 'heard', 'heart', 'heavy', 'hence', 'henry', 'horse', 'hotel', 'house', 'human', 'humor', 'ideal', 'image', 'imply', 'index', 'inner', 'input', 'issue', 'joint', 'jones', 'judge', 'juice', 'known', 'label', 'labor', 'large', 'laser', 'later', 'laugh', 'layer', 'learn', 'lease', 'least', 'leave', 'legal', 'lemon', 'level', 'light', 'limit', 'lives', 'local', 'logic', 'loose', 'lorry', 'lover', 'lower', 'loyal', 'lucky', 'lunch', 'lying', 'magic', 'major', 'maker', 'manor', 'maple', 'march', 'marry', 'match', 'maybe', 'mayor', 'meant', 'medal', 'media', 'meets', 'mercy', 'merge', 'merit', 'merry', 'metal', 'meter', 'midst', 'might', 'minor', 'mixed', 'model', 'money', 'month', 'moral', 'motor', 'mount', 'mouse', 'mouth', 'movie', 'music', 'named', 'nasty', 'naval', 'nerve', 'never', 'newly', 'night', 'ninth', 'noble', 'noise', 'north', 'noted', 'novel', 'nurse', 'occur', 'ocean', 'offer', 'often', 'olive', 'one', 'onset', 'opera', 'orbit', 'order', 'organ', 'other', 'ought', 'outer', 'owned', 'owner', 'paint', 'panel', 'panic', 'paper', 'party', 'pasta', 'patch', 'pause', 'peace', 'pearl', 'penny', 'phase', 'phone', 'photo', 'piano', 'piece', 'pilot', 'pitch', 'pizza', 'place', 'plain', 'plane', 'plant', 'plate', 'plays', 'plaza', 'point', 'polar', 'police', 'pond', 'pound', 'power', 'press', 'price', 'pride', 'prime', 'print', 'prior', 'prize', 'probe', 'prone', 'proof', 'proud', 'prove', 'punch', 'pupil', 'queen', 'quest', 'quick', 'quiet', 'quite', 'quote', 'radar', 'radio', 'raise', 'rally', 'ranch', 'range', 'rapid', 'ratio', 'reach', 'react', 'ready', 'realm', 'rebel', 'refer', 'reign', 'relax', 'reply', 'rider', 'ridge', 'rifle', 'right', 'risky', 'rival', 'river', 'robin', 'robot', 'rocky', 'roman', 'rough', 'round', 'route', 'royal', 'ruled', 'ruler', 'rumor', 'rural', 'sadly', 'saint', 'salad', 'sales', 'sandy', 'sauce', 'saved', 'scale', 'scene', 'scope', 'score', 'scout', 'sedan', 'sense', 'serve', 'setup', 'seven', 'shade', 'shake', 'shall', 'shame', 'shape', 'share', 'shark', 'sharp', 'sheep', 'sheer', 'sheet', 'shelf', 'shell', 'shift', 'shine', 'shirt', 'shock', 'shoot', 'shore', 'short', 'shown', 'sided', 'sight', 'silly', 'simon', 'since', 'sixth', 'sixty', 'sized', 'skill', 'slave', 'sleep', 'slice', 'slide', 'slope', 'small', 'smart', 'smell', 'smile', 'smith', 'smoke', 'snake', 'solid', 'solve', 'sorry', 'sound', 'south', 'space', 'spare', 'spark', 'speak', 'speed', 'spend', 'spent', 'spill', 'spine', 'split', 'spoke', 'sport', 'spray', 'squad', 'stack', 'staff', 'stage', 'stair', 'stake', 'stamp', 'stand', 'stare', 'start', 'state', 'stays', 'steal', 'steam', 'steel', 'steep', 'stick', 'still', 'stock', 'stone', 'stood', 'store', 'storm', 'story', 'strap', 'straw', 'strip', 'stuck', 'study', 'stuff', 'style', 'sugar', 'suite', 'sunny', 'super', 'surge', 'sweet', 'swing', 'sword', 'table', 'taken', 'taste', 'taxes', 'teach', 'teeth', 'tempt', 'terms', 'texas', 'thank', 'theft', 'their', 'theme', 'there', 'these', 'thick', 'thing', 'think', 'third', 'those', 'three', 'threw', 'throw', 'thumb', 'tiger', 'tight', 'tired', 'title', 'toast', 'today', 'token', 'topic', 'total', 'touch', 'tough', 'tower', 'trace', 'track', 'trade', 'trail', 'train', 'trash', 'treat', 'trend', 'trial', 'tribe', 'trick', 'tried', 'truck', 'truly', 'trunk', 'trust', 'truth', 'tumor', 'twice', 'twist', 'under', 'union', 'unity', 'until', 'upper', 'upset', 'urban', 'usual', 'valid', 'value', 'venue', 'video', 'virus', 'visit', 'vital', 'vocal', 'voice', 'voter', 'wagon', 'waste', 'watch', 'water', 'weigh', 'weird', 'whale', 'wheat', 'wheel', 'where', 'which', 'while', 'white', 'whole', 'whose', 'width', 'woman', 'world', 'worry', 'worse', 'worst', 'worth', 'would', 'wound', 'write', 'wrong', 'wrote', 'yield', 'young', 'youth',
  // 6+ letters
  'abstract', 'achieve', 'action', 'active', 'actual', 'address', 'advance', 'advice', 'affair', 'affect', 'afford', 'agency', 'agenda', 'almost', 'always', 'amount', 'animal', 'annual', 'answer', 'anyone', 'anyway', 'appeal', 'appear', 'around', 'arrive', 'artist', 'aspect', 'assess', 'assume', 'attack', 'attend', 'author', 'battle', 'beauty', 'became', 'become', 'before', 'behalf', 'behind', 'belief', 'belong', 'beside', 'better', 'beyond', 'border', 'boring', 'bottle', 'bottom', 'bought', 'branch', 'bridge', 'bright', 'broken', 'budget', 'burden', 'button', 'camera', 'cancer', 'cannot', 'carbon', 'career', 'castle', 'center', 'centre', 'chance', 'change', 'charge', 'choice', 'choose', 'church', 'circle', 'client', 'closed', 'coffee', 'column', 'combat', 'comedy', 'coming', 'commit', 'common', 'comply', 'copper', 'corner', 'cotton', 'couple', 'course', 'cousin', 'create', 'credit', 'crisis', 'custom', 'damage', 'danger', 'debate', 'decade', 'decide', 'defend', 'define', 'degree', 'demand', 'depend', 'deputy', 'desert', 'design', 'desire', 'detail', 'detect', 'device', 'differ', 'dinner', 'direct', 'doctor', 'domain', 'double', 'driver', 'during', 'easily', 'eating', 'editor', 'effect', 'effort', 'eighth', 'either', 'eleven', 'emerge', 'empire', 'employ', 'enable', 'ending', 'energy', 'engage', 'engine', 'enough', 'ensure', 'entire', 'entity', 'escape', 'estate', 'ethnic', 'evolve', 'exceed', 'except', 'expand', 'expect', 'expert', 'export', 'extend', 'extent', 'fabric', 'facing', 'factor', 'fairly', 'fallen', 'family', 'famous', 'farmer', 'father', 'fellow', 'female', 'figure', 'filing', 'finger', 'finish', 'fiscal', 'flight', 'flower', 'flying', 'follow', 'forces', 'forest', 'forget', 'formal', 'format', 'former', 'foster', 'fourth', 'friend', 'frozen', 'future', 'galaxy', 'garden', 'gather', 'gender', 'gentle', 'German', 'global', 'golden', 'govern', 'ground', 'growth', 'guitar', 'handle', 'happen', 'hardly', 'headed', 'health', 'heaven', 'height', 'hidden', 'higher', 'highly', 'holder', 'honest', 'horror', 'hosted', 'hungry', 'hunter', 'ignore', 'impact', 'import', 'impose', 'income', 'indeed', 'Indian', 'inform', 'injury', 'inside', 'intend', 'intent', 'invest', 'invite', 'island', 'itself', 'jacket', 'jersey', 'Joseph', 'junior', 'killer', 'knight', 'launch', 'lawyer', 'leader', 'league', 'legacy', 'legend', 'length', 'lesson', 'letter', 'lights', 'likely', 'linear', 'listen', 'little', 'living', 'losing', 'lovely', 'luxury', 'mainly', 'making', 'manage', 'manner', 'manual', 'margin', 'marine', 'marked', 'market', 'Martin', 'master', 'matter', 'mature', 'medium', 'member', 'memory', 'mental', 'merely', 'merger', 'method', 'middle', 'Miller', 'mining', 'minute', 'mirror', 'mobile', 'modern', 'modest', 'module', 'moment', 'monkey', 'months', 'mostly', 'mother', 'motion', 'moving', 'murder', 'muscle', 'museum', 'myself', 'narrow', 'nation', 'native', 'nature', 'nearby', 'nearly', 'needle', 'Nelson', 'neural', 'nights', 'nobody', 'normal', 'notice', 'notion', 'number', 'object', 'obtain', 'occupy', 'office', 'offset', 'online', 'option', 'orange', 'origin', 'others', 'output', 'Oxford', 'pacing', 'palace', 'parent', 'partly', 'patent', 'people', 'period', 'permit', 'person', 'phrase', 'picked', 'planet', 'player', 'please', 'plenty', 'pocket', 'poetry', 'police', 'policy', 'poster', 'potato', 'powder', 'prayer', 'prefer', 'pretty', 'prince', 'prison', 'profit', 'proper', 'proven', 'public', 'pursue', 'racial', 'random', 'rarely', 'rather', 'rating', 'reader', 'really', 'reason', 'recall', 'recent', 'record', 'reduce', 'reform', 'refuse', 'regard', 'region', 'relate', 'relief', 'remain', 'remote', 'remove', 'rental', 'repair', 'repeat', 'report', 'rescue', 'resort', 'result', 'retail', 'retain', 'retire', 'return', 'reveal', 'review', 'reward', 'riding', 'rising', 'robust', 'roster', 'ruling', 'runner', 'sacred', 'safety', 'salary', 'sample', 'saving', 'saying', 'scheme', 'school', 'screen', 'search', 'season', 'second', 'secret', 'sector', 'secure', 'seeing', 'select', 'seller', 'senior', 'series', 'server', 'settle', 'severe', 'shaped', 'shared', 'sheets', 'shield', 'should', 'shower', 'signal', 'signed', 'silent', 'silver', 'simple', 'simply', 'single', 'sister', 'slight', 'smooth', 'soccer', 'social', 'solely', 'solid', 'sought', 'source', 'Soviet', 'speech', 'spirit', 'spoken', 'spread', 'spring', 'square', 'stable', 'status', 'steady', 'stolen', 'strain', 'strand', 'stream', 'street', 'stress', 'strict', 'strike', 'string', 'strong', 'struck', 'Stuart', 'studio', 'submit', 'subtle', 'sudden', 'suffer', 'summer', 'summit', 'supply', 'surely', 'survey', 'switch', 'symbol', 'system', 'tackle', 'talent', 'target', 'taught', 'temple', 'tenant', 'tender', 'tennis', 'thanks', 'theory', 'thirty', 'Thomas', 'though', 'threat', 'throat', 'thrown', 'ticket', 'timber', 'timing', 'tissue', 'tobacco', 'tongue', 'toward', 'travel', 'treaty', 'tribal', 'troops', 'trying', 'tunnel', 'turkey', 'turned', 'twelve', 'twenty', 'unable', 'unique', 'united', 'unless', 'unlike', 'update', 'useful', 'valley', 'varied', 'vendor', 'verbal', 'versus', 'victim', 'viewer', 'vision', 'visual', 'volume', 'voting', 'walker', 'wealth', 'weekly', 'weight', 'whilst', 'widely', 'window', 'winner', 'winter', 'within', 'wonder', 'wooden', 'worker', 'worthy', 'Wright', 'writer', 'yellow',
  // 7+ letters
  'abandon', 'ability', 'absence', 'academy', 'account', 'achieve', 'acquire', 'address', 'advance', 'adverse', 'advisor', 'against', 'airline', 'airport', 'alcohol', 'alleged', 'already', 'analyst', 'ancient', 'another', 'anxiety', 'anybody', 'anymore', 'anywhere', 'apparent', 'applied', 'approve', 'arrange', 'arrival', 'article', 'assault', 'attempt', 'attract', 'auction', 'average', 'backing', 'balance', 'banking', 'barrier', 'battery', 'bearing', 'beating', 'because', 'bedroom', 'believe', 'beneath', 'benefit', 'besides', 'biggest', 'billion', 'binding', 'blocked', 'brother', 'brought', 'burning', 'cabinet', 'capable', 'capital', 'captain', 'capture', 'careful', 'carrier', 'catalog', 'ceiling', 'central', 'century', 'certain', 'chamber', 'channel', 'chapter', 'charity', 'charter', 'chicken', 'chronic', 'circuit', 'citizen', 'classic', 'climate', 'clothes', 'cluster', 'coastal', 'collapse', 'collect', 'college', 'command', 'comment', 'comfort', 'compact', 'company', 'compare', 'compete', 'complex', 'concept', 'concern', 'concert', 'conduct', 'confirm', 'connect', 'consent', 'consist', 'consult', 'contact', 'contain', 'content', 'contest', 'context', 'control', 'convert', 'cooking', 'correct', 'council', 'counter', 'country', 'courage', 'covered', 'creator', 'crucial', 'culture', 'curious', 'current', 'cutting', 'dealing', 'declare', 'decline', 'default', 'defence', 'defense', 'deficit', 'deliver', 'density', 'deposit', 'deserve', 'destroy', 'develop', 'diamond', 'dietary', 'digital', 'diploma', 'disease', 'dispute', 'distant', 'diverse', 'divided', 'divorce', 'doctors', 'dollars', 'donated', 'drawing', 'dropped', 'drought', 'dynamic', 'earning', 'eastern', 'economy', 'edition', 'elderly', 'element', 'embrace', 'emperor', 'enables', 'endless', 'engaged', 'enhance', 'entitled', 'episode', 'equally', 'essence', 'evening', 'evident', 'exactly', 'examine', 'example', 'exclude', 'execute', 'exhibit', 'expense', 'explain', 'explore', 'express', 'extreme', 'factory', 'failure', 'fashion', 'fathers', 'fatigue', 'feature', 'federal', 'feeling', 'fiction', 'fifteen', 'fighter', 'finally', 'finding', 'fishing', 'fitting', 'focused', 'foreign', 'forever', 'formula', 'fortune', 'forward', 'founder', 'freedom', 'freight', 'friends', 'further', 'gallery', 'gateway', 'general', 'genetic', 'genuine', 'getting', 'glasses', 'globals', 'goddess', 'goodbye', 'granted', 'graphic', 'greater', 'greatly', 'growing', 'habitat', 'handful', 'hanging', 'harmony', 'heading', 'healing', 'healthy', 'hearing', 'heating', 'heavily', 'helpful', 'herself', 'highway', 'himself', 'history', 'hitting', 'holding', 'holiday', 'housing', 'however', 'hundred', 'hunting', 'husband', 'illegal', 'illness', 'imagine', 'imaging', 'immense', 'implied', 'imposed', 'improve', 'include', 'increase', 'indeed', 'induced', 'initial', 'injured', 'inquiry', 'insight', 'install', 'instant', 'instead', 'intense', 'interim', 'invalid', 'involve', 'isolate', 'journal', 'journey', 'justice', 'justify', 'keeping', 'kitchen', 'knowing', 'landing', 'largely', 'lasting', 'lateral', 'lawsuit', 'leading', 'learned', 'leaving', 'lecture', 'lending', 'lessons', 'liberal', 'liberty', 'library', 'license', 'limited', 'listing', 'literal', 'located', 'logical', 'looking', 'machine', 'magical', 'mailbox', 'maintain', 'manager', 'mankind', 'mansion', 'married', 'massive', 'masters', 'maximum', 'meaning', 'measure', 'medical', 'meeting', 'mention', 'message', 'million', 'mineral', 'minimum', 'missing', 'mission', 'mistake', 'mixture', 'monitor', 'monster', 'monthly', 'morning', 'mounted', 'musical', 'mystery', 'natural', 'nearest', 'neither', 'nervous', 'network', 'neutral', 'notable', 'nothing', 'noticed', 'nuclear', 'nursing', 'obvious', 'offered', 'officer', 'ongoing', 'opening', 'operate', 'opinion', 'optical', 'optimal', 'organic', 'origins', 'outcome', 'outdoor', 'outlook', 'outside', 'overall', 'overlay', 'oversee', 'package', 'painful', 'painted', 'painted', 'parking', 'partial', 'partner', 'passage', 'passing', 'passion', 'passive', 'patient', 'pattern', 'payment', 'peasant', 'pending', 'pension', 'percent', 'perfect', 'perform', 'perhaps', 'persist', 'picture', 'pioneer', 'placing', 'planned', 'plastic', 'players', 'pleased', 'plenty', 'pointed', 'popular', 'portion', 'poverty', 'precise', 'predict', 'premier', 'premise', 'premium', 'prepare', 'present', 'prevent', 'primary', 'printer', 'privacy', 'private', 'problem', 'proceed', 'process', 'produce', 'product', 'profile', 'program', 'project', 'promise', 'promote', 'propose', 'protect', 'protein', 'protest', 'provide', 'publish', 'purpose', 'pursuit', 'pushing', 'qualify', 'quality', 'quantum', 'quarter', 'quickly', 'radical', 'railway', 'rainbow', 'ranking', 'rapidly', 'reading', 'realize', 'reality', 'receipt', 'receive', 'recover', 'reflect', 'refugee', 'refuses', 'regular', 'related', 'release', 'remains', 'remark', 'remarks', 'removal', 'removed', 'replace', 'replied', 'reports', 'request', 'require', 'reserve', 'resolve', 'respect', 'respond', 'restore', 'results', 'retired', 'returns', 'revenge', 'revenue', 'reverse', 'revised', 'rolling', 'romance', 'routine', 'royalty', 'running', 'Russian', 'satisfy', 'savings', 'scandal', 'scatter', 'scholar', 'science', 'scratch', 'section', 'seeking', 'segment', 'selling', 'senator', 'sending', 'serious', 'servant', 'service', 'session', 'setting', 'settled', 'several', 'shallow', 'shelter', 'shifted', 'shipped', 'shocked', 'shortly', 'showing', 'shuttle', 'silence', 'similar', 'sitting', 'sixteen', 'skilled', 'slavery', 'smoking', 'society', 'soldier', 'somehow', 'someone', 'sorting', 'seeking', 'Spanish', 'spatial', 'speaker', 'special', 'species', 'sponsor', 'spotted', 'squared', 'stadium', 'staging', 'starter', 'station', 'staying', 'stomach', 'stopped', 'storage', 'strange', 'stretch', 'strikes', 'student', 'studied', 'studios', 'subject', 'success', 'suggest', 'suicide', 'summary', 'support', 'supreme', 'surface', 'surgery', 'surplus', 'survive', 'suspect', 'suspend', 'sustain', 'teacher', 'teenage', 'telling', 'tension', 'terminal', 'terrain', 'testing', 'theatre', 'theorem', 'therapy', 'thereby', 'thermal', 'through', 'thunder', 'tobacco', 'tonight', 'totally', 'touched', 'tourism', 'tourist', 'towards', 'tracker', 'trading', 'traffic', 'trailer', 'trained', 'trainer', 'transit', 'trapped', 'traveled', 'trigger', 'triumph', 'trouble', 'trusted', 'trustee', 'turning', 'typical', 'ultimate', 'unified', 'uniform', 'universe', 'unknown', 'unusual', 'updated', 'upgrade', 'upwards', 'utility', 'various', 'vehicle', 'venture', 'version', 'veteran', 'victory', 'village', 'vintage', 'virtual', 'visible', 'visitor', 'volcano', 'waiting', 'walking', 'wanting', 'warning', 'warrant', 'weather', 'website', 'wedding', 'weekend', 'welcome', 'welfare', 'western', 'whereas', 'whether', 'willing', 'winning', 'witness', 'workers', 'working', 'worried', 'writing', 'written', 'younger',
]);

// Check word validity using Free Dictionary API
export const isValidWord = async (word: string, language: 'en' | 'fr' = 'en'): Promise<boolean> => {
  // First check our local list for common words (faster)
  if (language === 'en') {
    if (COMMON_WORDS.has(word.toLowerCase())) {
      return true;
    }
    // If not in local list, check the dictionary API
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
      return response.ok;
    } catch {
      return false;
    }
  } else {
    // French validation - use local French dictionary
    const { FRENCH_WORDS } = await import('./frenchWords');
    const lowerWord = word.toLowerCase();
    
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
    // Sort words by length descending, then check each one
    const sortedWords = Array.from(COMMON_WORDS).sort((a, b) => b.length - a.length);
    
    for (const word of sortedWords) {
      if (canFormWord(word, availableLetters)) {
        return word.toUpperCase();
      }
    }
    
    // If not found in local dictionary, try API (but this is slower, so we limit to longer words)
    // For now, return null if not found locally
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
