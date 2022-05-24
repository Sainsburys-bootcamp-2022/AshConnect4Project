let board = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]


let playerNames = []
let playerColours = ["red", "yellow"]
let playerScores = [0, 0]
let currentColour = "red"
let turnsTaken = 0
let moveHistory = []
let gameOver = false


////// GETTERS AND SETTERS ///////

const setGameOver = (bool) => {
    console.log("setGameOver was called.")
    gameOver = bool
}

const getGameOver = () => {
    console.log("getGameOver was called.")
    return gameOver
}

const setPlayerNames = (names) => {
    console.log("setPlayerNames was called.")
    for(i in names) {
        playerNames[i] = names[i]
    }
}

const getPlayerNames = () => {
    console.log("getPlayerNames was called.")
    return playerNames
}

const setPlayerColours = () => {
    console.log("setPlayerColours was called.")

}

const getPlayerColours = () => {
    console.log("getPlayerColours was called.")

}

const setPlayerScores = (num1, num2) => {
    console.log("setPlayerScores was called.")
    if (num1 >= 1) {
        playerScores[0] += num1
    } else {
        playerScores[0] = 0
    }

    if (num2 >= 1) {
        playerScores[1] += num2
    } else {
        playerScores[1] = 0
    }
}

const getPlayerScores = () => {
    console.log("getPlayerScores was called.")
    return playerScores
}

const setMoveHistory = (colour, row, col, arr) => {
    console.log("setMoveHistory was called.")
    moveHistory.push([colour, row, col])

    if (arr) {
        console.log("setMoveHistory IF STATEMENT entered.")
        moveHistory = arr
        console.log("moveHistory:", moveHistory)
    }
}

const getMoveHistory = () => {
    console.log("getMoveHistory was called.")
    return moveHistory
}

const setBoardData = () => {
    console.log("setBoardData was called.")
}

const getBoardData = () => {
    console.log("getBoardData was called.")

}

const setCurrentColour = (colour) => {
    console.log("setCurrentColour was called.")
    currentColour = (colour === "red") ? "red" : "yellow"
}

const getCurrentColour = () => {
    //console.log("getCurrentColour was called.")
    return currentColour
}

const setTurnsTaken = (amount) => {
    console.log("setTurnsTaken was called.")
    if (amount === 0) {
        turnsTaken = 0
        displayUndoButton(false)
    } else {
        turnsTaken += amount
        displayUndoButton(true)
    }
}

const getTurnsTaken = () => {
    console.log("getTurnsTaken was called.")
    return turnsTaken
}



////// GAME FUNCTIONS ///////

const takeTurn = (row, col) => {
    console.log("takeTurn was called.")

    if (board[row][col] === null) {
        for (let i = 5; i >= 0; i--) {
            if (board[i][col] === null && getCurrentColour() === "red") {
                board[i][col] = "red"
                setMoveHistory("red", i, col)
                displayTurnIndicator()
                setCurrentColour("yellow")
                setTurnsTaken(1)
                break
            } else if (board[i][col] === null && getCurrentColour()  === "yellow") {
                board[i][col] = "yellow"
                setMoveHistory("yellow", i, col)
                displayTurnIndicator()
                setCurrentColour("red")
                setTurnsTaken(1)
                break
            }
        }
    } else {
        console.log("ERROR: That space is unavilable.")
    }
    drawBoard(board)
}

const resetBoard = () => {
    console.log("resetBoard was called.")
    board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]
}

const checkWinner = (board) => {
    console.log("checkWinner was called.")

    const horizontal = 1
    const vertical = -7
    const diagonalLeft = -8
    const diagonalRight = -6
    const turns = getTurnsTaken()
    const drawnGame = (turns === 42) ? true : false
    if (drawnGame) {
       return "draw"
    }
    const checkAllDirections = (directionValue) => {
        console.log(`checkAllDirections was called with directionValue ${directionValue}.`)
        const flatBoard = [...board].flat()
        const colour = (getCurrentColour() === "red") ? "yellow" : "red"
        for (const i in flatBoard) {
            const checkColour = (flatBoard[i] === colour) ? true : false
            if (checkColour) {
                const fourValues = [flatBoard.at(parseInt(i)), flatBoard.at(parseInt(i)+directionValue), flatBoard.at(parseInt(i)+directionValue+directionValue), flatBoard.at(parseInt(i)+directionValue+directionValue+directionValue)]
                const fourMatches = fourValues.every(element => element === colour)
                const horizontalErrors = [6, 13, 20, 27, 34]
                if ((horizontalErrors.every(element => element != parseInt(i)+2)) && fourMatches) {
                    return colour
                }
            }
        }
    }
    return checkAllDirections(horizontal) || checkAllDirections(vertical) || checkAllDirections(diagonalLeft) || checkAllDirections(diagonalRight)
}
