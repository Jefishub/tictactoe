'use client'

import { IconType } from "react-icons"

const PlayerCard = ({ isPlayerTurn, playerName, Avatar }: { isPlayerTurn: boolean, playerName: string, Avatar: IconType }) => {

    return (
        <div className={`flex justify-center items-center flex-col gap-2 ${isPlayerTurn && "bg-lime-600"}`}>
            <Avatar className={`size-12`} />
            <div>{playerName}</div>
        </div>
    )
}

export default PlayerCard