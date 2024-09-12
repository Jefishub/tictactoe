'use client'

import { Button, Card } from "flowbite-react"
import { useContext } from "react"
import { Board } from "./Board"
import { GameContext } from "../GameContext"

export const GameScreen = () => {
    const { gameState, changeStatus, playAgain } = useContext(GameContext)

    return (
        <div className="flex flex-col items-center w-full p-4 gap-4">
            {gameState.status === 'initial' && <Button onClick={() => changeStatus('start')}>Play</Button>}
            {gameState.status != 'initial' && <div className="animate-grow flex items-center">
                <Board />
            </div>}
            {gameState.status != 'initial' && <Card className="w-full max-w-96">
                {gameState.status === 'end'
                    ? <div>{`${gameState.winner === 'draw' ? "It's a draw!" : "Player " + gameState.winner + " wins!"}`}</div>
                    : <div>{`Player ${gameState.currentPlayer} turn`}</div>}
            </Card>}
            {gameState.status === 'end' && <Button onClick={playAgain}>Play again</Button>}
        </div>
    )
}