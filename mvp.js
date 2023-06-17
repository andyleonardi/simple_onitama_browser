const meepleImage = [
    {
        name: "disciple1",
        link: "images/disciple1.png"
    },
    {
        name: "disciple2",
        link: "images/disciple2.png"
    },
    {
        name: "master1",
        link: "images/sensei1.jpg"
    },
    {
        name: "master2",
        link: "images/sensei2.jpg"
    }
];

const playersStats = [
    {
        player: "play-1",
        meeples: [{id:"meeple-3", life:1, status: "master"},
                  {id:"meeple-1", life:1, status: "disciple"},
                  {id:"meeple-2", life:1, status: "disciple"},
                  {id:"meeple-4", life:1, status: "disciple"},
                  {id:"meeple-5", life:1, status: "disciple"}],
        holder: "hold-1"
    },
    {
        player: "play-2",
        meeples: [{id:"meeple-23", life:1, status: "master"},
                  {id:"meeple-21", life:1, status: "disciple"},
                  {id:"meeple-22", life:1, status: "disciple"},
                  {id:"meeple-24", life:1, status: "disciple"},
                  {id:"meeple-25", life:1, status: "disciple"}],
        holder: "hold-2"
    }
];

const holdP1 = document.getElementById("hold-1");
const holdP2 = document.getElementById("hold-2");
const playP1 = document.getElementById("play-1");
const playP2 = document.getElementById("play-2");

let currentPlayerId = "";

const playerPositions = (id, doc) => {
    if (doc === holdP1 || doc === playP1) {
        generateCard(id, doc);
    } else if (doc === holdP2 || doc === playP2) {
        generateCardReverse(id, doc);
    }
}

const resetBoard = () => {
    // Define starting spaces
    const startPosition = [1, 2, 3, 4, 5, 21, 22, 23, 24, 25];
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

    // [TO DO] Randomly draw 5 cards from the deck, and put them in an array
    // Harcode cards for now
    let cardsInPlay = ["dragon", "tiger", "ox", "monkey", "cobra"];
    
    // Use the first element in cardsInPlay to determine start player
    let startPlayer = allCards[allCards.findIndex((element)=>element.id===cardsInPlay[0])].start;
    currentPlayerId = startPlayer;

    // Initialize all cards
    const holdP1 = document.getElementById("hold-1");
    const playP1 = document.getElementById("play-1");
    const playP2 = document.getElementById("play-2");

    playerPositions(cardsInPlay[0], holdP1);
    playerPositions(cardsInPlay[1], playP1);
    playerPositions(cardsInPlay[2], playP1);
    playerPositions(cardsInPlay[3], playP2);
    playerPositions(cardsInPlay[4], playP2);
}


// For each card in current player's area, add click listener, and
// attach the clicked event info to pre-defined variables above
// Then remove all click listeners

const gameStart = () => {
    resetBoard();
    let gameState = "Start"
    // while (gameState !== "End") {
        // console.log(currentPlayerId);
        
        // let currentPlayerIndex = 0;
        // let currentPlayerHoldId = 0;
        // let nextPlayerId = "";
        // let nextPlayerIndex = 1;
        // let nextPlayerHoldId = "";

        // let currentPlayerMeeples = [];
        // let currentPlayerMeeplesId = [];
        // let nextPlayerMeeples = [];
        // let nextPlayerMeeplesId = [];

        // let selectedCardId = "";
        // let selectedCardMoves = "";

        // let selectedMeepleId = "";
        // let selectedMeepleLife = 1;
        // let selectedMeepleSpaceId = 1;

        // let selectedSpaceId = 1;

        
    gameTurn(currentPlayerId);
    // if (checkWin() === true) {gameState = "End"}
    // currentPlayerId = nextPlayerId;
    // }
}

let nextPlayerId = "";
let selectedCardMoves = "";
let cardsInPlayArea = [];
let selectedMeepleId = "";
let selectedMeeplePosition = 0;
let currentPlayerMeeplesId = [];
let nextPlayerMeeplesId = [];
let activeSpaces = [];

