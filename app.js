let decks = [];

document.getElementById("createDeckButton").addEventListener("click", () => {
    const deckName = prompt("Enter a name for your new deck");
    if (deckName) {
        const newDeck = { name: deckName, flashcards: [] };
        decks.push(newDeck);
        displayDecks();
    }
});

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

document.getElementById("cancelNewCardButton").addEventListener("click", () => {
    document.getElementById("newCardForm").style.display = "none";
});

function displayDecks() {
    const decksContainer = document.getElementById("decksContainer");
    decksContainer.innerHTML = "";
    decks.forEach((deck, index) => {
        const deckElement = document.createElement("div");
        deckElement.textContent = deck.name;
        deckElement.addEventListener("click", () => {
            displayFlashcards(deck);
        });
        decksContainer.appendChild(deckElement);
    });
}

function displayFlashcards(deck) {
    const flashcardsContainer = document.getElementById("flashcardsContainer");
    flashcardsContainer.innerHTML = `<h2>Flashcards for ${deck.name}</h2>`;
    
    deck.flashcards.forEach((flashcard, index) => {
        const flashcardElement = document.createElement("div");
        flashcardElement.textContent = `Q: ${flashcard.question} - A: ${flashcard.answer}`;
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
