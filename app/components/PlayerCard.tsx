'use client'

import { useContext } from "react"
import { GameContext } from "../GameContext"
import { FaRegGrinStars, FaRegFrown } from "react-icons/fa";
import { PlayerContext } from "../PlayerContext";
import Celebration from "./Confetti/Confetti";

const PlayerCard = () => {
    const { gameState } = useContext(GameContext)
    const { playerState  } = useContext(PlayerContext)    

    const bgColor = () => {
        if (gameState.winner === "1") return "bg-lime-600"
        if (gameState.winner === "2") return "bg-red-600"
        if (gameState.currentPlayer === 1) return "bg-lime-600"
        return "bg-gray-500"
    }

    const Avatar = () => {
        if (gameState.winner === "1") return <FaRegGrinStars className={`size-12`} />
        if (gameState.winner === "2") return <FaRegFrown className={`size-12`} />
        return <playerState.Avatar className={`size-12`} />
    }

    return (
        <div className={`flex justify-center items-center flex-col text-white gap-2 ${bgColor()}`}>
            {<Avatar />}
            <div>{playerState.name}</div>
            <Celebration show={gameState.winner === "1"} />
        </div>
    )
}

export default PlayerCard