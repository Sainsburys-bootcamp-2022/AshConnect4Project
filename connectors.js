const pageLoad = () => {
    console.log("pageLoad was called.")
    document.getElementById("current-player").style.display = "none"
    document.getElementById("game-board").style.display = "none"
    document.getElementById("names-and-scores").style.display = "none"
    document.getElementById("submit-names").style.display = "block"
}
pageLoad()

const startNewGame = () => {
    console.log("startNewGame was called.")
    document.getElementById("submit-names").style.display = "none"
    document.getElementById("current-player").style.display = "block"
    document.getElementById("game-board").style.display = "block"
    document.getElementById("names-and-scores").style.display = "block"
    document.getElementById("main").style.opacity = 1
    document.getElementById("clear-board-button").style.display = "block"
    document.getElementById("play-again-button").style.display = "none"
    displayUndoButton(false)
    writePlayerNames()
    writePlayerScores()
    displayTurnIndicator()
    setTurnsTaken(0)
    changeGameColours()
}

const drawBoard = () => {
    console.log("drawBoard was called.")
    clearBoard()
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            if (!board[rowIndex][columnIndex]) {
                continue;
            }
            const cellText = board[rowIndex][columnIndex] === playerColours[0] ? playerColours[0] : playerColours[1]
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = cellText
        }
    }
}

const clearBoard = () => {
    console.log("clearBoard was called.")
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            const colour = getBackgroundColour()
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = colour
        }
    }
}

const displayTurnIndicator = () => {
    console.log("displayTurnIndicator was called.")
    const moves = getMoveHistory()
    let turnColour = playerColours[0]
    if (moves.length > 0) {
        turnColour = (moves.flat().at(-3) === playerColours[0]) ? playerColours[1] : playerColours[0]
    }
    document.getElementById("current-player-indicator").style.backgroundColor = turnColour
    const names = getPlayerNames()
    if (turnColour === playerColours[0]) {
        document.getElementById("current-player-name").innerText = names[0]
    } else {
        document.getElementById("current-player-name").innerText = names[1]
    }
}

const writePlayerNames = () => {
    console.log("writePlayerNames was called.")
    const names = getPlayerNames()
    for(i in names) {
        document.getElementById(`display-player-${parseInt(i)+1}-name`).innerHTML = names[i]
    }
}

const writePlayerScores = () => {
    console.log("writePlayerScores was called.")
    const scores = getPlayerScores()
    console.log("scores:", getPlayerScores())
    for (i in scores) {
        document.getElementById(`player-${parseInt(i)+1}-score`).innerHTML = scores[i]
    }
}

const gameResult = (result) => {
    console.log("gameResult was called.")
    if (result === playerColours[0]) {
        setPlayerScores(1, null)
        endGame(result)
    } else if (result === playerColours[1]) {
        setPlayerScores(null, 1)
        endGame(result)
    } else if (result === "draw") {
        endGame(result)
    }
}

const endGame = (result) => {
    console.log("endGame was called.")
    setGameOver(true)
    writePlayerScores()
    if (result === playerColours[0]) {
        result = 0
    } else if (result === playerColours[1]) {
        result = 1
    }
    const names = getPlayerNames()
    if (result === "draw") {
        document.getElementById("display-winner").innerText = `DRAW!`
    } else {
        document.getElementById("display-winner").innerText = `The Winner is ${names[result]}!`
    }
    displayUndoButton(false)
    document.getElementById("play-again-button").style.display = "block"
    document.getElementById("clear-board-button").style.display = "none"
    document.getElementById("end-game").style.display = "block"
    document.getElementById("main").style.opacity = 0.5
}

const clearWinnerDisplay = () => {
    console.log("clearWinnerDisplay was called.")
    document.getElementById("display-winner").innerText = ""
}

const displayUndoButton = (bool) => {
    console.log("displayUndoButton was called.")
    if (bool) {
        document.getElementById("undo-last-move-button").style.display = "block"
    } else {
        document.getElementById("undo-last-move-button").style.display = "none"
    }
    const turns = getTurnsTaken()
    if (turns === 0) {
        document.getElementById("undo-last-move-button").style.display = "none"
    }
}



