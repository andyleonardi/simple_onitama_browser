// This file holds all the main functions in for a player's turn

// let nextPlayerId = "";
// let nextPlayerIndex = 1;
// let selectedCardId = "";
// let selectedCardMoves = "";
// let cardsInPlayArea = [];
// let selectedMeepleId = "";
// let selectedMeeplePosition = 0;
// let currentPlayerMeeplesId = [];
// let nextPlayerMeeples = [];
// let nextPlayerMeeplesId = [];
// let activeSpaces = [];

// Main turn function
const gameTurn = (playerId) => {
    // Initialize a series of variables to be used later
    let currentPlayerIndex = playersStats.findIndex((element)=>element.player===playerId);
    let currentPlayerHoldId = playersStats[currentPlayerIndex].holder;
    nextPlayerIndex = playersStats.findIndex((element)=>element.player!==playerId);
    nextPlayerId = playersStats[nextPlayerIndex].player;
    let nextPlayerHoldId = playersStats[nextPlayerIndex].holder;

    let currentPlayerMeeples = playersStats[currentPlayerIndex].meeples.filter((element)=>element.life===1);
    currentPlayerMeeplesId = [];
    for (let meeple of currentPlayerMeeples) {
        currentPlayerMeeplesId.push(meeple.id);
    }
    nextPlayerMeeples = playersStats[nextPlayerIndex].meeples;
    nextPlayerMeeplesId = [];
    for (let meeple of nextPlayerMeeples) {
        nextPlayerMeeplesId.push(meeple.id);
    }
    
    // For each card in current player's area, add click listener, and
    // attach the clicked event info to pre-defined variables above
    // Then remove all click listeners

    cardsInPlayArea = document.querySelectorAll(`#${playerId} .cards`);
    cardsInPlayArea.forEach((card) => {
        card.addEventListener("click", selectCardAction);
    })

    // For each meeples of the current player, add click listener,
    // attach the clicked event info to pre-defined variables above
    // Then remove all click listeners
 
    currentPlayerMeeplesId.forEach((meep) => {
        document.getElementById(`${meep}`).addEventListener("click", selectMeepleAction);
    })
}

// Function to store selected card
const selectCardAction = (event) => {
    selectedCardId = event.currentTarget.id;
    let selectedCardIndex = allCards.findIndex((card) => card.id===selectedCardId);
    if (currentPlayerId === "play-1") {selectedCardMoves = allCards[selectedCardIndex].moves};
    if (currentPlayerId === "play-2") {selectedCardMoves = allCards[selectedCardIndex].moves2};
    console.log(selectedCardMoves);
    cardsInPlayArea.forEach((card) => {
        card.removeEventListener("click", selectCardAction);
    })
}

// Function to store selected meeple, its location, its possible moves and then invoke the moveAction
const selectMeepleAction = (event) => {
    selectedMeepleId = event.currentTarget.id;
    selectedMeeplePosition = Number(event.currentTarget.parentNode.id);
    console.log("selected ", selectedMeepleId, " and its position is ", selectedMeeplePosition)
    currentPlayerMeeplesId.forEach((meep) => {
        document.getElementById(`${meep}`).removeEventListener("click", selectMeepleAction);
    })
    // Get the possible spaces based on the updated variables
    activeSpaces = [];
    activateSpace(); 
    // activateSpace also will listen for clicks on the eligible positions and invoke the moveAction
}

// Function that will generate eligible spaces based on selected card and meeple
const activateSpace = () => {
    // First get the eligible spaces array
    for (let move of selectedCardMoves) {
        let possibleSpace = selectedMeeplePosition + move[0] + (5 * move[1])
        if (possibleSpace > 0 && possibleSpace < 26) {
            activeSpaces.push(possibleSpace);
        }
    }
    
    // For each activeSpaces, add click listener that moves selected meeple to that new space
    console.log("active spaces selected: ", activeSpaces);
    activeSpaces.forEach((space) => {
        console.log("space", document.getElementById(`${space}`));
        document.getElementById(`${space}`).addEventListener("click", moveAction);
    })
}

