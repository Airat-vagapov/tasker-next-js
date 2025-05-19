type FieldRowProps = {
    children: React.ReactNode;
    label: string;
}

const FieldRow: React.FC<FieldRowProps> = ({ children, label }) => {
    return (

        <div className="flex gap-3 items-center">
            <p>{label}</p>
            <div>
                {children}
            </div>
        </div>
    )
}

export default FieldRow;