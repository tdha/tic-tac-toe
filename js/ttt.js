document.addEventListener('DOMContentLoaded', function(){

/*----- constants -----*/
const pieces = {
    naught: '&#10752;',
    cross: '&#10754;'
};

const board = {
    tLeft: document.getElementById('topLeft'),
    tCenter: document.getElementById('topCenter'),
    tRight: document.getElementById('topRight'),
    mLeft: document.getElementById('midLeft'),
    mCenter: document.getElementById('midCenter'),
    mRight: document.getElementById('midRight'),
    lLeft: document.getElementById('lowLeft'),
    lCenter: document.getElementById('lowCenter'),
    lRight: document.getElementById('lowRight')
};
// console log to output which element is causing null
// for (const key in board) {
//     if (board.hasOwnProperty(key) && board[key] === null) {
//         console.error("Element with ID '${key}' is not found.");
//     }
// }


/*----- state variables -----*/
const state = {
    winner: false,
    player: '',
};

const currentPlayer = state.player;

	/*----- cached elements  -----*/
const elements = {
    
};

	/*----- event listeners -----*/
function addClickListenersToBoard() {
    Object.entries(board).forEach(([key, square]) => {
        if (square !== null) {
            square.addEventListener('click', function() {
                chooseSquare(square);
            });
        // } else {
        //     console.error(`Element with ID '${key}' is null or not found.`);
        }
    });
};

	/*----- functions -----*/
const init = function() {
    // initialise the state variables
    state.winner = false;
    state.player = 'player1';
    // render those variables to the page
    // wait for the user to click a square
    addClickListenersToBoard();
    render();
};

const render = function() {

};

const chooseSquare = function(square) {
    // check if there is a winner - if not, execute function
    if (!state.winner) {
        if (!square.innerHTML) {
            const piece = (state.player === 'player1') ? pieces.naught : pieces.cross;
            // set the innerHTML of the selected square with current player's piece
            square.innerHTML = piece;
            // dynamically set color based on the player
            square.classList.add((state.player === 'player1') ? 'naught' : 'cross');
        }
    } else {
    // the square is already taken
    console.log('This square is already taken. Choose an empty square.');
    }
    // switch to next player
    switchPlayer();
    // check for a winner after each move
    checkForWinner();
    // render updated state
    render();
};

const switchPlayer = function() {
    if (state.player === 'player1') {
        state.player = 'player2';
    } else {
        state.player = 'player1';
    }
};

const checkForWinner = function() {

};

init();

});