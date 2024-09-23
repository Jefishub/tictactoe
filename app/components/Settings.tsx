import { FormEvent, useContext, useState } from "react"
import { Button, Label, TextInput } from "flowbite-react"
import { GameContext } from "../GameContext"
import { FaRegSmile } from "react-icons/fa";
import { FaRegFaceGrinTongue, FaRegFaceGrinBeam, FaRegFaceKissWinkHeart, FaRegHeart } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa";
import { RiVipDiamondLine } from "react-icons/ri";
import { IoTriangleOutline } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { PlayerContext } from "../PlayerContext";

export const SettingsForm = () => {
    const { startGame } = useContext(GameContext)
    const { setComputer, setPlayer, computerState } = useContext(PlayerContext)
    const [playerName, setPlayerName] = useState("Player")
    const [avatar, setAvatar] = useState<number>(0)
    const [mark, setMark] = useState<number>(0)
    const [mark2, setMark2] = useState<number>(1)

    const submitForm = (e: FormEvent) => {
        e.preventDefault()        
        setPlayer({ name: playerName, Avatar: avatarList[avatar], Mark: markList[mark] })
        setComputer({ ...computerState, Mark: markList[mark2] })
        startGame()
    }

    const markToggle = (index: number) => {
        if (index === 0) {
            setMark2(1)
        } else if (index === 1) {
            setMark2(0)
        }
        setMark(index)
    }

    return (
        <form className="flex flex-col flex-grow w-full gap-2 p-4" onSubmit={(e) => submitForm(e)}>
            <Label htmlFor="email1" value="Player Name" />
            <TextInput id="name" name="name" value={playerName} required onChange={(e) => setPlayerName(e.target.value)} />
            <Label htmlFor="avatar" value="Avatar" />
            <div className="flex flex-row flex-wrap gap-2" id="avatar">
                {avatarList.map((Avatar, i) => {
                    return <div key={i} className={`border-2 border-white p-2 ${avatar === i && "bg-green-500"}`} onClick={() => setAvatar(i)}><Avatar className="size-8" /></div>
                })}
                <div className={`border-2 border-white p-2 bg-red-500 ml-8`} ><FaRobot className="size-8" /></div>
            </div>
            <Label htmlFor="mark" value="Mark" />
            <div className="flex flex-row flex-wrap gap-2" id="mark">
                {markList.map((Avatar, i) => {
                    return <div key={i} className={`border-2 border-white p-2 ${mark === i && "bg-green-500"} ${mark2 === i && "bg-red-500"}`} onClick={() => markToggle(i)}><Avatar className="size-4" /></div>
                })}
            </div>
            <Button type="submit" className="mt-4">Start Game</Button>
        </form>
    )
}

const avatarList = [
    FaRegSmile, FaRegFaceGrinTongue, FaRegFaceGrinBeam, FaRegFaceKissWinkHeart
]

const markList = [ImCross, FaRegCircle, FaRegHeart, RiVipDiamondLine, IoTriangleOutline]