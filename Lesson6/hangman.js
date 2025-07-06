/*
a random word is selected as the target
the length of that word is calculated

The player is told how many letters are in the target word and shown a depiction
of (a) the hangman, (b) the word as it currently stands with underscores for
missing letters.

The player guesses a letter. If they have already guessed that letter, guess
again. if they guess something other than a letter, guess again. case does not
matter.

If the letter appears in the word, the word is updated with all blanks
containing that letter filled in with that letter. If word complete, WIN. Else,
guess again.

If teh letter does not appear in teh word, the player receives a MISS and the
hangman images advances by one row. If that results in the last row being
displayed, LOSE, Else, guess again.

Each missed letter causes another row to appear until 8 missed guesses have
occurred

*/

const WORD_LIST = ['electricity', 'donkey', 'hardware', 'xerox', 'transistor',
  'engineering', 'hangman', 'circuit', 'imagination', 'robot', 'memory',
  'submarine', 'chess', 'resistance', 'matrix', 'function', 'laser',
  'bodyguard', 'titanic', 'global', 'ozone', 'bridge', 'technology', 'spider',
  'pyramid', 'sphere', 'member', 'warning', 'yourself', 'screen', 'language',
  'system', 'internet', 'parameter', 'traffic', 'network', 'filter', 'nucleus',
  'automatic', 'microphone', 'cassette', 'operation', 'country', 'beautiful',
  'picture', 'teacher', 'superman', 'undertaker', 'alarm', 'process',
  'electron', 'certificate', 'grandfather', 'landmark', 'relativity', 'eraser',
  'design', 'football', 'human', 'musician', 'egyptian', 'elephant', 'queen',
  'message', 'wallpaper', 'nationality', 'answer', 'wrong', 'statement',
  'puzzle', 'voltage', 'current', 'mathematics', 'wisdom', 'dream',
  'database', 'collection', 'barrier', 'project', 'sunlight', 'figure', 'graph',
  'battle', 'hundred', 'signal', 'thousand', 'transformation', 'daughter',
  'communication', 'microwave', 'electronic', 'peace', 'wireless', 'delete',
  'brain', 'control', 'prophet', 'freedom', 'harbour', 'confidence', 'positive',
  'harvest', 'hunger', 'woman', 'children', 'stranger', 'garden', 'pleasure',
  'between', 'recognition', 'tomorrow', 'autumn', 'monkey', 'spring', 'winter',
  'classification', 'typewriter', 'success', 'difference', 'acoustics',
  'agreement', 'sorrow', 'christmas', 'silver', 'birthday', 'championship',
  'comfortable', 'diffusion', 'murder', 'policeman', 'science', 'desert',
  'blood', 'funeral', 'silence', 'garment', 'merchant', 'spirit', 'punishment',
  'measurement', 'ocean', 'digital', 'illusion', 'tyrant', 'castle', 'passion',
  'magician', 'remedy', 'knowledge', 'threshold', 'number', 'vision',
  'absence', 'mystery', 'morning', 'device', 'thoughts', 'spirit', 'future',
  'mountain', 'treasure', 'machine', 'whispering', 'eternity', 'reflection',
  'achievement', 'lightning', 'secret', 'environment', 'shepherd', 'confusion',
  'grave', 'promise', 'honour', 'reward', 'temple', 'distance', 'eagle',
  'finger', 'belief', 'crystal', 'fashion', 'direction', 'captain', 'moment',
  'permission', 'logic', 'analysis', 'password', 'english', 'equalizer',
  'emotion', 'battle', 'expression', 'scissors', 'trousers', 'glasses',
  'dictionary', 'chemistry', 'induction', 'detail', 'widow', 'wealth', 'health',
  'disaster', 'volcano', 'poverty', 'limitation', 'perfect', 'intelligence',
  'failure', 'ignorance', 'destination', 'source', 'resort', 'satisfaction',
  'frequency', 'selection', 'substitution', 'kingdom', 'pattern', 'management',
  'situation', 'multiply', 'treatment', 'dollar', 'intuition', 'chapter',
  'desire', 'command', 'action', 'consciousness', 'enemy', 'security', 'object',
  'happen', 'happiness', 'worry', 'method', 'tolerance', 'error', 'hesitation',
  'record', 'tongue', 'supply', 'vibration', 'stress', 'despair', 'restaurant',
  'television', 'video', 'audio', 'layer', 'mixture', 'doorbell', 'cousin',
  'finance', 'production', 'invisible', 'excitement', 'afternoon', 'office',
  'illustration', 'valley', 'apartment', 'necessary', 'shortage', 'almost',
  'blanket', 'suggestion', 'overflow', 'demonstration', 'challenge', 'compact',
  'tower', 'question', 'problem', 'pressure', 'beast', 'encouragement',
  'cavity', 'appearance', 'wonderful', 'matter', 'dimension', 'business',
  'conversation', 'reaction', 'psychology', 'superstition', 'smash',
  'surprise', 'nothing', 'ladder', 'opposite', 'reality', 'genius', 'string',
  'destruction', 'expensive', 'painting', 'chicken', 'wishing', 'profession',
  'hatred', 'possession', 'criticism', 'zebra', 'harmony', 'personality',
  'addition', 'subtraction', 'cipher', 'encryption', 'compression', 'extension',
  'blessing', 'meeting', 'difficulty', 'weapon', 'against', 'external',
  'legend', 'servant', 'secondary', 'license', 'directory', 'statistics',
  'attraction', 'sensitivity', 'magnification', 'someone', 'symptom', 'recipe',
  'service', 'family', 'island', 'planet', 'butterfly', 'diving', 'strength',
  'extreme', 'opportunity', 'illumination', 'cable', 'conflict', 'interference',
  'receiver', 'transmitter', 'channel', 'company', 'grocery', 'devil', 'angel',
  'exactly', 'document', 'tutorial', 'sound', 'voice', 'abbreviation',
  'abrupt', 'absolute', 'absorption', 'abstract', 'academy', 'acceleration',
  'accident', 'account', 'acidification', 'actress', 'adaptation', 'addiction',
  'adjustment', 'admiration', 'adoption', 'advanced', 'adventure',
  'agenda', 'airport', 'algorithm', 'allocation', 'aluminium', 'ambiguity',
  'amphibian', 'anaesthesia', 'analogy', 'anchor', 'animation', 'anode',
  'apparent', 'appendix', 'approval', 'approximation', 'arbitrary',
  'arithmetic', 'arrangement', 'article', 'ascending', 'ashamed', 'asleep',
  'assembly', 'astonishment', 'atmosphere', 'awful', 'bachelor', 'backbone',
  'bacteria', 'balance', 'balloon', 'banana', 'barbecue', 'baseball', 'beaker',
  'beggar', 'behaviour', 'benefit', 'bidirectional', 'biology', 'blackboard',
  'bladder', 'bleeding', 'blender', 'bonus', 'bottle', 'bracket', 'branch',
  'bubble', 'bucket', 'budget', 'bullet', 'burglar', 'butcher', 'bypass',
  'calculator', 'calibration', 'campaign', 'cancellation', 'candidate',
  'carpenter', 'carriage', 'cartoon', 'cascade', 'casual', 'catalyst',
  'cement', 'ceremony', 'chairman', 'checkout', 'chimney', 'chocolate',
  'circumference', 'civilization', 'classroom', 'clearance', 'client',
  'coincidence', 'colleague', 'comfortable', 'competition', 'kangaroo',
  'journal', 'jockey', 'iteration', 'isometric', 'isolation', 'invitation',
  'institution', 'injection', 'humanity', 'housekeeper', 'history', 'heaven',
  'greenhouse', 'glory', 'foundation', 'formula', 'fluctuation', 'fiction',
  'emission', 'elasticity', 'earthquake', 'dynamic', 'doctorate', 'divorce'];

