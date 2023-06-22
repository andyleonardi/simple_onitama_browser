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

    // Log whose turn is it
    if (currentPlayerIndex === 0) {logText.textContent = "Player 1's Turn";}
    if (currentPlayerIndex === 1) {logText.textContent = "Player 2's Turn";}

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
    // Need to remove previously highlighted card
    const prevActiveCard = document.querySelector(".active-card");
    // console.log("previous card ", prevActiveCard);
    if (prevActiveCard !== null) {prevActiveCard.classList.remove("active-card")};
    
    selectedCardId = event.currentTarget.id;
    logText.textContent = `${selectedCardId} selected`;
    // console.log("selected card ", selectedCardId);
    event.currentTarget.classList.add("active-card");
    let selectedCardIndex = allCards.findIndex((card) => card.id===selectedCardId);
    if (currentPlayerId === "play-1") {selectedCardMoves = allCards[selectedCardIndex].moves};
    if (currentPlayerId === "play-2") {selectedCardMoves = allCards[selectedCardIndex].moves2};
    // console.log(selectedCardMoves);
    // Since we want players to be able to change their card selection, I shifted the removeEventListener part to meeple click listener
    // What this means is, players can change card selection until they click on a meeple. That's when they lock in their choice
    // cardsInPlayArea.forEach((card) => {
    //     card.removeEventListener("click", selectCardAction);
    // })
}

// Function to store selected meeple, its location, its possible moves and then invoke the moveAction
const selectMeepleAction = (event) => {
    // Remove click listener from card once a meeple is selected
    cardsInPlayArea.forEach((card) => {
        card.removeEventListener("click", selectCardAction);
    })

    // We want to remove the highlight on previously selected meeple
    const prevActiveMeeple = document.getElementById(`${selectedMeepleId}`);
    // Remove the highlight on previous active spaces
    document.querySelectorAll(".square").forEach((square)=>square.classList.remove("activated"));
    // console.log("previous meeple ", prevActiveMeeple);
    if (prevActiveMeeple !== null) {prevActiveMeeple.classList.remove("activated")};

    selectedMeepleId = event.currentTarget.id;
    logText.textContent = `${selectedCardId} selected, ${selectedMeepleId} selected`;
    event.currentTarget.classList.add("activated");
    selectedMeeplePosition = Number(event.currentTarget.parentNode.id);
    // console.log("selected ", selectedMeepleId, " and its position is ", selectedMeeplePosition)
    // Similarly to card selection above, we want players to be able to make changes on their meeple selection
    // currentPlayerMeeplesId.forEach((meep) => {
    //     document.getElementById(`${meep}`).removeEventListener("click", selectMeepleAction);
    // })
    // Get the possible spaces based on the updated variables
    activeSpaces = [];
    activateSpace(); 
    // activateSpace also will listen for clicks on the eligible positions and invoke the moveAction
}

// Function that will generate eligible spaces based on selected card and meeple
const activateSpace = () => {
    // First get the eligible spaces array
    for (let move of selectedCardMoves) {
        let possibleSpaceId = selectedMeeplePosition + move[0] + (10 * move[1]);
        let possibleSpace = document.getElementById(`${possibleSpaceId}`);
        if (allSquaresId.includes(possibleSpaceId) === true) {
            if (possibleSpace.innerHTML !== "") {
                if (currentPlayerMeeplesId.includes(possibleSpace.firstChild.id) === false) {
                    activeSpaces.push(possibleSpaceId);
                }
            } else {activeSpaces.push(possibleSpaceId);}
        }
    }
    
    // For each activeSpaces, add click listener that moves selected meeple to that new space
    console.log("active spaces selected: ", activeSpaces);
    activeSpaces.forEach((space) => {
        // console.log("space", document.getElementById(`${space}`));
        // Highlight all the eligible spaces
        document.getElementById(`${space}`).classList.add("activated");
        document.getElementById(`${space}`).addEventListener("click", moveAction);
    })
}

