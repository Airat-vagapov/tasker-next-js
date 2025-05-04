"use client";

import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import { useState } from "react";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import SuccessBlock from "@/components/SuccessBlock/SuccessBlock";
import Droplist from "@/ui/Droplist/Droplist";

import { ITask } from "@/types/task"
import { priorityData } from '@/data/priority'

type AddNewTaskFormValues = {
    title: string;
    description: string;
    priority: string;
}

const AddNewTaskForm = () => {
    const [taskIsAdded, setTaskIsAdded] = useState<boolean>(false);

    const addNewTask = async (task: ITask) => {
        const res = await axios.post("http://localhost:8080/task", task)
        return res
    };

    const addNewTaskForm = useFormik<AddNewTaskFormValues>({
        initialValues: {
            title: '',
            description: '',
            priority: '',
        },
        validationSchema: yup.object({
            title: yup.string().required("Required"),
            description: yup.string().required("Required"),
        }),
        onSubmit: async (values) => {

            try {
                const res = await addNewTask(values);
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
                        label="Name"
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
                    {/* <Input
                        label="Description"
                        id="text"
                        name="text"
                        inptType="text"
                        onChange={addNewTaskForm.handleChange}
                        onBlur={addNewTaskForm.handleBlur}
                        value={addNewTaskForm.values.priority}
                        errorText={errors.priority}
                    /> */}

                    <Droplist
                        id="priority"
                        name="priority"
                        label="Priority"
                        onChange={addNewTaskForm.handleChange}
                        onBlur={addNewTaskForm.handleBlur}
                        value={addNewTaskForm.values.priority}
                        options={priorityData}
                        form={addNewTaskForm}
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
