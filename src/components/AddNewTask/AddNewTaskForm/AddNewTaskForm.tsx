"use client";

import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import { useState } from "react";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import SuccessBlock from "@/components/SuccessBlock/SuccessBlock";
import ErrorBlock from "@/components/ErrorBlock/ErrorBlock";
import Droplist from "@/ui/Droplist/Droplist";

import { ITask } from "@/types/task"
import { priorityData } from '@/data/priority'

import { useTaskListStore } from "@/store/store"
import Textarea from "@/ui/Textarea/Textarea";

type AddNewTaskFormValues = {
    title: string;
    description: string;
    priority: string;
}

const AddNewTaskForm = () => {
    const [taskIsAdded, setTaskIsAdded] = useState<boolean>(false);
    const [taskAddError, setTaskAddError] = useState<boolean>(false);
    const updateState = useTaskListStore((state) => state.changeUpdate)
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
                setTaskAddError(false);
                setTaskIsAdded(true);
                addNewTaskForm.resetForm();
                updateState()
            } catch (err) {
                console.error(err);
                setTaskIsAdded(false);
                setTaskAddError(true);
            }
        },
    });

    const { errors, touched } = addNewTaskForm;
    return (
        <div className="relative">
            {!taskIsAdded && !taskAddError && (
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
                    {/* <Input
                        label="Description"
                        id="description"
                        name="description"
                        inptType="text"
                        onChange={addNewTaskForm.handleChange}
                        onBlur={addNewTaskForm.handleBlur}
                        value={addNewTaskForm.values.description}
                        errorText={errors.description}
                    /> */}

                    <Textarea
                        label="Description"
                        name="description"
                        id="description"
                        onChange={addNewTaskForm.handleChange}
                        onBlur={addNewTaskForm.handleBlur}
                        value={addNewTaskForm.values.description}
                        errorText={errors.description}
                    />

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
                    text="You can see new task on main page"
                    actionText="Add another task"
                    action={() => setTaskIsAdded(false)}
                />
            )}

            {taskAddError && (
                <ErrorBlock
                    title="Ops! Error!"
                    text="Something went wrong. Please try again."
                    actionText="Try again"
                    action={() => addNewTaskForm.handleSubmit()}
                />
            )}
        </div>
    );
};

export default AddNewTaskForm;
