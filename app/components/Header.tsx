import { GiTicTacToe } from "react-icons/gi";

export const Header = () => {
    return (
        <div className="flex flex-col items-center pt-4">
            <div className="text-4xl">TicTacToe</div>
            <GiTicTacToe className="w-40 h-40" />
        </div>
    )
}