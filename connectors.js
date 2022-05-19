function clearBoard() {
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
    clearBoard()
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
    document.getElementById("display-names-and-scores").style.display = "none"
    document.getElementById("current-player").style.display = "none"
}

function drawPlayerTurnIndicactor(moveHistory) {
    console.log("drawPlayerTurnIndicator was called.")

    document.getElementById("current-player").style.display = "block"
    const turnColour = moveHistory.flat().at(-3) === "red" ? "yellow" : "red"
    document.getElementById("current-player-indicator").style.backgroundColor = turnColour
}

function drawNamesAndScores () {
    console.log("drawNamesAndScores was called.")

    const names = getNames()
    console.log(names)
    for (let i = 0; i<names.length; i++) {
        document.getElementById(`display-player-${i+1}-name`).innerText = names[i]
    }
    document.getElementById("display-names-and-scores").style.display = "block"
}

function displayScores() {
    console.log("displayScores was called.")


}


function positionClick(rowIndex, columnIndex) {
    takeTurn(rowIndex, columnIndex)
    const board = getBoard()
    drawBoard(board)
    drawPlayerTurnIndicactor(moveHistory);
    checkWinner();
}

function submitNamesClick() {
    console.log("submitNamesClick was called.")

    let player = []
    for (let i=0; i<=1; i++) {
        player[i] = document.getElementById(`player-${i+1}-input`).value
    }    
    setNames(player)
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
    clearBoard()
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

// Bind the click event for the submit-button button.
const clearNamesButton = document.getElementById("clear-names-button");
clearNamesButton.addEventListener("click", clearNamesClick);

// Bind the click event for the reset button.
const resetButton = document.getElementById("reset-game-button");
resetButton.addEventListener("click", resetClick);
