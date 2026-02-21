'use client'

import * as yup from "yup";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/authApi";
import { RegisterData } from "@/types/auth";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import SuccessBlock from "@/components/SuccessBlock/SuccessBlock";

const RegistrtionForm = () => {
    // API
    const queryClient = useQueryClient()
    const register = useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            console.log('API response in Form', data)
        }
    })

    return (
        <>
            <span>Registration Form</span>
            <div>
                <Formik<RegisterData>
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: '',
                        password: '',
                        role: 'user'
                    }}
                    validationSchema={yup.object({
                        password: yup.string().required("Required")
                    })}
                    onSubmit={(values) => {
                        console.log('Form data', values)
                        const res = register.mutate(values)
                        console.log('Form submit data', res)
                    }

                    }
                >
                    {() => (
                        <Form className="flex flex-col gap-5">
                            <div className="flex gap-3">
                                <div className="w-full">
                                    <Input
                                        label="First name"
                                        id="firstName"
                                        name="firstName"
                                        inptType="text"
                                    />
                                </div>
                                <div className="w-full">
                                    <Input
                                        label="Last name"
                                        id="lastName"
                                        name="lastName"
                                        inptType="text"
                                    />
                                </div>
                            </div>
                            <Input
                                label="Username"
                                id="username"
                                name="username"
                                inptType="text"
                            />
                            <Input
                                label="Password"
                                id="password"
                                name="password"
                                inptType="password"
                            />
                            <Button btnType="submit" text={"Register"} />
                        </Form>
                    )}
                </Formik>

                <SuccessBlock
                    title="New task succesfully added!"
                    text="You can see new task on main page"
                    actionText="Add another task"
                    // action={}
                />
            </div>
        </>
    )
}

export default RegistrtionForm;