// Function that will move meeple around and check victory condition
const moveAction = (event) => {
    // Remove click listener on other meeples once player select where to move. The move is final!
    currentPlayerMeeplesId.forEach((meep) => {
        document.getElementById(`${meep}`).removeEventListener("click", selectMeepleAction);
    })
    
    // Remove all highlighted things
    document.querySelectorAll(".activated").forEach((active)=>active.classList.remove("activated"));

    // Store the selected space in variables
    let selectedSpaceId = event.currentTarget.id;
    let selectedSpace = event.currentTarget;
    // Store the html element of the selected meeple (we only stored its id previously)
    let selectedMeeple = document.querySelector(`#${selectedMeepleId}`);

    // If selected space is empty
    if (selectedSpace.innerHTML === "") {
        // console.log("no opponent present");
        logText.textContent = `No opponent present, ${selectedMeepleId} moves to space ${selectedSpaceId}`;
        // directly append the selected meeple html element to the new space
        selectedSpace.appendChild(selectedMeeple);
        activeSpaces.forEach((space) => {
            document.getElementById(`${space}`).removeEventListener("click", moveAction);
        })
        // Check if the master meeple is in opponent's temple space
        if (checkWin() === true) {return;};
        // Before moving on to the next player, need to move selected cards to opponent's hold area
        moveCards();
        // Change current player
        currentPlayerId = nextPlayerId;
        createNextButton(); // Needs to be clicked
        return waitForClick(); // Return the click event that will switch to next player
    }

    // if selected space is not empty & contains opponent's meeples
    else if (nextPlayerMeeplesId.includes(selectedSpace.firstChild.id) === true) {
        // console.log("opponent present!");
        logText.textContent = `Opponent present, ${selectedMeepleId} defeats opponent and moves to ${selectedSpaceId}`;
        // Check which of opponent's meeples is present
        let whichMeeple = nextPlayerMeeplesId.findIndex((element) => element === selectedSpace.firstChild.id);
        // Update that meeple's life to 0
        playersStats[nextPlayerIndex].meeples[whichMeeple].life = 0
        // For victory condition check
        // playersMeeplesLife[nextPlayerIndex][whichMeeple] = 0
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
        // console.log("hey, that's a friendly");
        logText.textContent = "Hey, that's yours!";
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
// let player1MeeplesLife = [];
// for (let element of playersStats[0].meeples) {
//     player1MeeplesLife.push(element.life);
// }
// let player2MeeplesLife = [];
// for (let element of playersStats[1].meeples) {
//     player2MeeplesLife.push(element.life);
// }
// let playersMeeplesLife = [];
// playersMeeplesLife.push(player1MeeplesLife);
// playersMeeplesLife.push(player2MeeplesLife);
// playersMeeplesLife will be an array of length 2, one for P1, one for P2, and each element
// is an array of 5, with array[0] being the Master's life

// Function to check if a player's Master is removed, because that will trigger game end
const checkWin = () => {
    // First win condition is when one player's master has been defeated
    
    // if (playersMeeplesLife[0][0] === 0) {
    if (playersStats[0].meeples[0].life === 0) {
        alert("player 2 Wins!"); // throws alert for the winner
        logText.textContent = "Player 2 Wins with the Way of the Stone";
        play2Score = play2Score + 1;
        play2ScoreTracker.textContent = play2Score;
        return true;
    }
    // else if (playersMeeplesLife[1][0] === 0) {
    else if (playersStats[1].meeples[0].life === 0) {
        alert("player 1 Wins!");
        logText.textContent = "Player 1 Wins with the Way of the Stone";
        play1Score = play1Score + 1;
        play1ScoreTracker.textContent = play1Score;
        return true;
    }

    // Second win condition is when one player's master moved into the opponent's temple
    // temple here means center space of their starting row (i.e. where their master started)

    else if (templeSpaceP1.firstChild !== null) {
        if (templeSpaceP1.firstChild.id === "meeple-53") {
            alert("player 2 Wins!"); // throws alert for the winner
            logText.textContent = "Player 2 Wins with the Way of the Stream";
            play2Score = play2Score + 1;
            play2ScoreTracker.textContent = play2Score;
            return true;
        }
    }

    else if (templeSpaceP2.firstChild !== null) {
        if (templeSpaceP2.firstChild.id === "meeple-13") {
            alert("player 1 Wins!");
            logText.textContent = "Player 1 Wins with the Way of the Stream";
            play1Score = play1Score + 1;
            play1ScoreTracker.textContent = play1Score;
            return true;
        }
    }

    else {return false;} // do nothing
}