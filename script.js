console.log("Test");

const image_links = [
    {
        name: "disciple1",
        link: "https://github.com/andyleonardi/simple_onitama_browser/blob/main/images/disciple%201.png?raw=true"
    },
    {
        name: "disciple2",
        link: "https://github.com/andyleonardi/simple_onitama_browser/blob/main/images/disciple%202.png?raw=true"
    },
    {
        name: "master1",
        link: "https://github.com/andyleonardi/simple_onitama_browser/blob/main/images/sensei%201.jpg?raw=true"
    },
    {
        name: "master2",
        link: "https://github.com/andyleonardi/simple_onitama_browser/blob/main/images/sensei%202.jpg?raw=true"
    }
];

const playersStats = [
    {
        player: "play-1",
        meeples: [{id:"meeple-3", life:1, status: "master"},
                  {id:"meeple-1", life:1, status: "disciple"},
                  {id:"meeple-2", life:1, status: "disciple"},
                  {id:"meeple-4", life:1, status: "disciple"},
                  {id:"meeple-5", life:1, status: "disciple"}]
    },
    {
        player: "play-2",
        meeples: [{id:"meeple-23", life:1, status: "master"},
                  {id:"meeple-21", life:1, status: "disciple"},
                  {id:"meeple-22", life:1, status: "disciple"},
                  {id:"meeple-24", life:1, status: "disciple"},
                  {id:"meeple-25", life:1, status: "disciple"}]
    }
];

// const testing = playersStats[0].meeples.filter((element)=>element.life>0)
// for (let t of testing) {
//     console.log(t.id);
// }

let cardsInPlay = [];
let startPlayer = "";

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
            // See below. Passing variable does not work, hard-coding links for now
            if (i === 2) {
                // let url = image_links[image_links.findIndex((element)=>element.name === "master1")].link;
                masterImage.src = "https://github.com/andyleonardi/simple_onitama_browser/blob/main/images/sensei%201.jpg?raw=true";
            };
            if (i === 7) {
                // let url = image_links[image_links.findIndex((element)=>element.name === "master2")].link;
                masterImage.src = "https://github.com/andyleonardi/simple_onitama_browser/blob/main/images/sensei%202.jpg?raw=true";
            };
            // masterImage.setAttribute("src", `${url}`);
            // masterImage.src = url;
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
            // Somehow using variable to define url does not work when passing url to img's src
            // commented out the array method & hard-coding for now
            if (i < 5) {
                // let url = image_links[image_links.findIndex((element)=>element.name === "disciple1")].link;
                // console.log(url); <== this returns the right link, but setAttribute didn't work
                discipleImage.src = "https://github.com/andyleonardi/simple_onitama_browser/blob/main/images/disciple%201.png?raw=true";   
            };
            if (i >= 5) {
                // let url = image_links[image_links.findIndex((element)=>element.name === "disciple2")].link;
                discipleImage.src = "https://github.com/andyleonardi/simple_onitama_browser/blob/main/images/disciple%202.png?raw=true";
            };
            // discipleImage.setAttribute("src", `${url}`);
            discipleMeeple.appendChild(discipleImage);
        }
    }
}

// Function to highlight clickable meeples & add event listener
const activateMeeples = (who) => {
    // Get the index of the current player, so we can get the ids of the meeples
    let playerIndex = playersStats.findIndex((element)=>element.player===who);
    let remainingMeeples = playersStats[playerIndex].meeples.filter((element)=>element.life>0);
    for (let e of remainingMeeples) {
        document.querySelector(`#${e.id}`).style.backgroundColor = "gold";
        document.querySelector(`#${e.id}`).addEventListener("click", (evt)=>{
            // On click of one of the pawns, Run another function that does:
                // Take the position of the clicked pawn
                // Make an array of possible position, using the above formula.
                // Let’s say the array is [17, 12, 19, 14]
                // For each element in the array, document.querySelector the space with id = element
                // Change the CSS property of those selected space, maybe just change the background color
                // Add event listener, if user clicks on one of them, append the pawn there
                // Update the position of the pawn, and remove the pawn from the original position.
        })
    }
}

const startGame = () => {
    // Initialize the meeples to their starting location
    resetBoard();
    // [TO DO] Randomly draw 5 cards from the deck, and put them in an array
    // Harcode cards for now
    let cardsInPlay = [dragon, tiger, ox, monkey, cobra];
    
    // Use the first element in cardsInPlay to determine start player, but since cardsInPlay now contain functions,
    // need to find a way to make it string
    // In the meantime, hardcode [NBED]
    startPlayer = allCards[allCards.findIndex((element)=>element.id==="dragon")].start;
    let currentPlayer = startPlayer;

    // Initialize all cards
    const holdP1 = document.getElementById("hold-1");
    const playP1 = document.getElementById("play-1");
    const playP2 = document.getElementById("play-2");

    cardsInPlay[0](holdP1);
    cardsInPlay[1](playP1);
    cardsInPlay[2](playP1);
    cardsInPlay[3](playP2);
    cardsInPlay[4](playP2);

    // Add click event listener on cards that are in current player's play area
    const cardsInPlayArea = document.querySelectorAll(`#${currentPlayer} .cards`);
    // console.log("selection: ", cardsInPlayArea[0]);
    for (let n of cardsInPlayArea) {
        n.addEventListener("click", (evt)=>{
            console.log("clicked this: ", evt.currentTarget);
            document.querySelector(".cards").style.backgroundColor = "white";
            document.querySelector(`#${n.id}`).style.backgroundColor = "gold";
            // Function to highlight current player's meeples
            activateMeeples(currentPlayer);
            // For each of those meeples, add click event listener
            
            
            // If player clicks the other card, return the function for the other card, which should work the same way as this
        })
    }
}

startGame();

// NOTE 
// Stopped at toggling highlights. If user click another card, 
// it should remove highlight the other card
