const flashcards = JSON.parse(localStorage.getItem('flashcards')) || {};
let currentUser = null;

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

function showMainContainer() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('main-container').classList.remove('hidden');
  loadDecks();
}

function loadDecks() {
  const deckList = document.getElementById('deck-list');
  deckList.innerHTML = '';
  const userDecks = flashcards[currentUser];
  for (const deck in userDecks) {
    const listItem = document.createElement('li');
    listItem.innerText = `${deck} (${userDecks[deck].length} cards)`;
    const viewButton = document.createElement('button');
    viewButton.innerText = 'View';
    viewButton.addEventListener('click', () => showFlashcards(deck));
    listItem.appendChild(viewButton);
    deckList.appendChild(listItem);
  }
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
    document.getElementById('new-deck-container').classList.add('hidden');
  }
});

function showFlashcards(deckName) {
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('flashcard-container').classList.remove('hidden');
  document.getElementById('deck-title').innerText = deckName;
}

document.getElementById('logout-button').addEventListener('click', () => {
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('login-container').classList.remove('hidden');
});
