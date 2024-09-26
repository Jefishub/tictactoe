'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { FaRobot } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { IconType } from 'react-icons';
import { ImCross } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa";

const PLAYER: PlayerType = {
    name: "Player X",
    Avatar: FaRegSmile,
    Mark: ImCross
}

const COMPUTER: PlayerType = {
    name: "ChatGPT-3.5",
    Avatar: FaRobot,
    Mark: FaRegCircle,
}

// Define the context type
export type PlayerType = {
    name: string;
    Avatar: IconType;
    Mark: IconType;
};

// Define the context type
export type ComputerType = {
    name: string;
    Avatar: IconType;
    Mark: IconType;
};

export type PlayersStateType = {
    playerState: PlayerType
    computerState: ComputerType
    setPlayer: (player: PlayerType) => void
    setComputer: (computer: ComputerType) => void
}

// Create the GameContext
export const PlayerContext = createContext<PlayersStateType>({
    playerState: PLAYER,
    computerState: COMPUTER,
    setPlayer: () => { },
    setComputer: () => { }

});

// GameProvider component to wrap the app
export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    const [playerState, setPlayerState] = useState<PlayerType>(PLAYER);
    const [computerState, setComputerState] = useState<ComputerType>(COMPUTER);

    const setPlayer = (player: PlayerType) => {        
        setPlayerState(player)
    }

    const setComputer = (computer: ComputerType) => {
        setComputerState(computer)
    }

    return (
        <PlayerContext.Provider value={{ playerState, computerState, setPlayer, setComputer }}>
            {children}
        </PlayerContext.Provider>
    );
};
