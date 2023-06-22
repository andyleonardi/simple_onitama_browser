// This file is to store all information on cards, player meeples and images

/////// ########    ########    ########    ######## ///////
// Store meeple images
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
/////// ########    ########    ########    ######## ///////


/////// ########    ########    ########    ######## ///////
// Every player has 1 Master & 4 Disciples, and each has their own play area and hold area (for cards)
// To determine victory and to track how many disciples are left, we store "life". If life = 0, the disciple or master is gone

// Function to store player stats in an array
initializePlayerStats = () => {
    const playersStats = [
        {
            player: "play-1",
            meeples: [{id:"meeple-13", life:1, status: "master"},
                    {id:"meeple-11", life:1, status: "disciple"},
                    {id:"meeple-12", life:1, status: "disciple"},
                    {id:"meeple-14", life:1, status: "disciple"},
                    {id:"meeple-15", life:1, status: "disciple"}],
            holder: "hold-1"
        },
        {
            player: "play-2",
            meeples: [{id:"meeple-53", life:1, status: "master"},
                    {id:"meeple-51", life:1, status: "disciple"},
                    {id:"meeple-52", life:1, status: "disciple"},
                    {id:"meeple-54", life:1, status: "disciple"},
                    {id:"meeple-55", life:1, status: "disciple"}],
            holder: "hold-2"
        }
    ];
    return playersStats;
}
/////// ########    ########    ########    ######## ///////


/////// ########    ########    ########    ######## ///////
// Board & card configuration
// 25 | 24 | 23 | 22 | 21
// ----------------------
// 20 | 19 | 18 | 17 | 16
// ----------------------
// 15 | 14 | 13 | 12 | 11
// ----------------------
// 10 |  9 |  8 |  7 |  6
// ----------------------
//  5 |  4 |  3 |  2 |  1
// ----------------------

// 55 | 54 | 53 | 52 | 51
// ----------------------
// 45 | 44 | 43 | 42 | 41
// ----------------------
// 35 | 34 | 33 | 32 | 31
// ----------------------
// 25 | 24 | 23 | 22 | 21
// ----------------------
// 15 | 14 | 13 | 12 | 11
// ----------------------


// Get it to work with just 5 cards: tiger, ox, monkey, dragon, cobra
// [TO DO] Add all 16 cards and add a randomizer function for each game

// Moves & Moves2 are based on the board configuration above. Essentially:
// along the x-axis, right is +, left is -
// along the y-axis, up is + multiplied by 5, down is - multiplied by 5
// moves represents the orientation for player 1, moves2 represents the orientation for player 2 (which is reversed)

// Store card information on array
const allCards = [ 
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
    },
    // Above 5 cards were what was used in MVP, below are the other 11 cards available in the game
    {
        id: "crab",
        image: "images/cobra.jpeg",
        moves: [[2,0],[-2,0],[0,1]],
        moves2: [[-2,0],[2,0],[0,-1]],
        name: "Crab",
        start: "play-2"
    },
    {
        id: "crane",
        image: "images/cobra.jpeg",
        moves: [[1,-1],[-1,-1],[0,1]],
        moves2: [[-1,1],[1,1],[0,-1]],
        name: "Crane",
        start: "play-2"
    },
    {
        id: "elephant",
        image: "images/cobra.jpeg",
        moves: [[1,0],[-1,0],[1,1],[-1,1]],
        moves2: [[-1,0],[1,0],[-1,-1],[1, -1]],
        name: "Elephant",
        start: "play-1"
    },
    {
        id: "mantis",
        image: "images/cobra.jpeg",
        moves: [[1,1],[-1,1],[0,-1]],
        moves2: [[-1,-1],[1,-1],[0,1]],
        name: "Mantis",
        start: "play-1"
    },
    {
        id: "boar",
        image: "images/cobra.jpeg",
        moves: [[1,0],[-1,0],[0,1]],
        moves2: [[-1,0],[1,0],[0,-1]],
        name: "Boar",
        start: "play-1"
    },
    {
        id: "frog",
        image: "images/cobra.jpeg",
        moves: [[2,0],[1,1],[-1,-1]],
        moves2: [[-2,0],[-1,-1],[1,1]],
        name: "Frog",
        start: "play-1"
    },
    {
        id: "goose",
        image: "images/cobra.jpeg",
        moves: [[1,0],[-1,0],[-1,-1],[1,1]],
        moves2: [[-1,0],[1,0],[1,1],[-1,-1]],
        name: "Goose",
        start: "play-2"
    },
    {
        id: "horse",
        image: "images/cobra.jpeg",
        moves: [[1,0],[0,1],[0,-1]],
        moves2: [[-1,0],[0,-1],[0,1]],
        name: "Horse",
        start: "play-1"
    },
    {
        id: "eel",
        image: "images/cobra.jpeg",
        moves: [[1,1],[1,-1],[-1,0]],
        moves2: [[-1,-1],[-1,1],[1,0]],
        name: "Eel",
        start: "play-2"
    },
    {
        id: "rabbit",
        image: "images/cobra.jpeg",
        moves: [[1,-1],[-1,1],[-2,0]],
        moves2: [[-1,1],[1,-1],[2,0]],
        name: "Rabbit",
        start: "play-2"
    },
    {
        id: "rooster",
        image: "images/cobra.jpeg",
        moves: [[1,0],[-1,0],[1,-1],[-1,1]],
        moves2: [[-1,0],[1,0],[-1,1],[1,-1]],
        name: "Rooster",
        start: "play-1"
    }
];
/////// ########    ########    ########    ######## ///////