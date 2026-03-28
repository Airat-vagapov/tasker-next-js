import Container from "@/ui/Container/Container";
import Content from "@/ui/Content/Content";
import AuthForm from "@/components/Auth/AuthForm/AuthForm";

export default function Page() {
    return (
        <>
            <Container>
                <Content>
                    <AuthForm />
                </Content>
            </Container>

        </>
    )
}