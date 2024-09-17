'use client'

import { useContext } from "react"
import { GameContext } from "../GameContext"
import { FaRegSmile, FaRegGrinStars, FaRegFrown } from "react-icons/fa";

const PlayerCard = ({ isPlayerTurn, playerName }: { isPlayerTurn: boolean, playerName: string }) => {
    const { gameState } = useContext(GameContext)

    const bgColor = () => {
        if (gameState.winner === gameState.playerName1) return "bg-lime-600"
        if (gameState.winner === gameState.playerName2) return "bg-red-600"
        if (isPlayerTurn) return "bg-lime-600"
        return "bg-gray-500"
    }

    const Avatar = () => {
        if (gameState.winner === gameState.playerName1) return <FaRegGrinStars className={`size-12`} />
        if (gameState.winner === gameState.playerName2) return <FaRegFrown className={`size-12`} />
        return <FaRegSmile className={`size-12`} />
    }

    return (
        <div className={`flex justify-center items-center flex-col text-white gap-2 ${bgColor()}`}>
            {<Avatar />}
            <div>{playerName}</div>
        </div>
    )
}

export default PlayerCard