////// BUTTON CLICK FUNCTIONS //////////

const positionClick = (rowIndex, columnIndex) => {
    console.log("positionClick was called.")
    if (getGameOver() === false) {
        takeTurn(rowIndex, columnIndex)
        const result = checkWinner(board)
        gameResult(result)
    }
}

const submitNamesClick = () => {
    console.log("submitNamesClick was called.")
    //function to check if the name boxes are empty.
    const checkIfNamesEntered = () => {
        for (let i=0; i<=1; i++) {
            if (document.getElementById(`player-${i+1}-input`).value === "") {
                return false
            }
        }
        return true
    }
    //sets the names and colours of the players.
    if (checkIfNamesEntered) {
        const selectedColours = [document.getElementById(`player-1-colour`).value, document.getElementById(`player-2-colour`).value]
        if (selectedColours[0] === selectedColours[1]) {
            alert("Please select different colours for each Player!")
        } else {
            let enteredNames = []
            for (let i=0; i<=1; i++) {
                enteredNames[i] = document.getElementById(`player-${i+1}-input`).value
            }
            setPlayerNames(enteredNames)
            setPlayerColours(selectedColours)
            setCurrentColour(playerColours[0])
            startNewGame()
            clearNamesClick()
    }
    } else {
        alert("Please enter names for both Players.") 
    }
}

const clearNamesClick = () => {
    console.log("clearNamesClick was called.")
    document.getElementById(`player-${1}-input`).value = ""
    document.getElementById(`player-${2}-input`).value = ""
}

const undoClick = () => {
    console.log("undoClick was called.")
    let moves = [...getMoveHistory()]
    const lastMove = moves.at(-1)
    board[lastMove[1]][lastMove[2]] = null
    moves.pop()
    setMoveHistory(null, null, null, moves)
    setTurnsTaken(-1)
    drawBoard()
}

const clearBoardClick = () => {
    console.log("clearBoardClick was called.")
    resetBoard()
    clearBoard()
    setTurnsTaken(0)
}

const resetClick = () => {
    console.log("reset Click was called.")
    clearBoardClick()
    clearWinnerDisplay()
    pageLoad()
    setPlayerScores(0, 0)   
}

const playAgainClick = () => {
    console.log("playAgainClick was called.")
    document.getElementById("main").style.opacity = 1
    displayTurnIndicator()
    setTurnsTaken(0)
    clearBoard()
    resetBoard()
    clearWinnerDisplay()
    setGameOver(false)
    document.getElementById("play-again-button").style.display = "none"
    displayUndoButton(true)
}

const changeGameColours = () => {
    console.log("changeGameColours was called.")
    const backgroundColour = document.getElementById("background-colour").value
    setBackgroundColour(backgroundColour)
    document.getElementById("main").style.backgroundColor = backgroundColour
    const columns = document.querySelectorAll('.column')
    columns.forEach(element => element.style.backgroundColor = backgroundColour)
    const gridColour = document.getElementById("grid-colour").value
    setGridColour(gridColour)
    document.getElementById("grid").style.backgroundColor = gridColour
    document.getElementById("grid-stand").style.backgroundColor = gridColour
}

///// ------ Click Events ------ /////

// Bind the click events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}

// Bind the click event for the submit-button button.
const submitNamesButton = document.getElementById("submit-names-button")
submitNamesButton.addEventListener("click", submitNamesClick)

// Bind the click event for the clear-names-button.
const clearNamesButton = document.getElementById("clear-names-button")
clearNamesButton.addEventListener("click", clearNamesClick)

// Bind the click event for the reset-game-button.
const resetButton = document.getElementById("reset-game-button")
resetButton.addEventListener("click", resetClick)

// Bind the click event for the undo-last-move-button.
const undoButton = document.getElementById("undo-last-move-button")
undoButton.addEventListener("click", undoClick)

// Bind the click event for the clear-board-button.
const clearBoardButton = document.getElementById("clear-board-button")
clearBoardButton.addEventListener("click", clearBoardClick)

// Bind the click event for the play-again-button.
const playAgainButton = document.getElementById("play-again-button")
playAgainButton.addEventListener("click", playAgainClick)
