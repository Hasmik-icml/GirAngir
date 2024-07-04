interface HeaderProps {
    title: string;
    subTitle: string;
}
export default function FormHeader({ ...props }: HeaderProps) {
    return (
        <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white">{props.title}</h1>
            <p className="text-gray-400 mt-2">{props.subTitle}</p>
        </div>
    )
}