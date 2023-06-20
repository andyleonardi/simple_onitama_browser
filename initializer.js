// This file holds functions that generate cards, meeples, reset board, etc

const holdP1 = document.getElementById("hold-1");
const holdP2 = document.getElementById("hold-2");
const playP1 = document.getElementById("play-1");
const playP2 = document.getElementById("play-2");

// Function to include initializing the cards, and then setting event listener
const generateCard = (cardId, doc) => {
    // Find index of the parameter in the allCards array
    const indexNum = allCards.findIndex((element)=>element.id===cardId);

    // Generate the card
    const cardOutline = document.createElement("div");
    cardOutline.classList.add("cards");
    cardOutline.setAttribute("id", cardId);
    // Insert the card in the selected document object
    doc.appendChild(cardOutline);

    // First generate the two div containers, the top side of the card, and the bottom
    const topCard = document.createElement("div");
    topCard.classList.add("top-card");
    const botCard = document.createElement("div");
    botCard.classList.add("bottom-card");
    cardOutline.appendChild(topCard);
    cardOutline.appendChild(botCard);

    // Next generate the content that goes to the top side of the card
    // Left side is the image
    const cardImg = document.createElement("img");
    cardImg.classList.add("card-img");
    const url = allCards[indexNum].image;
    cardImg.src = url;
    // Right side is the move ability
    const cardAbility = document.createElement("div");
    cardAbility.classList.add("card-ability");
    topCard.appendChild(cardImg);
    topCard.appendChild(cardAbility);

    // Create the move ability grids
    for (i = 25 ; i > 0 ; i--) {
        const cardSquare = document.createElement("div");
        cardSquare.classList.add("card-square");
        cardSquare.setAttribute("id", `card-${i}`);
        if (i === 13) {cardSquare.style.backgroundColor = "black"};
        cardAbility.appendChild(cardSquare);
    }
    // Highlight the possible spaces
    let newSpace = 0;
    for (j = 0 ; j < allCards[indexNum].moves.length ; j++) {
        newSpace = 13 + allCards[indexNum].moves[j][0] + (5 * allCards[indexNum].moves[j][1]);
        let selectedCardSquare = document.querySelector(`#${cardId} #card-${newSpace}`);
        selectedCardSquare.style.backgroundColor = "gray";
    }

    // Finally, generate the content that goes to the bottom side of the card, i.e. the name of the card
    const cardName = document.createElement("p");
    cardName.classList.add("card-name");
    const bottomName = allCards[indexNum].name;
    cardName.textContent = bottomName;
    botCard.appendChild(cardName);
}

const generateCardReverse = (cardId, doc) => {
    // Find index of the parameter in the allCards array
    const indexNum = allCards.findIndex((element)=>element.id===cardId);

    // Generate the card
    const cardOutline = document.createElement("div");
    cardOutline.classList.add("cards");
    cardOutline.setAttribute("id", cardId);
    // Insert the card in the selected document object
    doc.appendChild(cardOutline);

    // Generate the two div containers, but reverse the order
    const topCard = document.createElement("div");
    topCard.classList.add("top-card");
    const botCard = document.createElement("div");
    botCard.classList.add("bottom-card");
    cardOutline.appendChild(botCard);
    cardOutline.appendChild(topCard);
    

    // Next generate the content that goes to the top side of the card
    // Left side is the image
    const cardImg = document.createElement("img");
    cardImg.classList.add("card-img");
    const url = allCards[indexNum].image;
    cardImg.src = url;
    // Right side is the move ability
    const cardAbility = document.createElement("div");
    cardAbility.classList.add("card-ability");
    topCard.appendChild(cardImg);
    topCard.appendChild(cardAbility);

    // Create the move ability grids
    for (i = 25 ; i > 0 ; i--) {
        const cardSquare = document.createElement("div");
        cardSquare.classList.add("card-square");
        cardSquare.setAttribute("id", `card-${i}`);
        if (i === 13) {cardSquare.style.backgroundColor = "black"};
        cardAbility.appendChild(cardSquare);
    }
    // Highlight the possible spaces
    let newSpace = 0;
    for (j = 0 ; j < allCards[indexNum].moves2.length ; j++) {
        newSpace = 13 + allCards[indexNum].moves2[j][0] + (5 * allCards[indexNum].moves2[j][1]);
        let selectedCardSquare = document.querySelector(`#${cardId} #card-${newSpace}`);
        selectedCardSquare.style.backgroundColor = "gray";
    }

    // Finally, generate the content that goes to the bottom side of the card, i.e. the name of the card
    const cardName = document.createElement("p");
    cardName.classList.add("card-name");
    const bottomName = allCards[indexNum].name;
    cardName.textContent = bottomName;
    botCard.appendChild(cardName);
}