const gameTurn = (playerId) => {
    // currentPlayerId = playerId;
    let currentPlayerIndex = playersStats.findIndex((element)=>element.player===playerId);
    let currentPlayerHoldId = playersStats[currentPlayerIndex].holder;
    let nextPlayerIndex = playersStats.findIndex((element)=>element.player!==playerId);
    nextPlayerId = playersStats[nextPlayerIndex].player;
    let nextPlayerHoldId = playersStats[nextPlayerIndex].holder;

    // let selectedCardMoves = "";

    let currentPlayerMeeples = playersStats[currentPlayerIndex].meeples;
    currentPlayerMeeplesId = [];
    for (let meeple of currentPlayerMeeples) {
        currentPlayerMeeplesId.push(meeple.id);
    }
    // currentPlayerMeeplesId = currentPlayerMeeples.id;
    nextPlayerMeeples = playersStats[nextPlayerIndex].meeples;
    nextPlayerMeeplesId = [];
    for (let meeple of nextPlayerMeeples) {
        nextPlayerMeeplesId.push(meeple.id);
    }
    // nextPlayerMeeplesId = nextPlayerMeeples.id;
    
    // console.log(currentPlayerMeeples);

    // For each card in current player's area, add click listener, and
    // attach the clicked event info to pre-defined variables above
    // Then remove all click listeners

    cardsInPlayArea = document.querySelectorAll(`#${playerId} .cards`);
    // console.log(cardsInPlayArea);
    cardsInPlayArea.forEach((card) => {
        card.addEventListener("click", selectCardAction);
    })

    // console.log(selectedCardMoves);
    // For each meeples of the current player, add click listener,
    // attach the clicked event info to pre-defined variables above
    // Then remove all click listeners
 
    currentPlayerMeeplesId.forEach((meep) => {
        document.getElementById(`${meep}`).addEventListener("click", selectMeepleAction);
    })

    

    // return;
    if (checkWin() === true) {
        gameState = "End";
        alert("who won?")
        return;;
    } else {
        return;
    };
}

const selectCardAction = (event) => {
    let selectedCardId = event.currentTarget.id;
    let selectedCardIndex = allCards.findIndex((card) => card.id===selectedCardId);
    if (currentPlayerId === "play-1") {selectedCardMoves = allCards[selectedCardIndex].moves};
    if (currentPlayerId === "play-2") {selectedCardMoves = allCards[selectedCardIndex].moves2};
    console.log(selectedCardMoves);
    cardsInPlayArea.forEach((card) => {
        card.removeEventListener("click", selectCardAction);
    })
}

const selectMeepleAction = (event) => {
    selectedMeepleId = event.currentTarget.id;
    // console.log("meeple id ", selectedMeepleId);
    // console.log("parent node ", event.currentTarget.parentNode);
    selectedMeeplePosition = Number(event.currentTarget.parentNode.id);
    console.log("selected ", selectedMeepleId, " and its position is ", selectedMeeplePosition)
    currentPlayerMeeplesId.forEach((meep) => {
        document.getElementById(`${meep}`).removeEventListener("click", selectMeepleAction);
    })
    // Get the possible spaces based on the updated variables
    activeSpaces = [];
    activateSpace();
    
}

const activateSpace = () => {
    for (let move of selectedCardMoves) {
        let possibleSpace = selectedMeeplePosition + move[0] + (5 * move[1])
        if (possibleSpace > 0) {
            activeSpaces.push(possibleSpace);
        }
    }
    // return activeSpaces;
    // For each activeSpaces, add click listener that moves selected meeple to that new space
    console.log("active spaces selected: ", activeSpaces);
    activeSpaces.forEach((space) => {
        console.log("space", document.getElementById(`${space}`));
        document.getElementById(`${space}`).addEventListener("click", moveAction);
    })
}

const moveAction = (event) => {
    console.log(event.target);
    let selectedSpaceId = event.currentTarget.id;
    let selectedSpace = event.currentTarget;
    let selectedMeeple = document.querySelector(`#${selectedMeepleId}`);

    // If selected space is empty
    if (selectedSpace.innerHTML === "") {
        
        selectedSpace.appendChild(selectedMeeple);
        activeSpaces.forEach((space) => {
            document.getElementById(`${space}`).removeEventListener("click", moveAction);
        })
        currentPlayerId = nextPlayerId;
        return;
    }
    // if selected space is not empty & contains opponent's meeples
    else if (nextPlayerMeeplesId.includes(selectedSpace.firstChild.id) === true) {
        playersStats[nextPlayerId].meeples[nextPlayerMeeplesId.findIndex((element) => element === selectedSpace.firstChild.id)].life = 0;        
        selectedSpace.innerHTML = "";
        selectedSpace.appendChild(selectedMeeple);
        activeSpaces.forEach((space) => {
            document.getElementById(`${space}`).removeEventListener("click", moveAction);
        })
        currentPlayerId = nextPlayerId;
        return;
    }

    // if selected space is not empty & contains own meeples
    else if (currentPlayerMeeplesId.includes(selectedSpace.firstChild.id) === true) {
        // remove click event for itself
        document.getElementById(`${selectedSpaceId}`).removeEventListener("click", moveAction);
    }
}

const checkWin = () => {
    let masterIndexP1 = playersStats[0].meeples.findIndex((element)=>element.status==="master");
    let masterIndexP2 = playersStats[1].meeples.findIndex((element)=>element.status==="master");
    if (playersStats[0].meeples[masterIndexP1].life === 0) {
        alert("player 2 Wins!");
        return true;
    }
    else if (playersStats[1].meeples[masterIndexP2].life === 0) {
        alert("player 1 Wins!");
        return true;
    }
    else {return false;}
}

// resetBoard();
gameStart();