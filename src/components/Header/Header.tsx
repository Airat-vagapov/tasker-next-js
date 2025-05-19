'use client'

import Container from "@/ui/Container/Container";
import AddNewTask from '@/components/AddNewTask/AddNewTask'
import Logo from "@/ui/Logo/Logo";

const Header = () => {
    return (
        <Container>
            <div className="px-8 pt-6 pb-6 flex justify-between items-center rounded-xl
            bg-lightblack mt-8">
                {/* Header */}
                <Logo />
                <AddNewTask />
            </div>
        </Container>
    );
};

export default Header;