const HANGMAN = [
  ' ___________',
  '|/    |     ',
  '|     |     ',
  '|     0     ',
  '|   \\ | /   ',
  '|     |     ',
  '|    / \\    ',
  '|   -   -   ',
  '|==========='
];

const readline = require('readline-sync');

class Hangman {
  constructor(test = false) {
    this.test = test;
    this.word = this.selectWord().toUpperCase();
    this.currWord = [...'_'.repeat(this.word.length)];
    this.misses = 0;
    this.lettersGuessed = [];
    this.guess = '';
  }

  selectWord() {
    let randIdx = Math.floor(Math.random() * WORD_LIST.length);
    let word = WORD_LIST[randIdx];
    return word;
  }

  play() {
    this.welcome();
    while (this.misses < HANGMAN.length - 2 && this.currWord.includes('_')) {
      this.displayMan();
      this.displayWord();
      this.getGuess();
      this.updateWord();
    }
    this.announceResult();
    this.goodbye();
  }

  welcome() {
    console.log('Welcome to Hangman!');
    console.log(`the word is ${this.word}`);
  }

  displayMan() {
    let rows = HANGMAN.slice(0,this.misses + 2);
    console.log(rows.join('\n'));
    console.log();
  }

  displayWord() {
    console.log("Here's the word so far:");
    console.log(`${this.currWord.join('')}`);
  }

  getGuess() {
    let ans;

    while (!ans) {
      ans = readline.question('Please guess a letter\n').toUpperCase();
      if (this.lettersGuessed.includes(ans)) {
        console.log(`You already guessed ${ans}!`);
        ans = null;
      } else if (/[^A-Z]/.test(ans) || ans.length > 1) {
        console.log("That's not a letter!");
        ans = null;
      }
    }
    this.lettersGuessed.push(ans);
    this.guess = ans;
  }

  updateWord() {
    let count = 0;
    let verb;
    [...this.word].forEach((letter, idx) => {
      if (letter === this.guess) {
        this.currWord[idx] = this.guess;
        count += 1;
      }
    });

    if (count === 0) {
      this.misses += 1;
      console.log(`Sorry, there's no ${this.guess} in the word.`);
    } else {
      verb = count === 1 ? `is 1 ${this.guess}` : `are ${count} ${this.guess}s`;
      console.log(`Yes! There ${verb}`);
    }
  }

  announceResult() {
    if (this.currWord.includes('_')) {
      this.displayMan();
      console.log('The man died b/c you are bad at guessing. You lose.');
    } else {
      console.log(`Yes! The word is:`);
      this.displayWord();
      console.log(`You win!`);
    }
  }

  goodbye() {
    console.log('Thanks for playing Hangman! Goodbye!');
  }
}

let game = new Hangman();
game.play();