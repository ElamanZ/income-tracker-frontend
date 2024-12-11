
type Props = {
    title: string;
    type?: 'button' | 'submit';
};
const CustomCreateBtn = ({ title, type }: Props) => {
    return (
        <>
            <button
                type={type ?? 'button'}
                className="w-full h-10 rounded-lg bg-gradient-to-r from-[#DF4BFF] via-[#799AFF] to-[#65D5FE]"
            >
                {title}
            </button>
        </>
    )
}

export default CustomCreateBtn