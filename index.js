const forms = document.querySelectorAll("form")
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
  })
})

let emptySpacesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let player1Array = []
let player2Array = []

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
]

function checkWin(playerArray) {
  return winningCombinations.some((combination) =>
    combination.every((number) => playerArray.includes(number))
  )
}

function reset() {
  emptySpacesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  player1Array = []
  player2Array = []

  emptySpaces.textContent = "Empty spaces: [1, 2, 3, 4, 5, 6, 7, 8, 9]"
  player1Moves.textContent = "Player 1: []"
  player2Moves.textContent = "Player 2: []"
}

let emptySpaces = document.getElementById("emptySpaces")
const player1Moves = document.getElementById("player1Moves")
const player2Moves = document.getElementById("player2Moves")

const playerInput = document.getElementById("playerInput")
const playerSubmit = document.getElementById("playerSubmit")
const playerLabel = document.getElementById("playerLabel")

playerSubmit.addEventListener("click", () => {
  const choice = parseInt(playerInput.value)
  const index = emptySpacesArray.indexOf(choice)
  if (index !== -1) {
    let move = emptySpacesArray.splice(index, 1)[0]
    if (emptySpacesArray.length % 2 === 0) {
      player1Array.push(move)
      player1Moves.textContent = "Player 1: [" + player1Array.join(", ") + "]"
      playerLabel.textContent = "Player 2's move:"
    } else {
      player2Array.push(move)
      player2Moves.textContent = "Player 2: [" + player2Array.join(", ") + "]"
      playerLabel.textContent = "Player 1's move:"
    }
    emptySpaces.textContent =
      "Empty spaces: [" + emptySpacesArray.join(", ") + "]"
    playerInput.value = ""

    if (checkWin(player1Array)) {
      reset()
      alert("Player 1 wins!")
    }
    if (checkWin(player2Array)) {
      reset()
      alert("Player 2 wins!")
    }
  }
})
