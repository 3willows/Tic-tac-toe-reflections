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

async function checkWin(playerArray) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        winningCombinations.some((combination) =>
          combination.every((number) => playerArray.includes(number))
        )
      ) {
        reset()
        resolve(true)
      } else {
        reject(false)
      }
    }, 0)
  })
}

function reset() {
  location.reload()
}

const emptySpaces = document.getElementById("emptySpaces")
const player1Moves = document.getElementById("player1Moves")
const player2Moves = document.getElementById("player2Moves")

const playerInput = document.getElementById("playerInput")
const playerSubmit = document.getElementById("playerSubmit")
const playerLabel = document.getElementById("playerLabel")

playerSubmit.addEventListener("click", async () => {
  const choice = parseInt(playerInput.value)
  const index = emptySpacesArray.indexOf(choice)
  if (index !== -1) {
    emptySpacesArray.splice(index, 1)
    let relevantSquare = document.getElementById(`cell-${choice}`)
    if (emptySpacesArray.length % 2 === 0) {
      player1Array.push(choice)
      player1Moves.textContent = "Player 1: [" + player1Array.join(", ") + "]"
      playerLabel.textContent = "Player 2's move:"
      relevantSquare.textContent = "O"
    } else {
      player2Array.push(choice)
      player2Moves.textContent = "Player 2: [" + player2Array.join(", ") + "]"
      playerLabel.textContent = "Player 1's move:"
      relevantSquare.textContent = "X"
    }
    emptySpaces.textContent =
      "Empty spaces: [" + emptySpacesArray.join(", ") + "]"
    playerInput.value = ""

    try {
      await checkWin(player1Array)
      alert("Player 1 wins!")
    } catch (error) {
      try {
        await checkWin(player2Array)
        alert("Player 2 wins!")
      } catch (error) {
        // do nothing
      }
    }
  }
})

playerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    playerSubmit.click()
  }
})
