let flashcards = {};
let currentUser = null;
let currentDeck = null;
let currentCardIndex = 0;
let reviewQueue = [];

document.getElementById('login-button').addEventListener('click', () => {
  const username = document.getElementById('username-input').value.trim();
  if (username) {
    currentUser = username;
    if (!flashcards[currentUser]) {
      flashcards[currentUser] = {};
    }
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('main-container').classList.remove('hidden');
    document.getElementById('welcome-message').textContent = `Welcome, ${username}`;
    loadDecks();
  }
});

document.getElementById('logout-button').addEventListener('click', () => {
  currentUser = null;
  currentDeck = null;
  reviewQueue = [];
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('login-container').classList.remove('hidden');
  document.getElementById('username-input').value = '';
});

document.getElementById('create-deck-button').addEventListener('click', () => {
  const deckName = prompt('Enter the name of the new deck:').trim();
  if (deckName && !flashcards[currentUser][deckName]) {
    flashcards[currentUser][deckName] = [];
    loadDecks();
  }
});

document.getElementById('add-card-button').addEventListener('click', () => {
  const front = document.getElementById('front-input').value.trim();
  const back = document.getElementById('back-input').value.trim();
  if (front && back) {
    flashcards[currentUser][currentDeck].push({ front, back, confidence: 0 });
    document.getElementById('front-input').value = '';
    document.getElementById('back-input').value = '';
  }
});

document.getElementById('finish-adding-cards').addEventListener('click', () => {
  document.getElementById('add-card-container').classList.add('hidden');
  document.getElementById('main-container').classList.remove('hidden');
  loadDecks();
});

document.getElementById('flip-card').addEventListener('click', () => {
  const card = reviewQueue[0] || flashcards[currentUser][currentDeck][currentCardIndex];
  const content = document.getElementById('flashcard-content');
  content.textContent = content.textContent === card.front ? card.back : card.front;
});

document.getElementById('dont-know-button').addEventListener('click', () => updateConfidence(-1));
document.getElementById('sort-of-know-button').addEventListener('click', () => updateConfidence(0));
document.getElementById('know-this-button').addEventListener('click', () => updateConfidence(1));

document.getElementById('exit-deck').addEventListener('click', () => {
  reviewQueue = [];
  document.getElementById('flashcard-container').classList.add('hidden');
  document.getElementById('main-container').classList.remove('hidden');
});

function loadDecks() {
  const deckList = document.getElementById('deck-list');
  deckList.innerHTML = '';
  for (const deck in flashcards[currentUser]) {
    const deckDiv = document.createElement('div');
    deckDiv.classList.add('deck-container');
    deckDiv.innerHTML = `<button>${deck} (${flashcards[currentUser][deck].length} cards)</button>`;
    deckDiv.querySelector('button').addEventListener('click', () => {
      currentDeck = deck;
      viewDeck();
    });
    deckList.appendChild(deckDiv);
  }
}

function viewDeck() {
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('flashcard-container').classList.remove('hidden');
  showCard();
}

function showCard() {
  const card = reviewQueue[0] || flashcards[currentUser][currentDeck][currentCardIndex];
  document.getElementById('flashcard-content').textContent = card.front;
}

function updateConfidence(change) {
  const card = reviewQueue.shift() || flashcards[currentUser][currentDeck][currentCardIndex];
  card.confidence += change;

  if (card.confidence < 0) {
    reviewQueue.push(card);
  } else if (card.confidence === 0) {
    setTimeout(() => reviewQueue.push(card), 3000);
  } else if (card.confidence > 0) {
    setTimeout(() => reviewQueue.push(card), 10000);
  }
  showCard();
}
