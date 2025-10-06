"use client";

import { useFormik } from "formik";
import * as yup from "yup";

import { useState } from "react";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import SuccessBlock from "@/components/SuccessBlock/SuccessBlock";
import ErrorBlock from "@/components/ErrorBlock/ErrorBlock";
import Droplist from "@/ui/Droplist/Droplist";

import { priorityData } from '@/data/priority'

import Textarea from "@/ui/Textarea/Textarea";
import Accordeon from "@/ui/Accordeon/Accordeon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/api/taskApi";

import { generateText } from "@/api/aiApi";

type AddNewTaskFormValues = {
    title: string;
    description: string;
    priority: string;
}

const AddNewTaskForm = () => {
    const [taskIsAdded, setTaskIsAdded] = useState<boolean>(false);
    const [taskAddError, setTaskAddError] = useState<boolean>(false);

    // TODO:
    // Добавить типизацию ошибки
    const [fetchError, setFetchError] = useState<any>(null);

    // API
    const queryClient = useQueryClient()
    const add = useMutation({
        mutationFn: taskApi.addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasksDone'] })
            queryClient.invalidateQueries({ queryKey: ['tasksActive'] })
            setTaskAddError(false);
            setTaskIsAdded(true);
            addNewTaskForm.resetForm();
        },
        onError: (error) => {
            console.log(error)
            setFetchError(error);
            setTaskIsAdded(false);
            setTaskAddError(true);
        }
    })

    // Formik settings
    const addNewTaskForm = useFormik<AddNewTaskFormValues>({
        initialValues: {
            title: '',
            description: '',
            priority: 'Medium',
        },
        validationSchema: yup.object({
            title: yup.string().required("Required"),
            description: yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            add.mutate(values)
        },
    });

    const { errors, touched } = addNewTaskForm;

    // Детали ошибки
    const errorMsg = fetchError?.message || "Unknown error";
    const errorCode = fetchError?.code || "Unknown code";
    const errorDetail = fetchError?.stack || 'No error data';
    // const errorDetail = fetchError?.response?.data.message.detail || 'No error data';

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
                    <Button text={"Generate task description"} onClick={async () => {
                        if (addNewTaskForm.values.title) {
                            const result = await generateText(addNewTaskForm.values.title)
                            console.log('Результат генерации', result)
                            const { setFieldValue } = addNewTaskForm;
                            setFieldValue('description', result)
                        }
                    }}></Button>

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
                    text={
                        <>
                            <span>{`${errorCode} `}</span>
                            {typeof errorMsg == "object" ? JSON.stringify(errorMsg) : errorMsg}
                            <Accordeon
                                title="Details"
                                content={
                                    <>
                                        {typeof errorDetail == "object" ? JSON.stringify(errorDetail) : errorDetail}
                                    </>
                                }
                            >
                            </Accordeon>

                        </>
                    }
                    actionText="Try again"
                    action={() => addNewTaskForm.handleSubmit()}
                />
            )}
        </div>
    );
};

export default AddNewTaskForm;
