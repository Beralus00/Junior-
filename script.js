const board = document.getElementById("board");
const statusText = document.getElementById("game-status");
const restartBtn = document.getElementById("restart");

const rows = 6;
const cols = 10;
let boardState = Array(rows * cols).fill(null);
let currentPlayer = "X";
let gameActive = true;

// Kreye tablo ak selil yo
function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < rows * cols; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

// Klike sou yon selil
function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const index = cell.dataset.index;

    if (boardState[index]) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusText.innerHTML = `🏆 Jwè <b>${currentPlayer}</b> genyen!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Jwè ${currentPlayer} ap jwe`;
}

// Verifye si gen gayan (chèk orizontal, vètikal, dyagonal)
function checkWin() {
    const winPatterns = [
        [1, 2, 3, 4],  // Orizontal
        [cols, cols * 2, cols * 3, cols * 4],  // Vètikal
        [cols + 1, (cols + 1) * 2, (cols + 1) * 3, (cols + 1) * 4], // Dyagonal \
        [cols - 1, (cols - 1) * 2, (cols - 1) * 3, (cols - 1) * 4] // Dyagonal /
    ];

    for (let i = 0; i < boardState.length; i++) {
        if (!boardState[i]) continue;

        for (let pattern of winPatterns) {
            if (pattern.every(offset => boardState[i + offset] === boardState[i])) {
                pattern.forEach(offset => {
                    let cell = document.querySelector(`[data-index="${i + offset}"]`);
                    if (cell) cell.classList.add("winner");
                });
                return true;
            }
        }
    }
    return false;
}

// Rekòmanse jwèt la
restartBtn.addEventListener("click", () => {
    boardState.fill(null);
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Jwè X kòmanse!";
    createBoard();
});

// Kreye tablo a lè paj la chaje
createBoard();
