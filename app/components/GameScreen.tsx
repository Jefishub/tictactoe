'use client'

import { Button, Card } from "flowbite-react"
import { useContext } from "react"
import { Board } from "./Board"
import { GameContext } from "../GameContext"
import { SettingsForm } from "./Settings"

export const GameScreen = () => {
    const { gameState, changeStatus, playAgain } = useContext(GameContext)

    return (
        <div className="flex flex-col items-center w-full p-4 gap-4">
            {gameState.status === 'initial' && <Button onClick={() => changeStatus('start')}>Play</Button>}
            {gameState.status != 'initial' &&
                <div className="animate-grow flex items-center bg-slate-500 max-w-96 aspect-square w-full rounded-lg">
                    {gameState.status === 'start' &&
                        <SettingsForm />}
                    {(gameState.status === 'game' || gameState.status === 'end') && <Board />}
                </div>}
            {gameState.status != 'initial' && <Card className="w-full max-w-96">
                {gameState.status === 'end'
                    ? <div>{`${gameState.winner === 'draw' ? "It's a draw!" : gameState.winner + " wins!"}`}</div>
                    : <div>{`${gameState.currentPlayer === 'o' ? gameState.playerNameO : gameState.playerNameX} turn`}</div>}
            </Card>}
            <div className="flex flex-row gap-2">
                {(gameState.status === 'end' || gameState.status === 'game') && <Button onClick={() => changeStatus('start')}>Settings</Button>}
                {gameState.status === 'end' && <Button onClick={playAgain}>Play again</Button>}
            </div>
        </div>
    )
}