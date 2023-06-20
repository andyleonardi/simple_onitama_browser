// Main JS file to start game


// For how-to box
const howToContainer = document.querySelector(".how-to-text");

// When how-to button is clicked, it will run this function
// function checks if the how-to is already visible. If yes, close the box, if no, show the box.
const howToButton = () => {
    if (howToContainer.innerHTML === "") {
        generateQuickHowTo();
        return;
    } else {
        howToContainer.innerHTML = "";
        return;
    }
}

// Function to show the box
const generateQuickHowTo = () => {
    const howToBox = document.createElement("div");
    howToBox.classList.add("how-to-box");
    howToContainer.appendChild(howToBox);

    const howToTextTitle = document.createElement("p");
    howToTextTitle.textContent = "Onitama is a simple game of tactics that can be completed in 15 minutes";
    howToBox.appendChild(howToTextTitle);
    const howToTextList = document.createElement("ol");
    howToBox.appendChild(howToTextList);
    let howToTextList1 = document.createElement("li");
    let howToTextList2 = document.createElement("li");
    let howToTextList3 = document.createElement("li");
    let howToTextList4 = document.createElement("li");
    let howToTextList5 = document.createElement("li");
    let howToTextList6 = document.createElement("li");
    let howToTextList7 = document.createElement("li");

    howToTextList1.innerText = "Select card in your play area (center) - each card will show you the possible moves";
    howToTextList2.innerText = "You have two choices, and the other card in your holding area will be available in your next turn";
    howToTextList3.innerText = "Select which disciples or master you want to move - where they can move depends on the card you selected";
    howToTextList4.innerText = "Click on the eligible square to move your selected meeple there";
    howToTextList5.innerText = "That's it! The card you selected will become available for your opponent in their future turns";
    howToTextList6.innerText = "Click Next Player button once done, and it's the next player's turn";
    howToTextList7.innerText = "Game ends when a player defeats the other player's Master";

    howToTextList.appendChild(howToTextList1);
    howToTextList.appendChild(howToTextList2);
    howToTextList.appendChild(howToTextList3);
    howToTextList.appendChild(howToTextList4);
    howToTextList.appendChild(howToTextList5);
    howToTextList.appendChild(howToTextList6);
    howToTextList.appendChild(howToTextList7);
}

let currentPlayerId = "";
let nextPlayerId = "";
let nextPlayerIndex = 1;
let selectedCardId = "";
let selectedCardMoves = "";
let cardsInPlayArea = [];
let selectedMeepleId = "";
let selectedMeeplePosition = 0;
let currentPlayerMeeplesId = [];
let nextPlayerMeeples = [];
let nextPlayerMeeplesId = [];
let activeSpaces = [];

// Define the function gameStart
const gameStart = () => {
    // First clear the board
    clearBoard();
    // Then initialize board with cards and meeples
    resetBoard();
    // Then start first player turn
    gameTurn(currentPlayerId);
}


// Listen to click of the how-to button
document.querySelector("#quick-how-to").addEventListener("click", howToButton);

// Listen to click of the start game button
document.querySelector("#start-button").addEventListener("click", gameStart);