'use client';

import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { checkWinner } from './util/util';

const EMPTY_BOARD = Array(9).fill('')

const STARTING_STATUS: GameStateType = {
    board: EMPTY_BOARD, // 9 cells representing a 3x3 grid
    currentPlayer: 'x',
    winner: null,
    status: 'initial',
}

export type GameStatus = 'initial' | 'start' | 'game' | 'end'
export type CellState = '' | 'x' | 'o'

// Define the structure of the game state
export type GameStateType = {
    board: CellState[]; // Representing the board with 'x', 'o', or empty strings
    currentPlayer: 'x' | 'o'; // x = player 1, o = player 2
    winner: string | null; // 'x', 'o', or null if no winner yet
    status: GameStatus;
};

// Define the context type
export type MainContextType = {
    gameState: GameStateType;
    setGameState: Dispatch<SetStateAction<GameStateType>>;
    handleClick: (index: number) => void
    playAgain: () => void
    resetGame: () => void,
    changeStatus: (status: GameStatus) => void
};

// Create the GameContext
export const GameContext = createContext<MainContextType>({
    gameState: STARTING_STATUS,
    setGameState: () => { },
    handleClick: (index) => { },
    playAgain: () => { },
    resetGame: () => { },
    changeStatus: (status) => { },
});

// GameProvider component to wrap the app
export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<GameStateType>(STARTING_STATUS);

    const changeStatus = (status: GameStatus) => {
        setGameState({ ...gameState, status: status })
    }

    const playAgain = () => {
        setGameState(
            { ...gameState, board: EMPTY_BOARD, status: 'start', currentPlayer: 'x' }
        )
    }

    const resetGame = () => {
        setGameState(STARTING_STATUS)
    }

    const handleClick = (index: number) => {

        if (gameState.status != 'end' && gameState.board[index] === '') {
            const newBoard = [...gameState.board];
            newBoard[index] = gameState.currentPlayer;

            const winner = checkWinner(newBoard);
            setGameState({
                ...gameState,
                board: newBoard,
                currentPlayer: gameState.currentPlayer === 'x' ? 'o' : 'x',
                winner: winner,
                status: winner != 'none' ? 'end' : gameState.status,
            });
        }
    };

    return (
        <GameContext.Provider value={{ gameState, setGameState, handleClick, playAgain, resetGame, changeStatus }}>
            {children}
        </GameContext.Provider>
    );
};
