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

function redsTurnFunc() {
    console.log("redsTurnFunc was called.")

    redsTurn = true
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

function storeMoves(colour, row, col) {
    console.log("storeMoves was called.")

    moveHistory.push([colour, row, col])
}

function getBoard() {
    console.log("getBoard was called")

    return board
}

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

function setNames(name) {
    console.log("setNames was called.")

    players[0] = name[0]
    players[1] = name[1]

    return players
}

function getNames() {
    console.log("getNames was called.")

    return players
}

function setScores() {
    console.log("setScores was called.")

}

function getScores() {
    console.log("getScores was called.")

    return [playerScores]
}

function checkWinner() {
    console.log("checkWinner was called.")

    const drawnGame = turnsTaken === 42 ? true : false
    if (drawnGame) {
        gameOver = true
        return "draw"
    }
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
