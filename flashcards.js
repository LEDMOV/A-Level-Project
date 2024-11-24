// Global variables
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = null;
let isDarkMode = false;

// DOM elements
const loginScreen = document.getElementById('login-screen');
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('login-btn');
const app = document.getElementById('app');
const deckContainer = document.getElementById('deck-container');
const newDeckBtn = document.getElementById('new-deck-btn');
const deckForm = document.getElementById('deck-form');
const saveDeckBtn = document.getElementById('save-deck');
const cancelDeckBtn = document.getElementById('cancel-deck');
const deckNameInput = document.getElementById('deck-name');
const flashcardsContainer = document.getElementById('flashcards-container');
const deckTitle = document.getElementById('deck-title');
const newFlashcardBtn = document.getElementById('new-flashcard-btn');
const flashcardsList = document.getElementById('flashcards-list');
const toggleThemeBtn = document.getElementById('toggle-theme');

// Functions
function renderDecks() {
  deckContainer.innerHTML = '';
  const userDecks = users[currentUser]?.decks || [];
  userDecks.forEach((deck, index) => {
    const deckButton = document.createElement('button');
    deckButton.classList.add('deck-button');
    deckButton.innerHTML = `
      <strong>${deck.name}</strong><br>
      Flashcards: ${deck.flashcards.length}<br>
      Box 1: ${deck.box1} | Box 2: ${deck.box2}
    `;
    deckButton.addEventListener('click', () => openDeck(index));
    deckContainer.appendChild(deckButton);
  });
}

function openDeck(index) {
  const userDecks = users[currentUser]?.decks || [];
  const selectedDeck = userDecks[index];
  deckTitle.textContent = selectedDeck.name;
  flashcardsList.innerHTML = '';
  selectedDeck.flashcards.forEach((flashcard) => {
    const flashcardItem = document.createElement('div');
    flashcardItem.innerHTML = `
      <p><strong>Q:</strong> ${flashcard.question}</p>
      <p><strong>A:</strong> ${flashcard.answer}</p>
    `;
    flashcardsList.appendChild(flashcardItem);
  });
  flashcardsContainer.classList.remove('hidden');
}

function saveDeck() {
  const deckName = deckNameInput.value.trim();
  if (deckName) {
    const newDeck = {
      name: deckName,
      flashcards: [],
      box1: 0,
      box2: 0,
    };
    if (!users[currentUser]) {
      users[currentUser] = { decks: [] };
    }
    users[currentUser].decks.push(newDeck);
    localStorage.setItem('users', JSON.stringify(users));
    renderDecks();
    deckForm.classList.add('hidden');
  }
}

function loginUser() {
  const username = usernameInput.value.trim();
  if (username) {
    currentUser = username;
    if (!users[currentUser]) {
      users[currentUser] = { decks: [] };
    }
    localStorage.setItem('users', JSON.stringify(users));
    loginScreen.classList.add('hidden');
    app.classList.remove('hidden');
    renderDecks();
  }
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
}

// Event listeners
loginBtn.addEventListener('click', loginUser);

newDeckBtn.addEventListener('click', () => {
  deckForm.classList.remove('hidden');
});

saveDeckBtn.addEventListener('click', saveDeck);

cancelDeckBtn.addEventListener('click', () => {
  deckForm.classList.add('hidden');
});

newFlashcardBtn.addEventListener('click', () => {
  const question = prompt('Enter the question:');
  const answer = prompt('Enter the answer:');
  if (question && answer) {
    const userDecks = users[currentUser]?.decks || [];
    userDecks[currentDeckIndex].flashcards.push({ question, answer });
    localStorage.setItem('users', JSON.stringify(users));
    openDeck(currentDeckIndex);
  }
});

toggleThemeBtn.addEventListener('click', toggleTheme);

// Initial state
if (!currentUser) {
  app.classList.add('hidden');
}
