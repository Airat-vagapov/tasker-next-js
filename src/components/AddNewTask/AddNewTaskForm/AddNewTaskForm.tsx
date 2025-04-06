import { useFormik } from "formik";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import axios from "axios";

const AddNewTaskForm = () => {
    const addNewTask = async (text: string) => {
        await axios
            .post("http://localhost:8080/task", {
                text: text,
            })
            .then((res) => {
                console.log(res);
            });
    };

    const addNewTaskForm = useFormik({
        initialValues: {
            text: "",
        },
        onSubmit: (values) => {
            console.log(values);

            addNewTask(values.text);
        },
    });

    return (
        <div className="">
            <form
                className="flex flex-col gap-5"
                onSubmit={addNewTaskForm.handleSubmit}
            >
                <Input
                    label="Task text"
                    id="text"
                    name="text"
                    inptType="text"
                    onChange={addNewTaskForm.handleChange}
                    onBlur={addNewTaskForm.handleBlur}
                    value={addNewTaskForm.values.text}
                />
                {/* <input
                    id="taskText"
                    name="taskText"
                    type="text"
                    onChange={addNewTaskForm.handleChange}
                    onBlur={addNewTaskForm.handleBlur}
                    value={addNewTaskForm.values.text}
                /> */}
                <Button text={"Add new task"} />
            </form>
        </div>
    );
};

export default AddNewTaskForm;
