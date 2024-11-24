const flashcards = {};
let currentUser = 'guest';
let currentDeck = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('username').textContent = currentUser;
  loadDecks();
});

function createDeck() {
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('add-deck-container').classList.remove('hidden');
}

function saveDeck() {
  const deckName = document.getElementById('new-deck-name').value.trim();
  if (deckName === '') {
    alert('Deck name cannot be empty!');
    return;
  }

  if (!flashcards[currentUser]) {
    flashcards[currentUser] = {};
  }

  flashcards[currentUser][deckName] = [];
  document.getElementById('new-deck-name').value = '';
  backToMain();
  loadDecks();
}

function loadDecks() {
  const deckList = document.getElementById('deck-list');
  deckList.innerHTML = '';

  if (!flashcards[currentUser]) {
    flashcards[currentUser] = {};
  }

  for (const deck in flashcards[currentUser]) {
    const deckButton = document.createElement('button');
    const deckInfo = flashcards[currentUser][deck];
    const box1Count = deckInfo.filter(card => card.box === 1).length;
    const box2Count = deckInfo.filter(card => card.box === 2).length;

    deckButton.textContent = `${deck} (${deckInfo.length} cards | Box1: ${box1Count}, Box2: ${box2Count})`;
    deckButton.onclick = () => {
      currentDeck = deck;
      viewDeck();
    };

    deckList.appendChild(deckButton);
  }
}

function addCard() {
  const front = document.getElementById('card-front').value.trim();
  const back = document.getElementById('card-back').value.trim();

  if (!front || !back) {
    alert('Both front and back text are required!');
    return;
  }

  flashcards[currentUser][currentDeck].push({ front, back, box: 1 });
  document.getElementById('card-front').value = '';
  document.getElementById('card-back').value = '';
}

function finishAddingCards() {
  backToMain();
  loadDecks();
}

function viewDeck() {
  const deck = flashcards[currentUser][currentDeck];
  if (deck.length === 0) {
    alert('No cards in this deck yet!');
    return;
  }

  document.getElementById('flashcard-container').classList.remove('hidden');
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('deck-title').textContent = currentDeck;

  let currentCardIndex = 0;
  const flashcard = document.getElementById('flashcard');
  const flashcardContentFront = document.getElementById('flashcard-front');
  const flashcardContentBack = document.getElementById('flashcard-back');

  flashcardContentFront.textContent = deck[currentCardIndex].front;
  flashcardContentBack.textContent = deck[currentCardIndex].back;
  flashcard.classList.remove('flipped');

  flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
  });

  document.getElementById('know-button').onclick = () => {
    if (currentCardIndex < deck.length - 1) {
      currentCardIndex++;
      flashcardContentFront.textContent = deck[currentCardIndex].front;
      flashcardContentBack.textContent = deck[currentCardIndex].back;
      flashcard.classList.remove('flipped');
    } else {
      alert('You have reviewed all the cards!');
      backToMain();
    }
  };

  document.getElementById('back-to-decks-button').onclick = backToMain;
}

function logOut() {
  alert('Logging out...');
}

function backToMain() {
  document.getElementById('main-container').classList.remove('hidden');
  document.getElementById('add-deck-container').classList.add('hidden');
  document.getElementById('add-card-container').classList.add('hidden');
  document.getElementById('flashcard-container').classList.add('hidden');
}
