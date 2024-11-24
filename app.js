let decks = [];

// Initialize UI
document.getElementById("createDeckButton").addEventListener("click", () => {
    const deckName = prompt("Enter a name for your new deck");
    if (deckName) {
        const newDeck = { name: deckName, flashcards: [] };
        decks.push(newDeck);
        displayDecks();
    }
});

// Save Flashcard
document.getElementById("saveFlashcardButton").addEventListener("click", () => {
    const question = document.getElementById("newFlashcardQuestion").value;
    const answer = document.getElementById("newFlashcardAnswer").value;
    const currentDeck = getCurrentDeck();
    
    if (question && answer && currentDeck) {
        currentDeck.flashcards.push({ question, answer });
        displayFlashcards(currentDeck);
        document.getElementById("newFlashcardQuestion").value = "";
        document.getElementById("newFlashcardAnswer").value = "";
        document.getElementById("newCardForm").style.display = "none";
    }
});

// Cancel New Card Form
document.getElementById("cancelNewCardButton").addEventListener("click", () => {
    document.getElementById("newCardForm").style.display = "none";
});

// Toggle Dark Mode
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.getElementById("app").classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    document.getElementById("app").classList.toggle("light-mode");
});

function displayDecks() {
    const decksContainer = document.getElementById("decksContainer");
    decksContainer.innerHTML = "";
    decks.forEach((deck, index) => {
        const deckElement = document.createElement("div");
        deckElement.textContent = deck.name;
        deckElement.classList.add("deck");
        deckElement.addEventListener("click", () => {
            displayFlashcards(deck);
        });
        decksContainer.appendChild(deckElement);
    });
}

function displayFlashcards(deck) {
    const flashcardsContainer = document.getElementById("flashcardsContainer");
    flashcardsContainer.innerHTML = `<h2>Flashcards for ${deck.name}</h2>`;
    
    deck.flashcards.forEach((flashcard) => {
        const flashcardElement = document.createElement("div");
        flashcardElement.classList.add("flashcard");
        flashcardElement.innerHTML = `
            <p><strong>Q:</strong> ${flashcard.question}</p>
            <p><strong>A:</strong> ${flashcard.answer}</p>
        `;
        flashcardsContainer.appendChild(flashcardElement);
    });
    
    document.getElementById("newCardForm").style.display = "block";
}

function getCurrentDeck() {
    const flashcardsContainer = document.getElementById("flashcardsContainer");
    const deckName = flashcardsContainer.querySelector("h2")?.textContent.replace('Flashcards for ', '');
    return decks.find(deck => deck.name === deckName);
}

window.onload = function() {
    // Simulate loading flashcards from a JSON file
    // This can be done by fetching the JSON data if needed
    displayDecks();
};
