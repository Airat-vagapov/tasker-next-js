"use client";

import { Form, Formik, useFormik } from "formik";
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

import { generateText, getModels } from "@/api/aiApi";

const AddNewTaskForm = () => {
    const [taskIsAdded, setTaskIsAdded] = useState<boolean>(false);
    const [taskAddError, setTaskAddError] = useState<boolean>(false);

    // TODO:
    // Добавить типизацию ошибки
    const [fetchError, setFetchError] = useState<any>(null);

    // API
    const queryClient = useQueryClient()
    const addTask = useMutation({
        mutationFn: taskApi.addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allTasks'] })
            setTaskAddError(false);
            setTaskIsAdded(true);
        },
        onError: (error) => {
            (error)
            setFetchError(error);
            setTaskIsAdded(false);
            setTaskAddError(true);
        }
    })

    // const { errors, touched } = addNewTaskForm;

    // Детали ошибки
    const errorMsg = fetchError?.message || "";
    const errorCode = fetchError?.response?.status || "";
    const errorDetail = fetchError?.stack || '';

    // Fromik settings
    type FilterValuesProps = {
        title: string,
        description: string,
        priority: string,
    }

    return (
        <div className="relative">
            {!taskIsAdded && !taskAddError && (
                <Formik<FilterValuesProps>
                    initialValues={{
                        title: '',
                        description: '',
                        priority: 'Medium',
                    }}
                    validationSchema={yup.object({
                        title: yup.string().required("Required"),
                        description: yup.string().required("Required"),
                    })}
                    onSubmit={(values, { resetForm }) => {
                        addTask.mutate(values)
                        resetForm();
                    }}
                >
                    {() => (
                        <Form className="flex flex-col gap-5">
                            <p className="text-center">Add new task</p>
                            <Input
                                label="Name"
                                id="text"
                                name="title"
                                inptType="text"

                            />
                            {/* <Button text={"Generate task description"} onClick={async () => {
                        if (addNewTaskForm.values.title) {
                            const result = await generateText(addNewTaskForm.values.title)
                            ('Результат генерации', result)
                            const { setFieldValue } = addNewTaskForm;
                            setFieldValue('description', result)
                        }
                    }}></Button> */}

                            <Textarea
                                label="Description"
                                name="description"
                                id="description"
                            />

                            <Droplist
                                id="priority"
                                name="priority"
                                label="Priority"
                                placeholder="Select priority"
                                options={priorityData}
                            />

                            <Button btnType="submit" text={"Add new task"} />
                        </Form>
                    )}
                </Formik>
            )}

            {
                taskIsAdded && (
                    <SuccessBlock
                        title="New task succesfully added!"
                        text="You can see new task on main page"
                        actionText="Add another task"
                        action={() => setTaskIsAdded(false)}
                    />
                )
            }

            {
                taskAddError && (
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
                    // action={() => addNewTaskForm.handleSubmit()}
                    />
                )
            }
        </div >
    );
};

export default AddNewTaskForm;
