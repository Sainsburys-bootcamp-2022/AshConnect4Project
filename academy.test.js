const academy = require('./academy')

beforeEach(() => {
    academy.setPlayerScores(0,0)
})

beforeEach(() => {
    academy.setMoveHistory(null, null, null, [])
})
it ("should take 2 numbers, add them to the values of an existing array and return that array. If the 2 nums are 0, returns array of 2 0s.", () => {
    //ACT
    const num1 = 0
    const num2 = 0
    const result = [0, 0]
    
    //ARRANGE + ASSERT
    expect(academy.setPlayerScores(num1, num2)).toStrictEqual(result)
})

it ("takes the current colour, the row and column clicked and adds them as an array to the end of an array. If an array is passed, sets the moveHistory array as the new array." , () => {
    //ACT
    const colour = null
    const row = null
    const column = null
    const arr = []
    const expectedResult = []

    //ARRANGE
    const result = academy.setMoveHistory(colour, row, column, arr)

    //ASSET
    expect(result).toStrictEqual(expectedResult)
})

test ("takes an index and a 2D array. Returns the highest index of the inner array at the given index that is null.", () => {
    const column = 0;
    const board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["red", null, null, null, null, null, null]
    ]

    const expectedResult = 4

    expect(academy.rowCheck(column, board)).toEqual(expectedResult)
})

test ("takes a 2D array, a number and a string. If the string is found 4 times in a row in the array once flattened (like Connect4), returns the string. If the number equals 42, returns 'draw' if not already returned the string.", () => {
    //ARRANGE
    const colour = "red"
    const board = [
        [null, null, null, null, null, null, null],
        [null, null, null, colour, null, null, null],
        [null, null, null, colour, null, null, null],
        [null, null, null, colour, null, null, null],
        [null, null, null, colour, null, null, null],
        [null, null, null, null, null, null, null]
    ]
    const turns = 42
    const expectedResult = "red"
    
    //ACT
    const fn = academy.checkWinner(board, turns, colour)

    //ASSERT
    expect(fn).toEqual(expectedResult)
})
