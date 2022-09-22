'use strict'
const MINE = '💣'




const gLevel = {
    SIZE: 5,
    MINES: 4
}
var gMinePos
var gBoard

const gGame = {

    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
function gameLevel(num1 = 4, num2 = 5){
  
    gLevel.MINES = num1
    gLevel.SIZE = num2
   
}

function onInitGame() {
    // gameLevel(num1, num2)
    gLevel
    gMinePos = randomPos(gLevel.SIZE - 1, gLevel.MINES)
    gBoard = createboard(gLevel.SIZE - 1)

    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.isOn = true
    gGame.secsPassed = 0


    renderBoard(gBoard, '.board')
    document.querySelector('.mine-num').innerText = gLevel.MINES
}


function createboard(size) {
    const board = []
    for (var i = 0; i <= size; i++) {
        board[i] = []
        for (var j = 0; j <= size; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: isPoseMatch(i, j),
                isMarked: false

            }

            board[i][j] = cell

        }
    }

    return setMinesNegsCount(board)
}


function isPoseMatch(i, j) {
    var minePos = gMinePos

    var currPos = null
    for (var x = 0; x < gLevel.MINES; x++) {
        currPos = minePos[x]

        if (currPos.i === i && currPos.j === j) {
            return true
        }

    } return false
}

function renderBoard(board, selector) {

    var strHTML = '<table border="1" cellpadding="20"><tbody>'
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]

            const className = `cell-${i}-${j}`
            var classDivName = ''
            if (!cell.isShown) classDivName += ' hidden'
            var cellContent = cell.isMine ? MINE : cell.minesAroundCount
            if (cellContent === 0) cellContent = ''

            strHTML += `<td class="cell ${className}" 
            onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(this, ${i}, ${j})"><div class="${classDivName}">${cellContent}</div>
         </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}


function onCellClicked(elCell, i, j) {

    cellClicked(elCell, i, j)
    var cell = gBoard[i][j]

    if (!cell.isMine) {
        expandShown(gBoard, elCell,
            i, j)
    }else{
        checkLoss()
    }

}

function cellClicked(elCell, i, j) {

    var cell = gBoard[i][j]
    elCell.style.backgroundColor = '#b8aeae'
    cell.isShown = true
    var div = document.querySelector(`.cell-${i}-${j} div`)
    div.classList.remove('hidden')

    gGame.shownCount++
    checkGameOver()
}
function onCellMarked(elCell, i, j) {
    var currCell = gBoard[i][j]
    if (!currCell.isMarked) {

        currCell.isMarked = true
        elCell.classList.add('marked')
        gGame.markedCount++
        
    } else {
        currCell.isMarked = false
        elCell.classList.remove('marked')
        gGame.markedCount--
    }
console.log( gGame.markedCount);

    checkGameOver()
}



function checkGameOver() {
  var notMineCount = (gLevel.SIZE ** 2) - gLevel.MINES

    if ((gGame.markedCount + notMineCount) === (gLevel.SIZE ** 2)) {
        document.querySelector('.reset').innerText = '😍'
        gGame.isOn = false
        return true
    } 

}


function gameOver() {
gGame.isOn = false

}


function checkLoss() {
    document.querySelector('.reset').innerText = '😭'
for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard.length; j++) {
      var  currCell =  gBoard[i][j]
      var elCell = document.querySelector(`.cell-${i}-${j}`)
      
      currCell.isShown = true
      var div = document.querySelector(`.cell-${i}-${j} div`)
      div.classList.remove('hidden')
      elCell.style.backgroundColor = '#b8aeae'
    }
    
}

}

function randomPos(size, numOfPos) {
    var poss = []
    var mineCount = numOfPos
    while (mineCount > 0) {
        var pos1 = getRandomInt(0, size + 1)
        var pos2 = getRandomInt(0, size + 1)

        var pos = { i: pos1, j: pos2 }

        if (!poss.includes(pos)) {
            poss.push(pos)
            mineCount--
        }

    }
    return poss
}

function expandShown(board, elCell, rowIdx, colIdx) {


    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = board[i][j]
            var elCurrCell = document.querySelector(`.cell-${i}-${j}`)

            if (currCell.isMine) continue
            cellClicked(elCurrCell, i, j)

        }
    }
}



function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]
            currCell.minesAroundCount = minesAroundCount(board, i, j)


        }
    }
    return board

}





