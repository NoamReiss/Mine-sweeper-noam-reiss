'use strict'
const MINE = '💣'


var gTimeInterval
var gStartTime
const LIFE = '💗'
const EMPTY = ''
const gLevel = {
    SIZE: 4,
    MINES: 2,
    LIVES: 1

}
var gMinePos
var gBoard
var glives = document.querySelector('.lives')
const gGame = {

    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 1,
    mineClickedCount: 0,
    safeClickAvailible: 3
}
function gameLevel(mines, size, lives) {

    gLevel.MINES = mines
    gLevel.SIZE = size
    gLevel.LIVES = lives
    onInitGame()
}

function onInitGame() {
    stopTimer()
    document.querySelector('.reset').innerText = '😊'
    gGame.isOn = false
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.lives = gLevel.LIVES
   gGame.mineClickedCount = 0
   gGame.safeClickAvailible = 3
    gBoard = createboard(gLevel.SIZE)
    renderBoard(gBoard, '.board')
    document.querySelector('.mine-num').innerText = gLevel.MINES
    updateLives()
    document.querySelector('.safe span').innerText = gGame.safeClickAvailible

}

function gameOn(elCell, i, j) {
    gGame.isOn = true
    gMinePos = randomPos(gLevel.SIZE, gLevel.MINES, i, j)
    startTimer()

    setMines()
    cellClicked(elCell, i, j)
    renderBoard(gBoard, '.board')

   
}




function createboard(size) {
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }

            board[i][j] = cell
        }
    }

    return board
}

function setMines() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j]
            currCell.isMine = isPoseMatch(i, j)

        }


    } return setMinesNegsCount(gBoard)
}


function isPoseMatch(i, j) {
    var minePos = gMinePos

    var currPos = {}
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
            var cellContent = cell.isMine ? MINE : cell.minesAroundCount
            if (cellContent === 0) cellContent = ''
            var isShown = cell.isShown ? cellContent : EMPTY
            var openCell = cell.isShown ? 'open-cell' : ''
            var isMarked = cell.isMarked ? 'marked' : ''
            strHTML += `<td class="cell ${className} ${openCell} ${isMarked}" 
            onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(this, ${i}, ${j})">${isShown}
         </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}


function onCellClicked(elCell, i, j) {
    var cell = gBoard[i][j]

    if (gGame.shownCount === 0) {
        gameOn(elCell, i, j)
        if (cell.minesAroundCount === 0) {
            expandShown(gBoard, elCell,
                i, j)
        }
    } else {
        cellClicked(elCell, i, j)
        if (!cell.isMine && cell.minesAroundCount === 0) {
           
            expandShown(gBoard, elCell,
                i, j)
        } else if(cell.isMine) {
            gGame.mineClickedCount++
            gGame.lives--
            console.log('livers',gGame.lives);
            checkLoss()
        }

        updateLives()
    }

    elCell.classList.add('.open-cell')
    renderBoard(gBoard, '.board')

}



function cellClicked(elCell, i, j) {

    var cell = gBoard[i][j]

    cell.isShown = true
    if (cell.isMarked) {
        cell.isMarked = false
        elCell.classList.remove('.marked')
        gGame.markedCount--
    }

    elCell.classList.add('.open-cell')

    gGame.shownCount++
    renderBoard(gBoard, '.board')
    checkVictory()
}


function onCellMarked(elCell, i, j) {
    var currCell = gBoard[i][j]
    if (!currCell.isMarked) {

        currCell.isMarked = true
        elCell.classList.add('.marked')
        gGame.markedCount++

    } else {
        currCell.isMarked = false
        elCell.classList.remove('.marked')
        gGame.markedCount--
    }
    console.log(gGame.markedCount);
    renderBoard(gBoard, '.board')

    checkVictory()
}



function checkVictory() {
    var notMineCount = (gLevel.SIZE ** 2) - gLevel.MINES

    if ((gGame.markedCount + notMineCount) === (gLevel.SIZE ** 2)) {
        document.querySelector('.reset').innerText = '😍'
        gGame.isOn = false
        return true
    }

}




function checkLoss() {

    if (gGame.lives === 0 ) {
        document.querySelector('.reset').innerText = '😭'
        stopTimer()
        for (let i = 0; i < gBoard.length; i++) {
            for (let j = 0; j < gBoard.length; j++) {
                var currCell = gBoard[i][j]
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.classList.add('.open-cell')
                currCell.isShown = true


            }

        }
    } renderBoard(gBoard, '.board')
}


// function onHintClick(elButton) {

//     console.log(elButton);


// }

function onSafeClick(elButton) {
    if(gGame.safeClickAvailible === 0 )return
    gGame.safeClickAvailible--
    document.querySelector('.safe span').innerText = gGame.safeClickAvailible
   console.log(findSafePos(gBoard));
    
}




function updateLives() {
    var hearts = ''
    switch (gGame.lives) {
        case 3:
            hearts = '💗💗💗'
            break
        case 2:
            hearts = '💗💗'

            break
        case 1:
            hearts = '💗'
            break

    }

    glives.innerText = hearts

}




