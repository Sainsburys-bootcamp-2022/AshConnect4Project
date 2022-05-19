function clearDrawnBoard() {
    console.log("clearBoard was called.")

    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = "cadetblue"
        }
    }   
}

function drawBoard(board) {
    console.log("drawBoard was called.")

    document.getElementById("game-board").style.display = "block"
    clearDrawnBoard()
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            if (!board[rowIndex][columnIndex]) {
                continue;
            }
            const cellText = board[rowIndex][columnIndex] === "red" ? "red" : "yellow"
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = cellText
        }
    }
}

function hideGame() {
    console.log("hideGame was called")

    document.getElementById("game-board").style.display = "none"
    document.getElementById("names-and-scores").style.display = "none"
    document.getElementById("current-player").style.display = "none"
}

function drawPlayerTurnIndicactor(historyLog) {
    console.log("drawPlayerTurnIndicator was called.")

    let turnColour = "red"
    document.getElementById("current-player").style.display = "block"
    if (historyLog.length > 0) {
        turnColour = historyLog.flat().at(-3) === "red" ? "yellow" : "red"
    }
    document.getElementById("current-player-indicator").style.backgroundColor = turnColour
    const currentPlayerName = redsTurn === true ? players[0] : players[1]
    document.getElementById("current-player-name").innerText = currentPlayerName
}

function drawNamesAndScores () {
    console.log("drawNamesAndScores was called.")

    const names = getNames()
    console.log(names)
    for (let i = 0; i<names.length; i++) {
        document.getElementById(`display-player-${i+1}-name`).innerText = names[i]
    }
    document.getElementById("names-and-scores").style.display = "block"
}

function displayScores() {
    console.log("displayScores was called.")

}


function positionClick(rowIndex, columnIndex) {
    console.log("positionClick was called.")

    takeTurn(rowIndex, columnIndex)
    const board = getBoard()
    drawBoard(board)
    checkWinner();
    drawPlayerTurnIndicactor(moveHistory);

}

function ifWinner() {
    console.log("ifWinner was called.")

    document.getElementById("play-again-button").style.display = "block"
}

function submitNamesClick() {
    console.log("submitNamesClick was called.")

    let players = []
    for (let i=0; i<=1; i++) {
        players[i] = document.getElementById(`player-${i+1}-input`).value
    }    
    setNames(players)
    startGame()
}

function startGame() {
    console.log("startGame was called.")

    document.getElementById("submit-names").style.display = "none"
    drawBoard(board)
    drawPlayerTurnIndicactor(moveHistory)
    drawNamesAndScores()
}

function clearNamesClick() {
    console.log("clearNamesClick was called.")

    for (let i = 0; i<=1; i++){
        document.getElementById(`player-${i+1}-input`).value = ""
    }
}

function resetClick() {
    console.log("resetClick was clicked.")

    hideGame()
    clearNamesClick()
    document.getElementById("submit-names").style.display = "block"
    resetGame()
    clearDrawnBoard()
}

function undoClick() {
    console.log("undoClick was called.")

    undoLastMove()
    drawBoard(board)
    drawPlayerTurnIndicactor(moveHistory)
}

function playAgainClick() {
    console.log("playAgainClick was called.")

    
}

function clearBoardClick() {
    console.log("clearBoardButton was called.")

    clearDrawnBoard()
    redsTurnFunc()
    resetGame()
    drawPlayerTurnIndicactor(moveHistory)
}

// Bind the click events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}

// Bind the click event for the submit-button button.
const submitNamesButton = document.getElementById("submit-names-button");
submitNamesButton.addEventListener("click", submitNamesClick);

// Bind the click event for the clear-names-button.
const clearNamesButton = document.getElementById("clear-names-button");
clearNamesButton.addEventListener("click", clearNamesClick);

// Bind the click event for the reset-game-button.
const resetButton = document.getElementById("reset-game-button");
resetButton.addEventListener("click", resetClick);

// Bind the click event for the undo-last-move-button.
const undoButton = document.getElementById("undo-last-move-button");
undoButton.addEventListener("click", undoClick);

// Bind the click event for the clear-board-button.
const clearBoardButton = document.getElementById("clear-board-button");
clearBoardButton.addEventListener("click", clearBoardClick);

// Bind the click event for the play-again-button.
const playAgainButton = document.getElementById("play-again-button");
playAgainButton.addEventListener("click", playAgainClick);
