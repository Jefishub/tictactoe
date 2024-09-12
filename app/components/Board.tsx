import { Cell } from "./Cell";

export const Board = () => {
    const cells = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <div className="flex w-screen max-w-96 p-4">
            <div className="grid grid-cols-3 w-full aspect-square bg-slate-500">
                {cells.map((cell, i) => (
                    <Cell
                        key={cell}
                        index={i}
                    >
                        {cell}
                    </Cell>
                ))}
            </div>
        </div>
    );
};