// Function that will move meeple around and check victory condition
const moveAction = (event) => {
    // Store the selected space in variables
    let selectedSpaceId = event.currentTarget.id;
    let selectedSpace = event.currentTarget;
    // Store the html element of the selected meeple (we only stored its id previously)
    let selectedMeeple = document.querySelector(`#${selectedMeepleId}`);

    // If selected space is empty
    if (selectedSpace.innerHTML === "") {
        console.log("no opponent present");
        // directly append the selected meeple html element to the new space
        selectedSpace.appendChild(selectedMeeple);
        activeSpaces.forEach((space) => {
            document.getElementById(`${space}`).removeEventListener("click", moveAction);
        })
        // Before moving on to the next player, need to move selected cards to opponent's hold area
        moveCards();
        // Change current player
        currentPlayerId = nextPlayerId;
        createNextButton(); // Needs to be clicked
        return waitForClick(); // Return the click event that will switch to next player
    }

    // if selected space is not empty & contains opponent's meeples
    else if (nextPlayerMeeplesId.includes(selectedSpace.firstChild.id) === true) {
        console.log("opponent present!");
        // Check which of opponent's meeples is present
        let whichMeeple = nextPlayerMeeplesId.findIndex((element) => element === selectedSpace.firstChild.id);
        // Update that meeple's life to 0
        playersStats[nextPlayerIndex].meeples[whichMeeple].life = 0
        // For victory condition check
        playersMeeplesLife[nextPlayerIndex][whichMeeple] = 0
        // Remove the opponent's meeple HTML element
        selectedSpace.innerHTML = "";
        // Move selected meeple to this new space
        selectedSpace.appendChild(selectedMeeple);
        activeSpaces.forEach((space) => {
            document.getElementById(`${space}`).removeEventListener("click", moveAction);
        })
        // Check if the removed meeple was opponent's Master
        if (checkWin() === true) {return;};
        // If not, proceed as per normal. Move cards
        moveCards();
        // Change current player, and surface Next Player button
        currentPlayerId = nextPlayerId;
        createNextButton();
        return waitForClick();
    }

    // if selected space is not empty & contains own meeples
    else if (currentPlayerMeeplesId.includes(selectedSpace.firstChild.id) === true) {
        console.log("hey, that's a friendly");
        // remove click event for itself & do nothing else
        document.getElementById(`${selectedSpaceId}`).removeEventListener("click", moveAction);
    }
}

// Function that moves selected card to opponent's hold area, and move next card to player's area
const moveCards = () => {
    if (currentPlayerId === "play-1") {
        // Remove selected card from play area
        document.querySelector(`#${selectedCardId}`).remove();
        // Generate the seleted card to opponent's hold area
        playerPositions(selectedCardId, holdP2);
        // Define the card currently in player's hold area, so that we can move it
        const nextCard = holdP1.firstElementChild;
        // Append it to player's play area
        playP1.appendChild(nextCard);
    }
    if (currentPlayerId === "play-2") {
        // Same logic as above
        document.querySelector(`#${selectedCardId}`).remove();
        playerPositions(selectedCardId, holdP1);
        const nextCard = holdP2.firstElementChild;
        playP2.appendChild(nextCard);
    }
}

// Function that listens for the Next Player button to be clicked
// When clicked, it will remove the button, and it will invoke the main gameTurn function again, but with new currentPlayerId
const waitForClick = () => {
    document.querySelector("#next-player").addEventListener("click", (event) => {
        console.log("next button clicked");
        document.querySelector("#next-player").remove();
        gameTurn(currentPlayerId)
    })
}

// Function to create next player button, which is to switch between players
const createNextButton = () => {
    const rightSide = document.querySelector(".next-button");
    const nextButton = document.createElement("div");
    nextButton.setAttribute("id", "next-player");
    nextButton.textContent = "Next Player";
    rightSide.appendChild(nextButton);
}

// Store all meeples' life in an array
let player1MeeplesLife = [];
for (let element of playersStats[0].meeples) {
    player1MeeplesLife.push(element.life);
}
let player2MeeplesLife = [];
for (let element of playersStats[1].meeples) {
    player2MeeplesLife.push(element.life);
}
let playersMeeplesLife = [];
playersMeeplesLife.push(player1MeeplesLife);
playersMeeplesLife.push(player2MeeplesLife);
// playersMeeplesLife will be an array of length 2, one for P1, one for P2, and each element
// is an array of 5, with array[0] being the Master's life

// Function to check if a player's Master is removed, because that will trigger game end
const checkWin = () => {
    if (playersMeeplesLife[0][0] === 0) {
        alert("player 2 Wins!"); // throws alert for the winner
        return true;
    }
    else if (playersMeeplesLife[1][0] === 0) {
        alert("player 1 Wins!");
        return true;
    }
    else {return false;} // do nothing
}