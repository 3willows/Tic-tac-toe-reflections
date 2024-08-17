const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});

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
];

function checkWin(playerArray) {
  return winningCombinations.some(combination =>
    combination.every(number => playerArray.includes(number))
  );
}

function reset() {
  emptySpacesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  player1Array = []
  player2Array = []

  emptySpaces.textContent = "Empty spaces: [1, 2, 3, 4, 5, 6, 7, 8, 9]";
  player1Moves.textContent = "Player 1: []";
  player2Moves.textContent = "Player 2: []";
}

let emptySpaces = document.getElementById("emptySpaces");
const player1Moves = document.getElementById("player1Moves");

const player1Input = document.getElementById("player1Input");
const player1Submit = document.getElementById("player1Submit");

const player2Input = document.getElementById("player2Input");
const player2Submit = document.getElementById("player2Submit");

player1Submit.addEventListener("click", () => {
  const choice = parseInt(player1Input.value);
  const index = emptySpacesArray.indexOf(choice);
  if (index !== -1) {
    let move = emptySpacesArray.splice(index, 1)[0];
    player1Array.push(move)
    emptySpaces.textContent =
      "Empty spaces: [" + emptySpacesArray.join(", ") + "]";
    player1Moves.textContent =
      "Player 1: [" + player1Array.join(", ") + "]";
    player1Input.value = "";

    if (checkWin(player1Array)) {
      reset()
      alert("Player 1 wins!")
    }
  }
});

player2Submit.addEventListener("click", () => {
  const choice = parseInt(player2Input.value);
  const index = emptySpacesArray.indexOf(choice);
  if (index !== -1) {
    let move = emptySpacesArray.splice(index, 1)[0];
    player2Array.push(move)
    emptySpaces.textContent =
      "Empty spaces: [" + emptySpacesArray.join(", ") + "]";
    player2Moves.textContent =
      "Player 2: [" + player2Array.join(", ") + "]";
    player2Input.value = "";
    if (checkWin(player2Array)) {
      reset()
      alert("Player 2 wins!")
    }
  }
});