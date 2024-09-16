import { FormEvent, useContext, useState } from "react"
import { Button, Label, TextInput, Select } from "flowbite-react"
import { Difficulty, GameContext } from "../GameContext"

export const SettingsForm = () => {
    const { startGame } = useContext(GameContext)
    const [name, setName] = useState("Player X")
    const [difficulty, setDifficulty] = useState<Difficulty>("easy")

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        startGame({ playerName1: name, difficulty: difficulty })
    }

    return (
        <form className="flex flex-col flex-grow w-full gap-2 p-4" onSubmit={(e) => submitForm(e)}>
            <Label htmlFor="email1" value="Player Name" />
            <TextInput id="name" name="name" value={name} required onChange={(e) => setName(e.target.value)}/>
            <Label htmlFor="email1" value="Difficulty" />
            <Select id="difficulty" name="difficulty" required onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                <option value={'easy'}>Easy</option>
                <option value={'medium'}>Medium</option>
                <option value={'hard'}>Hard</option>
            </Select>
            <Button type="submit" className="m-8">Start Game</Button>
        </form>
    )
}