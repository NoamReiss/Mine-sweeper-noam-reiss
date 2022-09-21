'use strict'






function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getEmptyPos() {
    var emptyPoses = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.type === FLOOR && !cell.gameElement) {
                var pos = { i: i, j: j }
                emptyPoses.push(pos)
            }
        }
    }
    var randIdx = getRandomInt(0, emptyPoses.length)
    return emptyPoses[randIdx]
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function findBestPos(board) {
    var maxFoodCount = 0
    var bestPos = null
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === FOOD) continue
            var count = countFoodAround(board, i, j)
            if (count > maxFoodCount) {
                maxFoodCount = count
                bestPos = { i: i, j: j }
            }
        }
    }
    return bestPos
}


function minesAroundCount(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
    if (i === rowIdx && j === colIdx) continue
    if (j < 0 || j >= board[0].length) continue
    var currCell = board[i][j]
    if (currCell.isMine) count++
    }
    }
    return count
    }


function playSound() {
  var dead = new Audio("sounds/dead.mp3")
  dead.play()
}