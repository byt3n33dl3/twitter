import colors from "../../../utils/theme";

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    textColor?: 'primary' | string;
    variant?: 'primary' | string;
}

const Button: React.FC<Button> = (props) => {
    return (
        <button
            className={'flex-1 border p-2 py-3 rounded-full hover:border-gray-500 hover:bg-slate-200 my-2 cursor-pointer'}
            style={props?.variant === 'primary' ? { backgroundColor: props.disabled ? 'lightgrey' : colors.PRIMARY, color: 'white' } : {}}
            {...props}
        >
            <div className='text-center font-bold px-2' style={props?.textColor === 'primary' ? { color: colors.PRIMARY } : {}}>
                <p className="text-sm">{props?.title}</p>
            </div>
        </button>
    )
}

export default Button;