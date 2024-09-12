'use client'

import { useContext } from "react";
import { GameContext } from "../GameContext";

export const Cell = ({ children, index }: { children: React.ReactNode, index: number }) => {
    const {gameState, handleClick} = useContext(GameContext)
    return (
        <div
            onClick={() => handleClick(index)}
            className="flex aspect-square justify-center items-center border border-gray-300 cursor-pointer"
        >
            {gameState.board[index]}
        </div>
    );
};
