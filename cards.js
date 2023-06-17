// Board & card configuration
// 21 | 22 | 23 | 24 | 25
// ----------------------
// 16 | 17 | 18 | 19 | 20
// ----------------------
// 11 | 12 | 13 | 14 | 15
// ----------------------
//  6 |  7 |  8 |  9 | 10
// ----------------------
//  1 |  2 |  3 |  4 |  5
// ----------------------

const allCards = [ // Get it to work with just 5 cards: tiger, ox, monkey, dragon, cobra
    {
        id: "tiger",
        image: "images/tiger.jpeg",
        moves: [[0,2],[0,-1]],
        moves2: [[0,-2],[0,1]],
        name: "Tiger",
        start: "play-2"
    },
    {
        id: "ox",
        image: "images/ox.jpeg",
        moves: [[0,1],[0,-1],[-1,0]],
        moves2: [[0,-1],[0,1],[1,0]],
        name: "Ox",
        start: "play-2"
    },
    {
        id: "monkey",
        image: "images/monkey.jpeg",
        moves: [[-1,-1],[-1,1],[1,-1],[1,1]],
        moves2: [[-1,-1],[-1,1],[1,-1],[1,1]],
        name: "Monkey",
        start: "play-2"
    },
    {
        id: "dragon",
        image: "images/dragon.png",
        moves: [[-2,1],[2,1],[-1,-1],[1,-1]],
        moves2: [[2,-1],[-2,-1],[1,1],[-1,1]],
        name: "Dragon",
        start: "play-1"
    },
    {
        id: "cobra",
        image: "images/cobra.jpeg",
        moves: [[1,0],[-1,1],[-1,-1]],
        moves2: [[-1,0],[1,-1],[1,1]],
        name: "Cobra",
        start: "play-1"
    }
];

