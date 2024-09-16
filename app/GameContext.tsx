'use client';

import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react';
import { checkWinner, selectRandomEmptyCell } from './util/util';
import { Message, useAssistant } from 'ai/react';
import { AssistantStatus } from 'ai';

const EMPTY_BOARD = Array(9).fill(0)

const STARTING_STATUS: GameStateType = {
    board: EMPTY_BOARD, // 9 cells representing a 3x3 grid
    currentPlayer: 1,
    winner: null,
    status: 'initial',
    playerName1: "Player X",
    playerName2: "Player O",
    difficulty: 'easy'
}

export type GameStatus = 'initial' | 'start' | 'game' | 'end'
export type CellState = 0 | 1 | 2
export type Difficulty = 'easy' | 'medium' | 'hard'
export type ComputerResponse = { cellIndex: number, message: string }

// Define the structure of the game state
export type GameStateType = {
    board: CellState[]; // Representing the board with 1, 1, or empty strings
    currentPlayer: 1 | 2; // x = player 1, o = player 2
    winner: string | null; // 1, 2, or null if no winner yet
    status: GameStatus;
    playerName1: string
    playerName2: string
    difficulty: Difficulty
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
    messages: Message[]
    status: AssistantStatus
};

// Create the GameContext
export const GameContext = createContext<MainContextType>({
    gameState: STARTING_STATUS,
    setGameState: () => { },
    handleClick: () => { },
    playAgain: () => { },
    resetGame: () => { },
    changeStatus: () => { },
    startGame: () => { },
    messages: [],
    status: "awaiting_message"

});

// GameProvider component to wrap the app
export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<GameStateType>(STARTING_STATUS);
    const [lastProcessedIndex, setLastProcessedIndex] = useState(-1);
    const { append, messages, status } =
        useAssistant({ api: '/api/assistant' });

    useEffect(() => {
        // Process only messages after the last processed one
        const newMessages = messages.slice(lastProcessedIndex + 1);

        newMessages.forEach((latestMessage, index) => {
            if (latestMessage?.role === 'data' && latestMessage.data) {
                const { cellIndex } = latestMessage.data as { cellIndex: number };
                const clickStatus = handleClick(cellIndex);
                if (!clickStatus) {
                    handleClick(selectRandomEmptyCell(gameState.board));
                }
                // Update the last processed index to avoid reprocessing
                setLastProcessedIndex(lastProcessedIndex + index + 1);
            }
        });
    }, [messages]);

    useEffect(() => {
        if (gameState.currentPlayer === 2 && gameState.status === 'game') {
            append({ role: 'user', content: `[${gameState.board.toString()}]` })
        }

    }, [gameState.currentPlayer])

    const changeStatus = (status: GameStatus) => {
        setGameState({ ...gameState, status: status })
    }

    const startGame = (settings: Partial<GameStateType>) => {
        setGameState(
            { ...gameState, ...settings, board: EMPTY_BOARD, status: 'game', currentPlayer: 1 }
        )
    }

    const playAgain = () => {
        setGameState(
            { ...gameState, board: EMPTY_BOARD, status: 'game', currentPlayer: 1 }
        )
    }

    const resetGame = () => {
        setGameState(STARTING_STATUS)
    }

    const handleClick = (index: number) => {
        if (gameState.status != 'end' && gameState.board[index] === 0) {
            let newState = { ...gameState }
            const newBoard = [...gameState.board];
            newBoard[index] = gameState.currentPlayer;
            newState = { ...newState, board: newBoard, currentPlayer: gameState.currentPlayer === 1 ? 2 : 1 }
            const winner = checkWinner(newBoard);
            if (winner === "1") {
                newState = { ...newState, winner: newState.playerName2, status: 'end' }
            } else if (winner === "2") {
                newState = { ...newState, winner: newState.playerName1, status: 'end' }
            } else if (winner === 'draw') {
                newState = { ...newState, winner: null, status: 'end' }
            }
            setGameState(newState);
            return true
        }
        return false
    };

    return (
        <GameContext.Provider value={{ gameState, setGameState, handleClick, playAgain, resetGame, changeStatus, startGame, messages, status }}>
            {children}
        </GameContext.Provider>
    );
};