// Function to determine whether use generateCard or reverse
const playerPositions = (id, doc) => {
    if (doc === holdP1 || doc === playP1) {
        generateCard(id, doc);
    } else if (doc === holdP2 || doc === playP2) {
        generateCardReverse(id, doc);
    }
}

// Function to generate meeples in their starting positions
const generateMeeples = () => {
    // Define starting spaces
    const startPosition = [11, 12, 13, 14, 15, 51, 52, 53, 54, 55];
    let url = "";
    
    // In each of the starting position, insert meeples
    for (i = 0 ; i < startPosition.length ; i++) {
        // For Master spaces, i.e middle of the board
        if (i === 2 || i === 7) {
            // Insert new div to the square div (Master starts at squares with id = 3 and 23)
            const masterSpace = document.getElementById(startPosition[i]);
            const masterMeeple = document.createElement("div");
            masterMeeple.classList.add("master-meeple"); // Add class
            masterMeeple.setAttribute("id",`meeple-${startPosition[i]}`); // Add ID
            masterSpace.appendChild(masterMeeple);
            
            const masterImage = document.createElement("img"); // Insert image
            masterImage.classList.add("master-img"); // Add class to image
            // To differentiate both players' meeples, they have different images
            if (i === 2) {
                let url = meepleImage[meepleImage.findIndex((element)=>element.name === "master1")].link;
                masterImage.src = url;
            };
            if (i === 7) {
                let url = meepleImage[meepleImage.findIndex((element)=>element.name === "master2")].link;
                masterImage.src = url;
            };
            masterMeeple.appendChild(masterImage);
        } else { // For disciple spaces
            // Disciples are in squares with id 1, 2, 4, 5, 21, 22, 24, 25
            const discipleSpace = document.getElementById(startPosition[i]);
            const discipleMeeple = document.createElement("div");
            discipleMeeple.classList.add("disciple-meeple");
            discipleMeeple.setAttribute("id",`meeple-${startPosition[i]}`);
            discipleSpace.appendChild(discipleMeeple);
            
            const discipleImage = document.createElement("img");
            discipleImage.classList.add("disciple-img");
            // To differentiate both players' meeples, they have different images
            if (i < 5) {
                let url = meepleImage[meepleImage.findIndex((element)=>element.name === "disciple1")].link;
                discipleImage.src = url;
            };
            if (i >= 5) {
                let url = meepleImage[meepleImage.findIndex((element)=>element.name === "disciple2")].link;
                discipleImage.src = url;
            };
            // discipleImage.setAttribute("src", `${url}`);
            discipleMeeple.appendChild(discipleImage);
        }
    }
}

// Function that fills the board to start the game
const resetBoard = () => {
    // Initialize player stats
    playersStats = initializePlayerStats();
    
    // Generate the meeples
    generateMeeples();

    // Generate the cards for a new game
    // [TO DO] Randomly draw 5 cards from the deck, and put them in an array
    // Harcode cards for now
    let cardsInPlay = ["dragon", "tiger", "ox", "monkey", "cobra"];
    
    // Use the first element in cardsInPlay to determine start player
    let startPlayer = allCards[allCards.findIndex((element)=>element.id===cardsInPlay[0])].start;
    currentPlayerId = startPlayer; // Update currentPlayerId to be start player

    // Generate the cards
    playerPositions(cardsInPlay[0], holdP1);
    playerPositions(cardsInPlay[1], playP1);
    playerPositions(cardsInPlay[2], playP1);
    playerPositions(cardsInPlay[3], playP2);
    playerPositions(cardsInPlay[4], playP2);
}

// Function to clear the board, before resetting
const clearBoard = () => {
    // Select all elements that are programmatically created, which include: meeples and cards
    const allDisciples = document.querySelectorAll(".disciple-meeple");
    const allMasters = document.querySelectorAll(".master-meeple");
    const allCardsToRemove = document.querySelectorAll(".cards");
    const nextButtonToRemove = document.querySelector("#next-player");

    // remove all the created elements
    if (allDisciples !== []) {allDisciples.forEach((d) => d.remove());}
    if (allMasters !== []) {allMasters.forEach((m) => m.remove());}
    if (allCardsToRemove !== []) {allCardsToRemove.forEach((c) => c.remove());}
    if (nextButtonToRemove !== null) {nextButtonToRemove.remove();}
    
    // Re-initialize all variables
    currentPlayerId = "";
    nextPlayerId = "";
    nextPlayerIndex = 1;
    selectedCardId = "";
    selectedCardMoves = "";
    cardsInPlayArea = [];
    selectedMeepleId = "";
    selectedMeeplePosition = 0;
    currentPlayerMeeplesId = [];
    nextPlayerMeeples = [];
    nextPlayerMeeplesId = [];
    activeSpaces = [];
}