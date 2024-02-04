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

const chooseError = document.getElementById('chooseError');
const turnInstruction = document.getElementById('turnInstruction');

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
                console.log('Square clicked', key);
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
    // render();
    turnInstruction.style.color = '#651FFF';
    turnInstruction.innerText = "Player 1, it's your turn.";
};

const render = function() {

};

const chooseSquare = function(square) {
    console.log('Click event triggered');
    // check if there is a winner - if not, execute function
    if (!state.winner) {
        if (!square.innerHTML) {
            const piece = (state.player === 'player1') ? pieces.naught : pieces.cross;
            // set the innerHTML of the selected square with current player's piece
            square.innerHTML = piece;
            // dynamically set color based on the player
            square.classList.add((state.player === 'player1') ? 'naught' : 'cross');
            chooseError.innerText = '';
            chooseError.style.display = 'none';
            turnInstruction.style.display = 'block';
            turnInstruction.style.color = (state.player === 'player1') ? '#00ACC1' : '#651FFF';
        } else {
            // the square is already taken
            // console.log('This square is taken. Choose an empty square.');
            chooseError.innerText = 'This square is taken. Choose an empty square.';
            // show turnInstruction when an occupied square is clicked
            chooseError.style.display = 'block';
            turnInstruction.style.display = 'none';
            return;
        }
        // switch to next player
        switchPlayer();
        // check for a winner after each move
        checkForWinner();
        turnInstruction.innerText = `Player ${state.player.charAt(state.player.length - 1)}, it's your turn!`;
        // render updated state
        render();
    }
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