let flashcards = {};
let currentUser = null;
let currentDeck = null;
let currentCardIndex = 0;

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
  currentCardIndex = 0;
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('login-container').classList.remove('hidden');
  document.getElementById('username-input').value = '';
});

document.getElementById('create-deck-button').addEventListener('click', () => {
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('add-deck-container').classList.remove('hidden');
});

document.getElementById('add-deck-button').addEventListener('click', () => {
  const deckName = document.getElementById('new-deck-name').value.trim();
  if (deckName && !flashcards[currentUser][deckName]) {
    flashcards[currentUser][deckName] = [];
    document.getElementById('add-deck-container').classList.add('hidden');
    document.getElementById('main-container').classList.remove('hidden');
    loadDecks();
  }
});

document.getElementById('cancel-create-deck').addEventListener('click', () => {
  document.getElementById('add-deck-container').classList.add('hidden');
  document.getElementById('main-container').classList.remove('hidden');
});

document.getElementById('add-card-button').addEventListener('click', () => {
  const front = document.getElementById('front-input').value.trim();
  const back = document.getElementById('back-input').value.trim();
  if (front && back) {
    flashcards[currentUser][currentDeck].push({ front, back });
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
  const card = flashcards[currentUser][currentDeck][currentCardIndex];
  const cardContent = document.getElementById('flashcard-content');
  cardContent.textContent = cardContent.textContent === card.front ? card.back : card.front;
});

document.getElementById('next-card').addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % flashcards[currentUser][currentDeck].length;
  showCard();
});

document.getElementById('exit-deck').addEventListener('click', () => {
  document.getElementById('flashcard-container').classList.add('hidden');
  document.getElementById('main-container').classList.remove('hidden');
});

function loadDecks() {
  const deckList = document.getElementById('deck-list');
  deckList.innerHTML = '';
  for (const deck in flashcards[currentUser]) {
    const deckContainer = document.createElement('div');
    deckContainer.classList.add('deck-container');

    const deckButton = document.createElement('button');
    deckButton.textContent = `${deck} (${flashcards[currentUser][deck].length} cards)`;
    deckButton.onclick = () => {
      currentDeck = deck;
      viewDeck();
    };

    const addCardButton = document.createElement('button');
    addCardButton.textContent = 'Add Cards';
    addCardButton.onclick = () => {
      currentDeck = deck;
      openAddCardPage(deck);
    };

    deckContainer.appendChild(deckButton);
    deckContainer.appendChild(addCardButton);
    deckList.appendChild(deckContainer);
  }
}

function viewDeck() {
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('flashcard-container').classList.remove('hidden');
  showCard();
}

function showCard() {
  const card = flashcards[currentUser][currentDeck][currentCardIndex];
  document.getElementById('flashcard-content').textContent = card.front;
}

function openAddCardPage(deckName) {
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('add-card-container').classList.remove('hidden');
  document.getElementById('current-deck-name').textContent = deckName;
}
