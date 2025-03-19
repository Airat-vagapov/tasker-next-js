import Task from "@/components/Task/Task";
import TaskBlock from "@/components/TaskBlock/TaskBlock";
import Container from "@/ui/Container/Container";

export default function Home() {
    return (
      <Container>
        <TaskBlock />
        <Task id={111} text={'Text of task for test'}/>
      </Container>
    ) 
    
}
