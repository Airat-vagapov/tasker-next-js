"use client";

import { useFormik } from "formik";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import SuccessBlock from "@/components/SuccessBlock/SuccessBlock";

const AddNewTaskForm = () => {
    const [taskIsAdded, setTaskIsAdded] = useState<boolean>(false);

    const addNewTask = async (text: string) => {
        await axios
            .post("http://localhost:8080/task", {
                text: text,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addNewTaskForm = useFormik({
        initialValues: {
            title: '',
            description: '',
            priority: '',
        },
        validationSchema: yup.object({
            text: yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            console.log(values);

            try {
                await addNewTask(values.title);
                setTaskIsAdded(true);
                addNewTaskForm.resetForm();
            } catch (err) {
                console.error(err);
            }
        },
    });

    const { errors, touched } = addNewTaskForm;

    return (
        <div className="relative">
            {!taskIsAdded && (
                <form
                    className="flex flex-col gap-5"
                    onSubmit={addNewTaskForm.handleSubmit}
                >
                    <p className="text-center">Add new task</p>
                    <Input
                        label="Task text"
                        id="text"
                        name="title"
                        inptType="text"
                        onChange={addNewTaskForm.handleChange}
                        onBlur={addNewTaskForm.handleBlur}
                        value={addNewTaskForm.values.title}
                        errorText={errors.title}
                    />
                    <Input
                        label="Description"
                        id="text"
                        name="description"
                        inptType="text"
                        onChange={addNewTaskForm.handleChange}
                        onBlur={addNewTaskForm.handleBlur}
                        value={addNewTaskForm.values.description}
                        errorText={errors.description}
                    />
                    <Input
                        label="Description"
                        id="text"
                        name="text"
                        inptType="text"
                        onChange={addNewTaskForm.handleChange}
                        onBlur={addNewTaskForm.handleBlur}
                        value={addNewTaskForm.values.priority}
                        errorText={errors.priority}
                    />

                    <Button btnType="submit" text={"Add new task"} />
                </form>
            )}

            {taskIsAdded && (
                <SuccessBlock
                    title="New task succesfully added!"
                    text="New task you can see on main page"
                    actionText="Add another task"
                    action={() => setTaskIsAdded(false)}
                />
            )}
        </div>
    );
};

export default AddNewTaskForm;
