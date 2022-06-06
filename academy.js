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
    if (num1 === 0 && num2 === 0) {
        playerScores[0] = 0
        playerScores[1] = 0
    } else {
        playerScores[0] += num1
        playerScores[1] += num2
    }
    return playerScores
}

const getPlayerScores = () => {
    console.log("getPlayerScores was called.")
    return playerScores
}

const setMoveHistory = (colour, row, col, arr) => {
    console.log("setMoveHistory was called.")
    moveHistory.push([colour, row, col])
    if (arr) {
        moveHistory = arr
    }
    return moveHistory
}

const getMoveHistory = () => {
    console.log("getMoveHistory was called.")
    return moveHistory
}

const setBoardData = (row, column, colour) => {
    console.log("setBoardData was called.")
    board[row][column] = colour
}

const getBoardData = () => {
    console.log("getBoardData was called.")
    return board
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

const rowCheck = (col, boardData) => {
    console.log("takeTurn was called.")
    for (let i = boardData.length; i > 0; i--) {
        if (boardData[i-1][col] === null) {
            return i-1
        }
    }
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

const checkWinner = (board, turns, colour) => {
    console.log("checkWinner was called.")
    const horizontal = 1 //four values to pass into the direction value for the following function.
    const vertical = -7
    const diagonalLeft = -8
    const diagonalRight = -6
    const checkAllDirections = (directionValue) => { //function to check for a sequence of four of the same colour. Works for all directions.
        console.log(`checkAllDirections was called with directionValue ${directionValue}.`)
        const flatBoard = [...board].flat()     //creates a new array of the board but flattened.
        for (const i in flatBoard) { //starts a loop that goes through every index of the new array.
            const checkColour = (flatBoard[i] === colour) ? true : false //checks if the current index is the current colour.
            if (checkColour) { //if the current index is the current colour. Stops the loop from wasting time by checking the previous colour that was checked last turn.
                const indexes = [parseInt(i), parseInt(i)+directionValue, parseInt(i)+(directionValue*2), parseInt(i)+(directionValue*3)] //sets an array starting at the current index and the next four pieces in the sequence.
                console.log("CURRENT INDEXES:", indexes)
                if (indexes.some(element => element < 0)) { //if any of the current sequenece are a negative number stops this iteration and moves to the next one.
                    console.log("ERROR FOUND: NEGATIVE NUMBER")
                    continue
                }
                const potentialErrors = [[6, 13, 20, 27, 34, 41], [0, 7, 14, 21, 28, 35]] //an array of both sides of the board. Used to check for overlaps errors.
                const rightErrorFound = indexes.some(element => potentialErrors[0].includes(element)) //if the current sequence contains an index from the right side of the board, return true.
                const leftErrorFound = indexes.some(element => potentialErrors[1].includes(element)) //if the current sequence contains an index from the left side of the board, return false.
                if (rightErrorFound && leftErrorFound) { //if the index contains pieces from both sides of the board there can't possibly be a winner, stops this iteration and moves to the next one.
                    console.log("ERROR FOUND: VALUES FROM BOTH SIDES OF BOARD")
                    continue
                }
                const fourValues = [flatBoard.at(indexes[0]), flatBoard.at(indexes[1]), flatBoard.at(indexes[2]), flatBoard.at(indexes[3])] //grabs the colours of the index sequence.
                const fourMatches = fourValues.every(element => element === colour) //if all the colours of the index sequence match the current colour, return true.
                if (fourMatches) { //if the matches are true and there are no errors, return the winning current colour from this function.
                    console.log("I'M HERE:", fourMatches)
                    return colour
                }
            }
        }
    }
    const result = checkAllDirections(horizontal) || checkAllDirections(vertical) || checkAllDirections(diagonalLeft) || checkAllDirections(diagonalRight)  //run the function for each direction, if one has a return, return what it returns.
    if (result) {
        return result
    } else if (turns >= 42) {
        return "draw"
    }
}

module.exports = {
    setPlayerScores,
    setMoveHistory,
    rowCheck,
    checkWinner
}
