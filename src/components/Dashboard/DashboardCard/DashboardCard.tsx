type DashboardCardProps = {
    children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children }) => {
    return (
        <Card>
            <div className="">{children}</div>
        </Card>
    )
}

export default DashboardCard;