// Global variables
let decks = JSON.parse(localStorage.getItem('decks')) || [];
let currentDeck = null;
let isDarkMode = false;

// DOM elements
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
  decks.forEach((deck, index) => {
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
  currentDeck = decks[index];
  deckTitle.textContent = currentDeck.name;
  flashcardsList.innerHTML = '';
  renderFlashcards();
  flashcardsContainer.classList.remove('hidden');
}

function renderFlashcards() {
  currentDeck.flashcards.forEach((flashcard, index) => {
    const flashcardItem = document.createElement('div');
    flashcardItem.innerHTML = `
      <p><strong>Q:</strong> ${flashcard.question}</p>
      <p><strong>A:</strong> ${flashcard.answer}</p>
    `;
    flashcardsList.appendChild(flashcardItem);
  });
}

function saveDeck() {
  const deckName = deckNameInput.value.trim();
  if (deckName) {
    const newDeck = {
      name: deckName,
      flashcards: [],
      box1: 0,
      box2: 0
    };
    decks.push(newDeck);
    localStorage.setItem('decks', JSON.stringify(decks));
    renderDecks();
    deckForm.classList.add('hidden');
  }
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Event listeners
newDeckBtn.addEventListener('click', () => {
  deckForm.classList.remove('hidden');
});

saveDeckBtn.addEventListener('click', saveDeck);
cancelDeckBtn.addEventListener('click', () => deckForm.classList.add('hidden'));

newFlashcardBtn.addEventListener('click', () => {
  const question = prompt("Enter the question:");
  const answer = prompt("Enter the answer:");
  if (question && answer) {
    currentDeck.flashcards.push({ question, answer });
    localStorage.setItem('decks', JSON.stringify(decks));
    renderFlashcards();
  }
});

toggleThemeBtn.addEventListener('click', toggleTheme);

// Initial render
renderDecks();
