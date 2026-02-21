import Container from "@/ui/Container/Container";
import Content from "@/ui/Content/Content";
import Auth from '@/components/Auth/Auth'

export default function Page() {
    return (
        <>
            <Container>
                <Content>
                    <div>Auth/Registration</div>
                    <Auth />
                </Content>
            </Container>

        </>
    )
}