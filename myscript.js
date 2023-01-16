const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const winningMessageElement =document.getElementById('winningMessage')
const winningTextMessageElement = document.querySelector('[data-winning-message-text]')
let circleTurn;
const restartButton = document.getElementById('restartButton')
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
]
startGame()
restartButton.addEventListener('click', startGame)
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}


function handleClick(event) {
    const cell = event.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else {
        swapTurns();
        setBoardHoverClass();
    }
    //check for win
    //check for draw
}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
function endGame(draw) {
    if(draw) {
        winningTextMessageElement.innerText = 'Draw!'
    }else {
        winningTextMessageElement.innerText = `${circleTurn ? 'O"s' : 'X"s'} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurns() {
    circleTurn = !circleTurn;
}
function setBoardHoverClass() {
    gameBoard.classList.remove(X_CLASS)
    gameBoard.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        gameBoard.classList.add(CIRCLE_CLASS)
    }else{
        gameBoard.classList.add(X_CLASS)
    }
}
function checkWin(currentClass){
    return winningCombos.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}