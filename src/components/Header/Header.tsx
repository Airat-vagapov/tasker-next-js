import Container from "@/ui/Container/Container";
import Button from '@/ui/Button/Button'

const Header = () => {
    return (
        <Container>
            <div className="pt-6 pb-6 flex justify-between items-center">
                Header
                <Button text={'Add new task'} />
            </div>
            
        </Container>
    );
};

export default Header;
