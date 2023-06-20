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

// Store player stats in an array
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
    }
];
/////// ########    ########    ########    ######## ///////