'use client'

import { useContext } from "react";
import { GameContext } from "../GameContext";
import { ImCross } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa";

export const Cell = ({  index }: { index: number }) => {
    const {gameState, handleClick} = useContext(GameContext)
    return (
        <div
            onClick={() => handleClick(index)}
            className="flex aspect-square justify-center items-center border border-gray-300 cursor-pointer"
        >
            {gameState.board[index] === 2 && <FaRegCircle />}
            {gameState.board[index] === 1 && <ImCross />}
        </div>
    );
};
