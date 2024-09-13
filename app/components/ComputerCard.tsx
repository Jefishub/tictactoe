'use client'
import { useContext } from "react"
import { IconType } from "react-icons"
import { GameContext } from "../GameContext"
import { Spinner, Popover } from "flowbite-react"

const ComputerCard = ({ isPlayerTurn, playerName, Avatar }: { isPlayerTurn: boolean, playerName: string, Avatar: IconType }) => {
    const { gameState } = useContext(GameContext)
    const content = (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="px-3 py-2">
                <div>{gameState.isLoading && <Spinner aria-label="Loading spinner" />}<span className="pl-3">{gameState.message}</span></div>
            </div>
        </div>
    );
    return (
        <Popover open={gameState.message != ""} content={content} placement="top">
            <div className={`flex justify-center items-center flex-col gap-2 ${isPlayerTurn && "bg-lime-600"}`}>
                <Avatar className={`size-12`} />
                <div>{playerName}</div>
            </div>
        </Popover >
    )
}

export default ComputerCard

