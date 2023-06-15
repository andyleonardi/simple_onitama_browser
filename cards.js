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
        image: "/images/tiger.jpeg",
        moves: [[0,2],[0,-1]],
        name: "Tiger",
        start: "play-2"
    },
    {
        id: "ox",
        image: "https://i.imgur.com/EHMlMVu.jpeg",
        moves: [[0,1],[0,-1],[1,0]],
        name: "Ox",
        start: "play-2"
    },
    {
        id: "monkey",
        image: "https://i.imgur.com/MxcySr9.jpeg",
        moves: [[-1,-1],[-1,1],[1,-1],[1,1]],
        name: "Monkey",
        start: "play-2"
    },
    {
        id: "dragon",
        image: "https://i.imgur.com/tyR6oZ8.png",
        moves: [[-2,1],[2,1],[-1,-1],[1,-1]],
        name: "Dragon",
        start: "play-1"
    },
    {
        id: "cobra",
        image: "https://i.imgur.com/pHZ7C77.jpeg",
        moves: [[-1,0],[1,1],[1,-1]],
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



const tiger = (doc) => {
    // Generate the card
    const cardOutline = document.createElement("div");
    cardOutline.classList.add("cards");
    cardOutline.setAttribute("id", "tiger");
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
    cardImg.src = "https://i.imgur.com/GleAY3f.jpeg";
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
    
    const indexNum = allCards.findIndex((element)=>element.id==="tiger");
    let newSpace = 0;
    for (j = 0 ; j < allCards[indexNum].moves.length ; j++) {
        newSpace = 13 + allCards[indexNum].moves[j][0] + (5 * allCards[indexNum].moves[j][1]);
        let selectedCardSquare = document.querySelector(`#tiger #card-${newSpace}`);
        selectedCardSquare.style.backgroundColor = "gray";
    }

    // Finally, generate the content that goes to the bottom side of the card, i.e. the name of the card
    const cardName = document.createElement("p");
    cardName.classList.add("card-name");
    cardName.textContent = "Tiger";
    botCard.appendChild(cardName);

    // // Add click event listener
    // cardOutline.addEventListener("click", (evt)=> {
    //     // Hardcode for now [NBED]
    //     const currentPlayerMeeples = ["disciple-1", "disciple-2", "disciple-4", "disciple-5", "master-3"];
    //     // Highlight player’s pawns to indicate that they should click on which one they want to move
    //     for (let e of currentPlayerMeeples) {
    //         document.querySelector(`#${e}`).style.backgroundColor = "orange";
    //         // Add event listener on each of the player’s pawns
    //     }    
    // })
    
    // Add event listener on each of the player’s pawns, and on the card in player’s area.
    // On click of one of the pawns, Run another function:
    // Take the position of the clicked pawn
    // Make an array of possible position, using the above formula.
    // Let’s say the array is [17, 12, 19, 14]
    // For each element in the array, document.querySelector the space with id = element
    // Change the CSS property of those selected space, maybe just change the background color
    // Add event listener, if user clicks on one of them, append the pawn there
    // Update the position of the pawn, and remove the pawn from the original position.
    // If player clicks the other card, return the function for the other card, which should work the same way as this

}

const ox = (doc) => {
    // Generate the card
    const cardOutline = document.createElement("div");
    cardOutline.classList.add("cards");
    cardOutline.setAttribute("id", "ox");
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
    cardImg.src = "https://i.imgur.com/EHMlMVu.jpeg";
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
    
    const indexNum = allCards.findIndex((element)=>element.id==="ox");
    let newSpace = 0;
    for (j = 0 ; j < allCards[indexNum].moves.length ; j++) {
        newSpace = 13 + allCards[indexNum].moves[j][0] + (5 * allCards[indexNum].moves[j][1]);
        let selectedCardSquare = document.querySelector(`#ox #card-${newSpace}`);
        selectedCardSquare.style.backgroundColor = "gray";
    }

    // Finally, generate the content that goes to the bottom side of the card, i.e. the name of the card
    const cardName = document.createElement("p");
    cardName.classList.add("card-name");
    cardName.textContent = "Ox";
    botCard.appendChild(cardName);

    //
}

const monkey = (doc) => {
    // Generate the card
    const cardOutline = document.createElement("div");
    cardOutline.classList.add("cards");
    cardOutline.setAttribute("id", "monkey");
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
    cardImg.src = "https://i.imgur.com/MxcySr9.jpeg";
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
    
    const indexNum = allCards.findIndex((element)=>element.id==="monkey");
    let newSpace = 0;
    for (j = 0 ; j < allCards[indexNum].moves.length ; j++) {
        newSpace = 13 + allCards[indexNum].moves[j][0] + (5 * allCards[indexNum].moves[j][1]);
        let selectedCardSquare = document.querySelector(`#monkey #card-${newSpace}`);
        selectedCardSquare.style.backgroundColor = "gray";
    }

    // Finally, generate the content that goes to the bottom side of the card, i.e. the name of the card
    const cardName = document.createElement("p");
    cardName.classList.add("card-name");
    cardName.textContent = "Monkey";
    botCard.appendChild(cardName);

    //
}

const dragon = (doc) => {
    // Generate the card
    const cardOutline = document.createElement("div");
    cardOutline.classList.add("cards");
    cardOutline.setAttribute("id", "dragon");
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
    cardImg.src = "https://i.imgur.com/tyR6oZ8.png";
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
    
    const indexNum = allCards.findIndex((element)=>element.id==="dragon");
    let newSpace = 0;
    for (j = 0 ; j < allCards[indexNum].moves.length ; j++) {
        newSpace = 13 + allCards[indexNum].moves[j][0] + (5 * allCards[indexNum].moves[j][1]);
        let selectedCardSquare = document.querySelector(`#dragon #card-${newSpace}`);
        selectedCardSquare.style.backgroundColor = "gray";
    }

    // Finally, generate the content that goes to the bottom side of the card, i.e. the name of the card
    const cardName = document.createElement("p");
    cardName.classList.add("card-name");
    cardName.textContent = "Dragon";
    botCard.appendChild(cardName);

    //
}

const cobra = (doc) => {
    // Generate the card
    const cardOutline = document.createElement("div");
    cardOutline.classList.add("cards");
    cardOutline.setAttribute("id", "cobra");
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
    cardImg.src = "https://i.imgur.com/pHZ7C77.jpeg";
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
    
    const indexNum = allCards.findIndex((element)=>element.id==="cobra");
    let newSpace = 0;
    for (j = 0 ; j < allCards[indexNum].moves.length ; j++) {
        newSpace = 13 + allCards[indexNum].moves[j][0] + (5 * allCards[indexNum].moves[j][1]);
        let selectedCardSquare = document.querySelector(`#cobra #card-${newSpace}`);
        selectedCardSquare.style.backgroundColor = "gray";
    }

    // Finally, generate the content that goes to the bottom side of the card, i.e. the name of the card
    const cardName = document.createElement("p");
    cardName.classList.add("card-name");
    cardName.textContent = "Cobra";
    botCard.appendChild(cardName);

    //
}