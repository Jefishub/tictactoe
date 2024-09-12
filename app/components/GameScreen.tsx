'use client'

import { Button } from "flowbite-react"
import { useContext } from "react"
import { Board } from "./Board"
import { GameContext } from "../GameContext"

export const GameScreen = () => {
    const { gameState, changeStatus, playAgain } = useContext(GameContext)

    return (
        <div className="flex flex-col items-center w-full">
            {gameState.status === 'initial' && <Button onClick={() => changeStatus('start')}>Play</Button>}
            {gameState.status != 'initial' && <div className="animate-grow flex items-center">
                <Board />
            </div>}
            <div className="flex flex-col gap-2">
                <div>Current Player:{gameState.currentPlayer}</div>
                <div>Winner: {gameState.winner}</div>
                <div>Status: {gameState.status}</div>
            </div>
            {gameState.status === 'end' &&  <Button onClick={playAgain}>Play again</Button>}
        </div>
    )
}