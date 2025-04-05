import Container from "@/ui/Container/Container";
import AddNewTask from '@/components/AddNewTask/AddNewTask'

const Header = () => {
    return (
        <Container>
            <div className="pt-6 pb-6 flex justify-between items-center">
                Header
                <AddNewTask />
            </div>
        </Container>
    );
};

export default Header;
