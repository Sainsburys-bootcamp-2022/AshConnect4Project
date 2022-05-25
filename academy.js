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
let currentColour = playerColours[0]
let turnsTaken = 0
let moveHistory = []
let gameOver = false
let backgroundColour = "cadetblue"
let gridColour = "blue"


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

const setPlayerColours = (colours) => {
    console.log("setPlayerColours was called.")
    for (i in playerColours){
        playerColours[i] = colours[i]
    }
}

const getPlayerColours = () => {
    console.log("getPlayerColours was called.")
    return playerColours
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
    currentColour = (colour === playerColours[0]) ? playerColours[0] : playerColours[1]
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

const setBackgroundColour = (colour) => {
    console.log("setBackgroundColour was called.")
    backgroundColour = colour
}

const getBackgroundColour = () => {
    console.log("getBackgroundColour was called.")
    return backgroundColour
}

const setGridColour = (colour) => {
    console.log("setGridColour was called.")
    gridColour = colour
}

const getGridColour = () => {
    console.log("getGridColour was called.")
    return gridColour
}

////// GAME FUNCTIONS ///////

const takeTurn = (row, col) => {
    console.log("takeTurn was called.")

    if (board[row][col] === null) {
        console.log("getCurrentColour:", getCurrentColour())
        for (let i = 5; i >= 0; i--) {
            if (board[i][col] === null && getCurrentColour() === playerColours[0]) {
                board[i][col] = playerColours[0]
                setMoveHistory(playerColours[0], i, col)
                displayTurnIndicator()
                setCurrentColour(playerColours[1])
                setTurnsTaken(1)
                break
            } else if (board[i][col] === null && getCurrentColour()  === playerColours[1]) {
                board[i][col] = playerColours[1]
                setMoveHistory(playerColours[1], i, col)
                displayTurnIndicator()
                setCurrentColour(playerColours[0])
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
        const colour = (getCurrentColour() === playerColours[0]) ? playerColours[1] : playerColours[0]
        for (const i in flatBoard) {
            const checkColour = (flatBoard[i] === colour) ? true : false
            if (checkColour) {
                const indexes = [parseInt(i), parseInt(i)+directionValue, parseInt(i)+directionValue+directionValue, parseInt(i)+directionValue+directionValue+directionValue]
                const rightErrors = [6, 13, 20, 27, 34, 41]
                const leftErrors = [0, 7, 14, 21, 28, 35]
                const rightErrorFound = indexes.some(element => rightErrors.includes(element))
                const leftErrorFound = indexes.some(element => leftErrors.includes(element))
                let errorFound = false
                if (rightErrorFound && leftErrorFound) {
                    console.log("ERRORFOUND")
                    errorFound = true
                }
                const fourValues = [flatBoard.at(indexes[0]), flatBoard.at(indexes[1]), flatBoard.at(indexes[2]), flatBoard.at(indexes[3])]
                const fourMatches = fourValues.every(element => element === colour)
                if (fourMatches && !errorFound) {
                    return colour
                }
            }
        }
    }
    return checkAllDirections(horizontal) || checkAllDirections(vertical) || checkAllDirections(diagonalLeft) || checkAllDirections(diagonalRight)
}
