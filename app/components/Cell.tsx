'use client'

import { useContext } from "react";
import { GameContext } from "../GameContext";
import { PlayerContext } from "../PlayerContext";

export const Cell = ({  index }: { index: number }) => {
    const {gameState, handleClick} = useContext(GameContext)
    const {playerState, computerState} = useContext(PlayerContext)
    return (
        <div
            onClick={() => handleClick(index)}
            className="flex aspect-square justify-center items-center border border-gray-300 cursor-pointer"
        >
            {gameState.board[index] === 2 && <computerState.Mark />}
            {gameState.board[index] === 1 && <playerState.Mark />}
        </div>
    );
};
