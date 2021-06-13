const X = 'x'
const O = 'circle'
const wCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const blockE = document.querySelectorAll('[data-block]')
const board = document.getElementById('board')
const wMessageE = document.getElementById('winningMessage')
const rButton = document.getElementById('restartButton')
const wMessageTE = document.querySelector('[data-winning-message-text]')
let circleT

startGame()

rButton.addEventListener('click', startGame)

function startGame() {
  circleT = false
  blockE.forEach(block => {
    block.classList.remove(X)
    block.classList.remove(O)
    block.removeEventListener('click', handleClick)
    block.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  wMessageE.classList.remove('show')
}

function handleClick(e) {
  const block = e.target
  const currentClass = circleT ? O : X
  placeMark(block, currentClass)
  buttn.addEventListener('click', startGame)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    wMessageTE.innerText = 'Draw!'
  } else {
    wMessageTE.innerText = `${circleT ? "O's" : "X's"} Wins!`
  }
  wMessageE.classList.add('show')
}

function isDraw() {
  return [...blockE].every(block => {
    return block.classList.contains(X) || block.classList.contains(O)
  })
}

function placeMark(block, currentClass) {
  block.classList.add(currentClass)
}

function swapTurns() {
  circleT = !circleT
}

function setBoardHoverClass() {
  board.classList.remove(X)
  board.classList.remove(O)
  if (circleT) {
    board.classList.add(O)
  } else {
    board.classList.add(X)
  }
}

function checkWin(currentClass) {
  return wCombination.some(combination => {
    return combination.every(index => {
      return blockE[index].classList.contains(currentClass)
    })
  })
}

