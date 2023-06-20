console.log("Test");

const image_links = [
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

// const testing = playersStats[0].meeples.filter((element)=>element.life>0)
// for (let t of testing) {
//     console.log(t.id);
// }

let cardsInPlay = [];
// let startPlayer = "";
let currentPlayer = "";
let gameState = "Ongoing";

// Function to fill the board with meeples
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
                let url = image_links[image_links.findIndex((element)=>element.name === "master1")].link;
                masterImage.src = url;
            };
            if (i === 7) {
                let url = image_links[image_links.findIndex((element)=>element.name === "master2")].link;
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
                let url = image_links[image_links.findIndex((element)=>element.name === "disciple1")].link;
                discipleImage.src = url;
            };
            if (i >= 5) {
                let url = image_links[image_links.findIndex((element)=>element.name === "disciple2")].link;
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
    currentPlayer = startPlayer;

    // Initialize all cards
    const holdP1 = document.getElementById("hold-1");
    const playP1 = document.getElementById("play-1");
    const playP2 = document.getElementById("play-2");

    generateCard(cardsInPlay[0], holdP1);
    generateCard(cardsInPlay[1], playP1);
    generateCard(cardsInPlay[2], playP1);
    generateCard(cardsInPlay[3], playP2);
    generateCard(cardsInPlay[4], playP2);
}

// const startGame = () => {
//     const allCardsInPlay = document.querySelectorAll(".cards");
//     // Add clickable class on cards that are in current player's play area
    
//     for (let c of allCardsInPlay) {
//         const cardsInPlayArea = document.querySelectorAll(`#${currentPlayer} .cards`);
//         cardsInPlayArea.forEach((card)=>card.classList.add("clickable"));
//         const clickableCards = document.querySelectorAll(".clickable");
//         for (let n of clickableCards) {
//             activateCard(n, currentPlayer);
//         }
//         if (currentPlayer = "play-1") {currentPlayer = "play-2"}
//         if (currentPlayer = "play-2") {currentPlayer = "play-1"}
//     }
// }

resetBoard();
// startGame();
// console.log(currentPlayer);

const squares = document.querySelectorAll(".square");
squares.forEach((square) => {
    square.addEventListener("click", (event) => {
        console.log("target ", event.target);
        console.log("current target ", event.currentTarget);
        console.log("ChildNode ", event.currentTarget.firstChild);
        console.log("ChildNodeId ", event.currentTarget.firstChild.id);
    })
})