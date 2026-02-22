'use client'

import * as yup from "yup";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/authApi";
import { RegisterData } from "@/types/auth";
import { IUser } from '@/types/user'

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import SuccessBlock from "@/components/SuccessBlock/SuccessBlock";
import { useState } from "react";
import { ApiError } from "@/api/apiErrorHandler";
import ErrorMessage from "@/ui/ErrorMessage/ErrorMessage";

const RegistrtionForm = () => {
    // States
    const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false)
    const [registerError, setRegisterError] = useState<ApiError>()
    const [newUser, setNewUser] = useState<IUser>()
    // API
    // const queryClient = useQueryClient()
    const register = useMutation<any, ApiError, RegisterData>({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            console.log('API response in Form', data)
            setNewUser(data.user)
            setIsRegisterSuccess(true)
        },
        onError: (error) => {
            setRegisterError(error)
        }
    })

    return (
        <>
            <span>Registration Form</span>
            <div className="flex flex-col gap-5">
                <ErrorMessage message={registerError?.errorMessage || 'Unknown message'}></ErrorMessage>

                {!isRegisterSuccess &&
                    <Formik<RegisterData>
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            username: '',
                            password: '',
                            role: 'user'
                        }}
                        validationSchema={yup.object({
                            firstName: yup.string().required("Required"),
                            lastName: yup.string().required("Required"),
                            username: yup.string().required("Required"),
                            password: yup.string().min(8, "Minimum 8 symbols").required("Required"),
                        })}
                        onSubmit={async (values) => {
                            const user = await register.mutateAsync(values)
                            setRegisterError(undefined)
                            console.log('Form submit data', user)
                        }

                        }
                    >
                        {({ errors }) => (
                            <Form className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <div className="w-full">
                                        <Input
                                            label="First name"
                                            id="firstName"
                                            name="firstName"
                                            inptType="text"
                                            errorText={errors?.firstName}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Input
                                            label="Last name"
                                            id="lastName"
                                            name="lastName"
                                            inptType="text"
                                            errorText={errors?.lastName}
                                        />
                                    </div>
                                </div>
                                <Input
                                    label="Username"
                                    id="username"
                                    name="username"
                                    inptType="text"
                                    errorText={errors?.username}
                                />
                                <Input
                                    label="Password"
                                    id="password"
                                    name="password"
                                    inptType="password"
                                    errorText={errors?.password}
                                />
                                <Button btnType="submit" text={"Register"} />
                            </Form>
                        )}
                    </Formik>
                }

                {(isRegisterSuccess && newUser) &&
                    <>
                        <SuccessBlock
                            title={`${newUser?.firstName} ${newUser?.lastName} register is successful`}
                            text={`You can authorize with username ${newUser.username}`}
                        // actionText="Add another task"
                        // action={ }
                        />
                    </>
                }
            </div >
        </>
    )
}

export default RegistrtionForm;