// Define card function
// Function to include initializing the cards, and then setting event listener
// Refactored:
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
/*
const activateCard = (n, playerId) => {
    n.addEventListener("click", (event)=>{
        let selectedCard = event.currentTarget;
        selectedCard.classList.add("active-card");
        let selectedCardId = event.currentTarget.id;
        
        // After clicking the card, user need to click on its own meeples first
        // Get the current player's meeple ids with life > 0
        let playerIndex = playersStats.findIndex((element)=>element.player===playerId);
        let remainingMeeples = playersStats[playerIndex].meeples.filter((element)=>element.life>0);

        // For each remaining meeples, add click event listener
        for (let e of remainingMeeples) {
            // On click, run the activateMeeple function
            activateMeeple(e.id, selectedCardId, playerIndex);
            // document.querySelector(`#${e.id}`).addEventListener("click", activateMeeple);
        }
    })
}

const activateMeeple = (meepleId, cardId, playerIndex) => {
    document.querySelector(`#${meepleId}`).addEventListener("click", (event) => {
        let getMeeplePosition = Number(event.currentTarget.parentNode.id);
        event.currentTarget.classList.add("selected-meeple");
        // After highlighting the selected meeple, run the activateBoard function
        // which is the meat of the program
        activateBoard(cardId, getMeeplePosition, playerIndex);
    })
}

// Function to highlight the squares based on the card selected,
// and to indicate whether square is valid for selection or not
const activateBoard = (cardId, position, playerIndex) => {
    // Find the index of the card id in allCards array
    const indexNum = allCards.findIndex((element)=>element.id===cardId);

    let activeSquare = position;
    let activeSquares = [];
    const squares = document.querySelectorAll(".square");
    
    // Store squares which can be activated in activeSquares array
    for (i = 0 ; i < allCards[indexNum].moves.length ; i++) {
        activeSquare = position + allCards[indexNum].moves[i][0] + (5 * allCards[indexNum].moves[i][1]);
        activeSquares.push(activeSquare);
    }
    
    // We only want to highlight activeSquares, and add event listener to these squares
    // First add a class name for active squares
    squares.forEach((square)=>{
        if (activeSquares.findIndex((element)=>element===Number(square.id)) >= 0) {
            square.classList.add("activated"); // Highlight 
        }
    })
    // Then add event listener to all activated squares
    const highlightedSquares = document.querySelectorAll(".activated");
    highlightedSquares.forEach((asquare)=>{
        moveAction(asquare, playerIndex);
        // asquare.addEventListener("click", moveAction);
    })
}

const removeAllTempClass = () => {
    let tempMeeple = document.querySelector(".selected-meeple");
    tempMeeple.classList.remove("selected-meeple");

    let tempActivatedSquares = document.querySelectorAll(".activated");
    tempActivatedSquares.forEach((element)=>element.classList.remove("activated"));

    let tempActiveCard = document.querySelector(".active-card");
    tempActiveCard.classList.remove("active-card");


}

const moveCards = (currentPlayerIndex, nextPlayerIndex) => {
    let activeCard = document.querySelector(".active-card");
    let nextHoldId = playersStats[nextPlayerIndex].holder;
    let nextHoldArea = document.querySelector(`#${nextHoldId}`);
    
    nextHoldArea.appendChild(activeCard);

    let currentHoldId = playersStats[currentPlayerIndex].holder;
    let currentHoldContent = document.querySelector(`#${currentHoldId}`).firstElementChild;
    let currentPlayArea = document.getElementById(`${playersStats[currentPlayerIndex].player}`);

    currentPlayArea.appendChild(currentHoldContent);
}

const moveAction = (a, playerIndex) => {
    a.addEventListener("click",  (event) => {
        console.log(event.currentTarget);
        let moveTarget = event.currentTarget;
        let currentPlayer = playersStats[playerIndex].player;
        let opponentIndex = playersStats.findIndex((element)=>element.player!==currentPlayer);
        
        // Check if the square is not empty
        // First, if the square is empty, take the selected meeple and move it there
        // Remove all the other highlighted squares and return
        if (moveTarget.innerHTML === "") {
            console.log("correct condition");
            let selectedMeeple = document.querySelector(".selected-meeple");
            moveTarget.appendChild(selectedMeeple);
            // let originalSquare = document.getElementById(`#${position}`);
            // originalSquare.innerHTML = ""; // Apparently we don't need to remove content, appending it to other squares moves it
            moveCards(playerIndex, opponentIndex);
            removeAllTempClass();
            return switchPlayer;
        } else if (targetMeeple === playersStats[playerIndex].player) {
        // If it's not empty
            let targetMeeple = moveTarget.id;
            console.log("you clickd");
            // If it contains own player's meeples
                // do nothing
        } else {
                // this will be opponent's meeples
                let selectedMeeple = document.querySelector(".selected-meeple");
                
                // update opponent meeple life to 0
                let opponentMeepleList = playersStats[opponentIndex].meeples;
                let targetMeepleIndex = opponentMeepleList.findIndex((element)=>element.id===targetMeeple);
                console.log(targetMeepleIndex);
                
                opponentMeepleList[targetMeepleIndex].life = 0;

                // remove innerHTML
                moveTarget.innerHTML = "";
                
                // move selected meeple here
                moveTarget.appendChild(selectedMeeple);
                checkVictory();
                moveCards(playerIndex, opponentIndex);
                removeAllTempClass();
                return switchPlayer;
        }
    })
}

const switchPlayer = (cp) => {
    if (cp === "play-1") {currentPlayer = "play-2"}
    if (cp === "play-2") {currentPlayer = "play-1"}
    startGame();
}

const checkVictory = () => {
    let masterIndexP1 = playersStats[0].meeples.findIndex((element)=>element.status==="master");
    let masterIndexP2 = playersStats[1].meeples.findIndex((element)=>element.status==="master");
    if (playersStats[0].meeples[masterIndexP1].life === 0) {
        alert("player 2 Wins!");
    }
    if (playersStats[1].meeples[masterIndexP2].life === 0) {
        alert("player 1 Wins!");
    }
    resetBoard();
    startGame();
}
*/