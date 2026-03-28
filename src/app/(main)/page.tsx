import Dashboard from "@/components/Dashboard/Dashboard";
import TaskBlock from "@/components/TaskBlock/TaskBlock";
import Container from "@/ui/Container/Container";
import Content from "@/ui/Content/Content";

export default function Home() {
    return (
        <Container>
            <Content>
                <Dashboard />
            </Content>
            <Content>
                <TaskBlock />
            </Content>
        </Container>
    );
}
