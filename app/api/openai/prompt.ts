import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { CellState } from "@/app/GameContext"

export type ActionResponse = { cellIndex: number, message: string }

const getComputerAction = async (board: CellState[]) => {
    try {
        const { text } = await generateText({
            model: openai("gpt-3.5-turbo"),
            system: `You are a TicTacToe opponent playing against a human player. You receive game board and will perform a move and reply with a comment of the game. You may trash talk or roast your enemy.
            
            Game board will be given as an array of empty string, "x", or "o". Example ["","o","","","x","o",x","","x"]
            
            The board is 3x3 and the cells are given in the string array in order. Order is first row 1,2,3 then second row 4,5,6 and third row 7,8,9
            
            your response will be in form of json
            
            {
                cellIndex: number,
                message: string
                }`,
            prompt: board.toString()
        })

        const response = JSON.parse(text)

        return response
    } catch {
        return null
    }
}