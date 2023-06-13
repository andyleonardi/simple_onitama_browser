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

let cardsInPlay = [];

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
            masterMeeple.setAttribute("id",`master-${startPosition[i]}`); // Add ID
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
            console.log("selected ", discipleSpace);
            const discipleMeeple = document.createElement("div");
            discipleMeeple.classList.add("disciple-meeple");
            discipleMeeple.setAttribute("id",`disciple-${startPosition[i]}`);
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

resetBoard();

/*
const startGame = () => {
    // Initialize the meeples to their starting location

    // [TO DO] Randomly draw 5 cards from the deck, and put them in an array
    // Harcode cards for now
    let cardsInPlay = [tiger, ox, monkey, dragon, boar];
    // Initialize all cards
    const holdP1 = document.getElementById("hold-1");
    const playP1 = document.getElementById("play-1");
    const playP2 = document.getElementById("play-2");

    cardsInPlay[0](holdP1);
    cardsInPlay[1](playP1);
    cardsInPlay[2](playP1);
    cardsInPlay[3](playP2);
    cardsInPlay[4](playP2);
}
*/