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

const winCombo = {
    topRow: [board.tLeft, board.tCenter, board.tRight],
    middleRow: [board.mLeft, board.mCenter, board.mRight],
    bottomRow: [board.lLeft, board.lCenter, board.lRight],
    leftColumn: [board.tLeft, board.mLeft, board.lLeft],
    middleColumn: [board.tCenter, board.mCenter, board.lCenter],
    rightColumn: [board.tRight, board.mRight, board.lRight],
    diagonalUp: [board.lLeft, board.mCenter, board.tRight],
    diagonalDown: [board.tLeft, board.mCenter, board.lRight]
};

const chooseError = document.getElementById('chooseError');
const turnInstruction = document.getElementById('turnInstruction');
const winMessage = document.getElementById('winMessage');
const tieMessage =  document.getElementById('isTie');

/*----- state variables -----*/
const state = {
    winner: false,
    player: '',
};

let winningPlayer = '';
let isTie = 'false';

const currentPlayer = state.player;
const resetButton = document. getElementById('resetButton');

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

resetButton.addEventListener('click', function () {
    resetGame();
});

	/*----- functions -----*/
const render = function() {
    console.log(state);
}

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
    winningPlayer = state.player;
    if (state.player === 'player1') {
        state.player = 'player2';
    } else {
        state.player = 'player1';
    }
};

const checkForWinner = function() {
    winningPlayer = '';

    for (const combo in winCombo) {
        const squares = winCombo[combo];
        const piece = squares[0].classList.contains('naught') ? 'player1' : 'player2';

        if (piece !== '' && squares.every(function(square) {
            return square.classList.contains(piece === 'player1' ? 'naught' : 'cross');
        })) {
            state.winner = true;
            winningPlayer = piece;
            winMessage.innerText = 'Player ' + winningPlayer.charAt(winningPlayer.length - 1) + ' wins!';
            winMessage.style.display = 'block';
            turnInstruction.style.display = 'none';
            render();
            return;
        }
    }

    // Check for a tie
    isTie = true;
    for (const key in board) {
        if (board.hasOwnProperty(key) && board[key] !== null && board[key].innerHTML === '') {
            isTie = false;
            break;
        }
    }

    if (isTie) {
        state.winner = true;
        document.getElementById('isTie').innerHTML = "&#9825; It's a tie!";
        document.getElementById('isTie').style.display = 'block';
        turnInstruction.style.display = 'none';
        winMessage.style.display = 'none'; // hide winMessage if it's a tie
        render();
        return;
    }
};

function resetGame() {
    console.log('Resetting the game...')
    // clear the board
    Object.values(board).forEach(function(square) {
        if (square !== null) {
            square.innerHTML = '';
            square.classList.remove('naught', 'cross');
        }
    });
    // reset state variables
    state.winner = false;
    state.player = 'player1';
    isTie = false;
    // messages
    chooseError.innerText = '';
    turnInstruction.innerHTML = "Player 1, it's your turn.";
    turnInstruction.style.display = 'block';
    turnInstruction.style.color = '#651FFF';
    winMessage.style.display = 'none';
    tieMessage.style.display = 'none';
    console.log('Reset complete. Checking instructions:', turnInstruction.innerHTML );
};

init();

});