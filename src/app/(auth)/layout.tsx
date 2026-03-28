export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex justify-center">
                <div className="w-1/3">
                    {children}
                </div>
            </div>
        </>
    )
}