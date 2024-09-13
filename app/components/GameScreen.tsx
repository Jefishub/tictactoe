'use client'

import { Button, Card, Spinner } from "flowbite-react"
import { useContext } from "react"
import { Board } from "./Board"
import { GameContext } from "../GameContext"
import { SettingsForm } from "./Settings"
import { FaRobot } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import PlayerCard from "./PlayerCard"
import ComputerCard from "./ComputerCard"

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

            {gameState.status != 'initial' &&
                <Card className="w-full max-w-96" theme={{ root: { children: "flex h-full flex-col justify-center gap-4" } }}>
                    <div className="grid grid-cols-2 w-full h-24">
                        <PlayerCard isPlayerTurn={gameState.currentPlayer === 'x'} playerName={gameState.playerNameX} Avatar={FaRegSmile} />
                        <ComputerCard isPlayerTurn={gameState.currentPlayer === 'o'} playerName={gameState.playerNameO} Avatar={FaRobot} />
                    </div>
                </Card>}
            {gameState.status === 'end'
                ? <div>
                    <div>{`${!gameState.winner ? "It's a draw!" : gameState.winner + " wins!"}`}</div>
                </div>
                : null}

            <div className="flex flex-row gap-2">
                {(gameState.status === 'end' || gameState.status === 'game') && <Button onClick={() => changeStatus('start')}>Settings</Button>}
                {gameState.status === 'end' && <Button onClick={playAgain}>Play again</Button>}
            </div>
            <Button onClick={() => console.log(gameState)}>Log state</Button>

        </div>
    )
}

