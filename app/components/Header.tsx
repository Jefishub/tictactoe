import { GiTicTacToe } from "react-icons/gi";

export const Header = () => {
    return (
        <div className="flex flex-col items-center pt-4">
            <div className="sm:text-4xl text-2xl">TicTacToe</div>
            <GiTicTacToe className="sm:size-40 size-28" />
        </div>
    )
}