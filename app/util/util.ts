import { CellState } from "../GameContext";

// Function to check if a player has won
export const checkWinner = (board: CellState[]): 'x' | 'o' | 'draw' | 'none' => {
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Top-left to bottom-right diagonal
        [2, 4, 6], // Top-right to bottom-left diagonal
    ];

    // Loop through all winning combinations
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return 'x' or 'o' as the winner
        }
    }

    // Check for a draw (no empty spaces and no winner)
    if (board.every((cell) => cell !== '')) {
        return 'draw';
    }

    return 'none'; // No winner yet
};

// Function to make a random automated move
export const selectRandomEmptyCell = (board: string[]) => {
    // Find available (empty) cells
    const availableCells = board
        .map((cell, index) => (cell === '' ? index : null))
        .filter((index) => index !== null) as number[];

    if (availableCells.length === 0) {
        return 0; // No available moves
    }

    // Select a random cell from the available ones
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const selectedCell = availableCells[randomIndex];

    return selectedCell
};
