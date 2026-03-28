import Container from "@/ui/Container/Container";
import Content from "@/ui/Content/Content";
import Auth from '@/components/Auth/Auth'
import RegistrtionForm from "@/components/Auth/RegistrtionForm/RegistrtionForm";

export default function Page() {
    return (
        <>
            <Container>
                <Content>
                    <RegistrtionForm />
                </Content>
            </Container>

        </>
    )
}