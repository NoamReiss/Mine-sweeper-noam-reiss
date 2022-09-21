'use strict'
const MINE = '💣'


var gMineField
var gLevel = {
    SIZE: 4,
    MINES: 2
};
const gBoard = createboard(gLevel.SIZE)
const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInitGame() {
    console.log('start')
    gBoard
    console.log(gBoard);
    renderBoard(gBoard, '.board')
}


function createboard(size) {
    const board = []
    for (var i = 0; i <= size; i++) {
        board[i] = []
        for (var j = 0; j <= size; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false

            }

            board[i][j] = cell

        }
    }
    board[0][0].isMine = true
    board[3][0].isMine = true


    return setMinesNegsCount(board)
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

            strHTML += `<td class="cell ${className}" 
            onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="onRightClick(this, ${i}, ${j})"><div class="${classDivName}">${cellContent}</div>
         </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}



function cellClicked(elCell, i, j) {
     var cell = gBoard[i][j]

cell.isShown = true
var div = document.querySelector(`.cell-${i}-${j} div` )
div.classList.remove('hidden')

console.log('nn',div);

    console.log('elcell', elCell)
    console.log('cell', cell);



}


function onRightClick(elCell, i, j) {
    var currCell = gBoard[i][j]
    if (!currCell.isMarked) {

        currCell.isMarked = true
        elCell.classList.add('marked')
    } else {
        currCell.isMarked = false
        elCell.classList.remove('marked')

    }
    console.log(currCell)
    console.log('elcell', elCell)

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





