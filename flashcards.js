const flashcards = JSON.parse(localStorage.getItem('flashcards')) || {};
let currentUser = null;
let currentDeck = null;

document.getElementById('login-button').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  if (username) {
    currentUser = username;
    if (!flashcards[username]) {
      flashcards[username] = {};
    }
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    showMainContainer();
  }
});

document.getElementById('logout-button').addEventListener('click', () => {
  currentUser = null;
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('login-container').classList.remove('hidden');
});

function showMainContainer() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('main-container').classList.remove('hidden');
  document.getElementById('add-card-container').classList.add('hidden');
  document.getElementById('new-deck-container').classList.add('hidden');
  document.getElementById('flashcard-container').classList.add('hidden');
  loadDecks();
}

function loadDecks() {
  const deckList = document.getElementById('deck-list');
  deckList.innerHTML = '';
  const userDecks = flashcards[currentUser];
  for (const deck in userDecks) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${deck} (${userDecks[deck].length} cards)</span>
      <button class="view-deck-button" data-deck="${deck}">View</button>
      <button class="add-card-button" data-deck="${deck}">Add Cards</button>
    `;
    deckList.appendChild(listItem);
  }

  document.querySelectorAll('.view-deck-button').forEach(button => {
    button.addEventListener('click', (e) => {
      currentDeck = e.target.dataset.deck;
      viewDeck();
    });
  });

  document.querySelectorAll('.add-card-button').forEach(button => {
    button.addEventListener('click', (e) => {
      currentDeck = e.target.dataset.deck;
      document.getElementById('add-card-deck-title').textContent = currentDeck;
      document.getElementById('main-container').classList.add('hidden');
      document.getElementById('add-card-container').classList.remove('hidden');
    });
  });
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
  const flashcardContent = document.getElementById('flashcard-content');
  flashcardContent.textContent = deck[currentCardIndex].front;

  document.getElementById('know-button').onclick = () => {
    if (currentCardIndex < deck.length - 1) {
      currentCardIndex++;
      flashcardContent.textContent = deck[currentCardIndex].front;
    } else {
      alert('You have reviewed all the cards!');
      backToMain();
    }
  };

  document.getElementById('dont-know-button').onclick = () => {
    alert(`Back of the card: ${deck[currentCardIndex].back}`);
  };

  document.getElementById('back-to-decks-button').onclick = backToMain;
}

document.getElementById('create-deck-button').addEventListener('click', () => {
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('new-deck-container').classList.remove('hidden');
});

document.getElementById('save-deck-button').addEventListener('click', () => {
  const deckName = document.getElementById('new-deck-name').value.trim();
  if (deckName && !flashcards[currentUser][deckName]) {
    flashcards[currentUser][deckName] = [];
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    document.getElementById('new-deck-name').value = '';
    showMainContainer();
  } else {
    alert('Deck name is invalid or already exists.');
  }
});

document.getElementById('add-card-button').addEventListener('click', () => {
  const front = document.getElementById('card-front').value.trim();
  const back = document.getElementById('card-back').value.trim();
  if (front && back) {
    flashcards[currentUser][currentDeck].push({ front, back });
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    document.getElementById('card-front').value = '';
    document.getElementById('card-back').value = '';
    alert('Card added!');
  } else {
    alert('Both front and back are required.');
  }
});

document.getElementById('done-adding-button').addEventListener('click', () => {
  currentDeck = null;
  showMainContainer();
});

function backToMain() {
  document.getElementById('flashcard-container').classList.add('hidden');
  showMainContainer();
}
