let decks = [];

// Initialize UI
document.getElementById("createDeckButton")?.addEventListener("click", function() {
    const deckName = prompt("Enter a name for your new deck");
    if (deckName) {
        const newDeck = { 
            name: deckName, 
            flashcards: [],
            box1: 0,  // Track cards in box 1
            box2: 0   // Track cards in box 2
        };
        decks.push(newDeck);
        displayDecks();
    }
});

// Save Flashcard
document.getElementById("saveFlashcardButton")?.addEventListener("click", function() {
    const question = document.getElementById("newFlashcardQuestion")?.value;
    const answer = document.getElementById("newFlashcardAnswer")?.value;
    const currentDeck = getCurrentDeck();
    
    if (question && answer && currentDeck) {
        currentDeck.flashcards.push({ question, answer });
        currentDeck.box1++; // New flashcards start in box 1
        displayFlashcards(currentDeck);
        document.getElementById("newFlashcardQuestion")?.value = "";
        document.getElementById("newFlashcardAnswer")?.value = "";
        document.getElementById("newCardForm")?.style.display = "none";
    }
});

// Cancel New Card Form
document.getElementById("cancelNewCardButton")?.addEventListener("click", function() {
    document.getElementById("newCardForm")?.style.display = "none";
});

// Toggle Dark Mode
document.getElementById("darkModeToggle")?.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    document.getElementById("app")?.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    document.getElementById("app")?.classList.toggle("light-mode");
});

function displayDecks() {
    const decksContainer = document.getElementById("decksContainer");
    decksContainer.innerHTML = "";  // Clear previous decks

    decks.forEach(function(deck, index) {
        const deckElement = document.createElement("button");
        deckElement.classList.add("deck-button");
        deckElement.innerHTML = `
            <strong>${deck.name}</strong><br>
            <div class="deck-info">
                Flashcards: ${deck.flashcards.length} | 
                Box 1: ${deck.box1} | 
                Box 2: ${deck.box2}
            </div>
        `;
        deckElement.addEventListener("click", function() {
            displayFlashcards(deck);
        });
        decksContainer.appendChild(deckElement);
    });
}

function displayFlashcards(deck) {
    const flashcardsContainer = document.getElementById("flashcardsContainer");
    flashcardsContainer.innerHTML = `<h2>Flashcards for ${deck.name}</h2>`;
    
    deck.flashcards.forEach(function(flashcard) {
        const flashcardElement = document.createElement("div");
        flashcardElement.classList.add("flashcard");
        flashcardElement.innerHTML = `
            <p><strong>Q:</strong> ${flashcard.question}</p>
            <p><strong>A:</strong> ${flashcard.answer}</p>
        `;
        flashcardsContainer.appendChild(flashcardElement);
    });

    document.getElementById("newCardForm")?.style.display = "block";
}

function getCurrentDeck() {
    const flashcardsContainer = document.getElementById("flashcardsContainer");
    const deckName = flashcardsContainer.querySelector("h2")?.textContent.replace('Flashcards for ', '');
    return decks.find(function(deck) { 
        return deck.name === deckName; 
    });
}

window.onload = function() {
    displayDecks();
};
