export const BasicButton = ({ text, className }: { text: string, className: string }) => {
    return (
        <button className={"ring-2 p-4 hover:bg-slate-500 rounded-lg " + className}>
            {text}
        </button>
    )
}