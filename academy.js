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

function takeTurn(row, col) {
    console.log(`takeTurn was called with row: ${row}, column: ${col}.`)

    if (board[row][col] === null) {
        for (let i = 5; i >= 0; i--) {
            if (board[i][col] === null && redsTurn) {
                board[i][col] = "red"
                storeMoves("red", i, col)
                redsTurn = false
                break
            } else if (board[i][col] === null && !redsTurn) {
                board[i][col] = "yellow"
                storeMoves( "yellow", i, col)
                redsTurn = true
                break
            }
        }
    } else {
        console.log("That piece is unavilable")
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

    return [player1Score, player2Score]
}

function checkWinner() {
    console.log("checkWinner was called.")


}

function undoLastMove() {
    console.log("undoLastMove was called.")

    const lastMove = moveHistory.at(-1)
    board[lastMove[1]][lastMove[2]] = null
    redsTurn = lastMove[0] === "red" ? true : false
    moveHistory.pop()
}
