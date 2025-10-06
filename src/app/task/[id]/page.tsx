import ErrorBottom from "@/components/ErrorBottom/ErrorBottom";
import TaskDetailHeader from "@/components/TaskDetail/TaskDetailHeader/TaskDetailHeader";
import { priorityColors } from "@/data/priority";
import Badge from "@/ui/Badge/Badge";
import Container from "@/ui/Container/Container";
import Content from "@/ui/Content/Content";
import ContentBlock from "@/ui/ContentBlock/ContentBlock";
import FieldRow from "@/ui/FieldRow/FieldRow";
import PageTitle from "@/ui/PageTitle/PageTitle";
import { capitalizeFirstLetter, convertStringToTime } from "@/utils/scripts";

import TaskDetail from "@/components/TaskDetail/TaskDetail";



type Props = {
    params: {
        id: string;
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    return (
        <>
            <Container>
                <Content>
                    <TaskDetail id={id}></TaskDetail>
                </Content>
            </Container>


        </>
    )
    // return (
    //     <>
    //         <ErrorBottom errorText={(err as Error).message} />
    //     </>
    // )
}