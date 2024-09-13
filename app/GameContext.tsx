'use client';

import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react';
import { checkWinner, selectRandomEmptyCell } from './util/util';

const EMPTY_BOARD = Array(9).fill('')

const STARTING_STATUS: GameStateType = {
    board: EMPTY_BOARD, // 9 cells representing a 3x3 grid
    currentPlayer: 'x',
    winner: null,
    status: 'initial',
    playerNameX: "Player X",
    playerNameO: "Player O",
    difficulty: 'easy',
    isLoading: false,
    message: ""
}

export type GameStatus = 'initial' | 'start' | 'game' | 'end'
export type CellState = '' | 'x' | 'o'
export type Difficulty = 'easy' | 'medium' | 'hard'

// Define the structure of the game state
export type GameStateType = {
    board: CellState[]; // Representing the board with 'x', 'o', or empty strings
    currentPlayer: 'x' | 'o'; // x = player 1, o = player 2
    winner: string | null; // 'x', 'o', or null if no winner yet
    status: GameStatus;
    playerNameX: string
    playerNameO: string
    difficulty: Difficulty
    isLoading: boolean
    message: string
};

// Define the context type
export type MainContextType = {
    gameState: GameStateType;
    setGameState: Dispatch<SetStateAction<GameStateType>>;
    handleClick: (index: number) => void
    playAgain: () => void
    resetGame: () => void,
    changeStatus: (status: GameStatus) => void
    startGame: (settings: Partial<GameStateType>) => void
};

// Create the GameContext
export const GameContext = createContext<MainContextType>({
    gameState: STARTING_STATUS,
    setGameState: () => { },
    handleClick: (index) => { },
    playAgain: () => { },
    resetGame: () => { },
    changeStatus: (status) => { },
    startGame: (settings) => { }

});

// GameProvider component to wrap the app
export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<GameStateType>(STARTING_STATUS);

    useEffect(() => {
        if (gameState.currentPlayer === 'o' && gameState.status === 'game') {
            setGameState({ ...gameState, isLoading: true, message: 'Thinking...' })
            setTimeout(() => handleClick(selectRandomEmptyCell(gameState.board)), 2000)
        }

    }, [gameState.currentPlayer])

    const changeStatus = (status: GameStatus) => {
        setGameState({ ...gameState, status: status })
    }

    const startGame = (settings: Partial<GameStateType>) => {
        setGameState(
            { ...gameState, ...settings, board: EMPTY_BOARD, status: 'game', currentPlayer: 'x', isLoading: false }
        )
    }

    const playAgain = () => {
        setGameState(
            { ...gameState, board: EMPTY_BOARD, status: 'game', currentPlayer: 'x', isLoading: false }
        )
    }

    const resetGame = () => {
        setGameState(STARTING_STATUS)
    }

    const handleClick = (index: number) => {
        if (gameState.isLoading && gameState.currentPlayer === 'o') return

        if (gameState.status != 'end' && gameState.board[index] === '') {
            let newState = { ...gameState }
            const newBoard = [...gameState.board];
            newBoard[index] = gameState.currentPlayer;
            newState = { ...newState, board: newBoard, currentPlayer: gameState.currentPlayer === 'x' ? 'o' : 'x', isLoading: false }
            const winner = checkWinner(newBoard);
            if (winner === 'o') {
                newState = { ...newState, winner: newState.playerNameO, status: 'end' }
            } else if (winner === 'x') {
                newState = { ...newState, winner: newState.playerNameX, status: 'end' }
            } else if (winner === 'draw') {
                newState = { ...newState, winner: null, status: 'end' }
            }
            setGameState(newState);
        }
    };

    return (
        <GameContext.Provider value={{ gameState, setGameState, handleClick, playAgain, resetGame, changeStatus, startGame }}>
            {children}
        </GameContext.Provider>
    );
};
