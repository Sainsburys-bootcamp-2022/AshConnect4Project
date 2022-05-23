let board = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]

let moveHistory = []
let redsTurn = true
let players = []
let playerScores = [0,0]
let turnsTaken = 0
let gameOver = false


const redsTurnFunc = () => {redsTurn = true}

const setPlayerColour = (colour) => {
    console.log("setPlayerColour was called.")

    return colour
}

const getPlayerColour = () => {
    console.log("getPlayerColour was called.")

}


function takeTurn(row, col) {
    console.log(`takeTurn was called with row: ${row}, column: ${col}.`)

    if (!gameOver) {
        if (board[row][col] === null) {
            for (let i = 5; i >= 0; i--) {
                if (board[i][col] === null && redsTurn) {
                    board[i][col] = "red"
                    storeMoves("red", i, col)
                    turnsTaken++
                    redsTurn = false
                    break
                } else if (board[i][col] === null && !redsTurn) {
                    board[i][col] = "yellow"
                    storeMoves( "yellow", i, col)
                    turnsTaken++
                    redsTurn = true
                    break
                }
            }
        } else {
            console.log("That piece is unavilable.")
        }
    }
    
}

const storeMoves = (colour, row, col) => {moveHistory.push([colour, row, col])}

const getBoard = () => {return board}


function resetGame() {
    console.log("resetGame was called.")

    document.getElementById("end-game").style.display = "none"
    moveHistory = []
    turnsTaken = 0
    gameOver = false
    board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]
    return board
}

const setNames = (names) => players = [...names]
const getNames = () => players


const setScores = (player1, player2) => {
    console.log("setScores was called.")
    
    playerScores[0] += player1
    playerScores[1] += player2
    return playerScores
}

const getScores = () => playerScores


function checkWinner(board) {
    console.log("checkWinner was called.")

    const drawnGame = turnsTaken === 42 ? true : false
    if (drawnGame) {
        gameOver = true
        return "draw"
    }

    const checkforWinner = (directionValue) => {
        console.log(`checkforWinner was called with directionValue ${directionValue}.`)

        let playerColour = ""
        if (!redsTurn) {
            playerColour = "red"
        } else {
            playerColour = "yellow"
        }
        const flatBoard = [...board].flat()
        for (const i in flatBoard) {
            const checkColour = (flatBoard[i] === playerColour) ? true : false
            if (checkColour) {
                const fourValues = [flatBoard.at(parseInt(i)), flatBoard.at(parseInt(i)+directionValue), flatBoard.at(parseInt(i)+directionValue+directionValue), flatBoard.at(parseInt(i)+directionValue+directionValue+directionValue)]
                const fourMatches = fourValues.every(element => element === playerColour)
                const horizontalErrors = [6, 13, 20, 27, 34]
                if ((horizontalErrors.every(element => element != parseInt(i)+2)) && fourMatches) {
                    return playerColour
                }
            }
        }
    }

    return checkforWinner(1) || checkforWinner(-7) || checkforWinner(-8) || checkforWinner(-6)

    //check horizontal
    // for (let i = 0; i <= 42; i++) {
    //     let counter = 0
    //     if (flatBoard[i] === playerColour) {
    //         let k = i;
    //         for (let j = 0; j < 4; j++) {
    //             if (flatBoard[k] === playerColour) {
    //                 counter += 1
    //                 if (counter === 3 && (k === 6 || k === 13 || k === 20 || k === 27 || k === 34)) {
    //                     break
    //                 }
    //                 k++
    //                 if (counter === 4) {
    //                     return playerColour
    //                 }
    //             }
    //         }        
    //     }
    // }

    //check vertical
    // for (let i = 0; i <= 42; i++) {
    //     let counter = 0
    //     if (flatBoard[i] === playerColour) {
    //         let k = i;
    //         for (let j = 0; j < 4; j++) {
    //             if (flatBoard[k] === playerColour) {
    //                 counter += 1
    //                 k -= 7
    //                 if (counter === 4) {
    //                     return playerColour
    //                 }
    //             }
    //         }        
    //     }
    // }

    // //check horizontal-left
    // for (let i = 0; i <= 42; i++) {
    //     let counter = 0
    //     if (flatBoard[i] === playerColour) {
    //         let k = i;
    //         for (let j = 0; j < 4; j++) {
    //             if (flatBoard[k] === playerColour) {
    //                 counter += 1
    //                 k -= 8
    //                 if (counter === 4) {
    //                     return playerColour
    //                 }
    //             }
    //         }        
    //     }
    // }

    // //check horizontal-right
    // for (let i = 0; i <= 42; i++) {
    //     let counter = 0
    //     if (flatBoard[i] === playerColour) {
    //         let k = i;
    //         for (let j = 0; j < 4; j++) {
    //             if (flatBoard[k] === playerColour) {
    //                 counter += 1
    //                 k -= 6
    //                 if (counter === 4) {
    //                     return playerColour
    //                 }
    //             }
    //         }        
    //     }
    // }
}

function noWinner() {
    console.log("noWinner was called.")

    
}

function undoLastMove() {
    console.log("undoLastMove was called.")

    const lastMove = moveHistory.at(-1)
    board[lastMove[1]][lastMove[2]] = null
    redsTurn = lastMove[0] === "red" ? true : false
    moveHistory.pop()
    turnsTaken--
    document.getElementById("end-game").style.display = "none"
    gameOver = false

}
