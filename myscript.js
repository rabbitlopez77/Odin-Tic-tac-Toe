const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const winningMessageElement =document.getElementById('winningMessage')
const winningTextMessageElement = document.querySelector('[data-winning-message-text]')
const playerXDisplay = document.getElementById('playerXDisplay')
const playerODisplay = document.getElementById('playerODisplay')
let circleTurn;
const restartButton = document.getElementById('restartButton')
const playAgainButton = document.getElementById('playAgainButton')
let player1;
let player2;
let player1Round = 0;
let player2Round = 0;
const xRoundsDisplay = document.getElementById('xRoundsDisplay');
const oRoundsDisplay = document.getElementById('oRoundsDisplay');
const displayRounds = () => {
    xRoundsDisplay.innerText = `${player1.name} won ${player1Round}`
    oRoundsDisplay.innerText = `${player2.name} won ${player2Round}`
}

const  createPlayer = (name, player) => {
    return {
      name: name,
      player: player
    };
  };
const nameingPlayers = () => {
    let playerX = prompt('Who is Player X', 'Player X Name')
let playerO = prompt('Who is Player O', 'Player O Name ')
player1 = createPlayer(playerX, 1)
player2 = createPlayer(playerO, 2)
playerXDisplay.innerText = `${player1.name} is X`
playerODisplay.innerText = ` ${player2.name} is O`
}
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
    nameingPlayers()
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    player1Round = 0;
    player2Round = 0;
    
    winningMessageElement.classList.remove('show')
    displayRounds()
    
}
const playAgain = () => {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    
    winningMessageElement.classList.remove('show')
    displayRounds()
}
playAgainButton.addEventListener('click', playAgain)
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
        if(circleTurn){
            player2Round++
            console.log(player1Round, player2Round)
        }else{
            player1Round++
            console.log(player1Round, player2Round)
        }
        winningTextMessageElement.innerText = `${circleTurn ? player2.name : player1.name} Wins!`
        
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


