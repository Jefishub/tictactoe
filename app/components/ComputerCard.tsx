'use client'

import { IconType } from "react-icons"
import { Spinner, Popover } from "flowbite-react"
import { useContext, useEffect, useState } from "react"
import { GameContext } from "../GameContext"

const ComputerCard = ({ isPlayerTurn, playerName, Avatar }: { isPlayerTurn: boolean, playerName: string, Avatar: IconType }) => {
    const { messages, status } = useContext(GameContext);
    const [show, setShow] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const message = messages.filter((m) => m.role === 'assistant').at(-1)

    useEffect(() => {
        console.log(status);
        if (status === 'awaiting_message') setTimeout(() => setShow(false), 3000)
        else {
            setShow(true)
            setIsPending(true)
        }
    }, [status])

    useEffect(() => {
        if (message?.role === 'assistant') {
            setShow(true)
            setIsPending(false)
        }
    }, [message])

    const content = (
        <div className="flex flex-row justify-between w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="px-3 py-2 flex flex-row gap-2">
                {isPending && <div className="flex flex-row gap-2"><Spinner aria-label="Loading spinner" />Thinking...</div>}
                {message && !isPending && message.content}
            </div>
            <div className="p-2 cursor-pointer" onClick={() => setShow(false)}>x</div>
        </div>
    );
    return (
        <Popover open={show} content={content} placement="top" onOpenChange={() => setTimeout(() => setShow(false), 5000)}>
            <div className={`flex justify-center items-center flex-col gap-2 ${isPlayerTurn && "bg-lime-600"}`}>
                <Avatar className={`size-12`} />
                <div>{playerName}</div>
            </div>
        </Popover >
    )
}

export default ComputerCard

