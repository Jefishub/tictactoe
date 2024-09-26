'use client'

import { Button, Card } from "flowbite-react"
import { useContext } from "react"
import { Board } from "./Board"
import { GameContext } from "../GameContext"
import { SettingsForm } from "./Settings"
import PlayerCard from "./PlayerCard"
import ComputerCard from "./ComputerCard"
import { PlayerContext } from "../PlayerContext"

export const GameScreen = () => {
    const { gameState, changeStatus, playAgain } = useContext(GameContext)
    const { playerState, computerState } = useContext(PlayerContext)

    return (
        <div className="flex flex-col items-center w-full p-4 gap-4">

            {gameState.status === 'initial' && <Button onClick={() => changeStatus('start')}>Play</Button>}

            {gameState.status != 'initial' &&
                <div className="animate-grow flex items-center bg-slate-500 max-w-96 aspect-square w-full rounded-lg">
                    {gameState.status === 'start' &&
                        <SettingsForm />}
                    {(gameState.status === 'game' || gameState.status === 'end') && <Board />}
                </div>}

            {gameState.status === 'end'
                ? <div className="text-2xl">{`${!gameState.winner ? "It's a draw!" : `${gameState.winner === '1' ? playerState.name : computerState.name} wins!`}`}</div>
                : null}

            {['game', 'end'].includes(gameState.status) &&
                <Card className="w-full max-w-96" theme={{ root: { children: "flex h-full flex-col justify-center gap-4" } }}>
                    <div className="grid grid-cols-2 w-full h-24">
                        <PlayerCard />
                        <ComputerCard />
                    </div>
                </Card>}


            <div className="flex flex-row gap-2">
                {(gameState.status === 'end' || gameState.status === 'game') && <Button onClick={() => changeStatus('start')}>Back to start</Button>}
                {gameState.status === 'end' && <Button onClick={playAgain}>Play again</Button>}
            </div>
            {/* <Button onClick={() => console.log(gameState)}>Log state</Button> */}

        </div>
    )
}

