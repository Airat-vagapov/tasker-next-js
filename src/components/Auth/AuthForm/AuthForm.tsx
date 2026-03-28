'use client'
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { AuthData, AuthResponse } from '@/types/auth'

import Button from '@/ui/Button/Button';
import Input from '@/ui/Input/Input';
import { ApiError } from "@/api/apiErrorHandler";
import { authApi } from "@/api/authApi";
import TextLink from "@/ui/TextLink/TextLink";
import ErrorMessage from "@/ui/ErrorMessage/ErrorMessage";
import { useRouter } from "next/navigation";


function AuthForm() {
    // States
    const [authError, setAuthError] = useState<ApiError>()

    //Router
    const router = useRouter()

    // API
    const login = useMutation<void, ApiError, AuthData>({
        mutationFn: authApi.login,
    })
    return (
        <div className="flex flex-col gap-5 border-1 border-lightGray p-8 rounded-xl">
            {authError && <ErrorMessage message={authError?.errorMessage || 'Unknown message'}></ErrorMessage>}

            <Formik<AuthData>
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={yup.object({
                    username: yup.string().required("Required"),
                    password: yup.string().required("Required"),
                })}
                onSubmit={async (values) => {
                    try {
                        await login.mutateAsync(values)
                        setAuthError(undefined)
                        router.push('/')
                    } catch (error) {
                        console.error(error)
                        setAuthError(error as ApiError)
                    }
                }}
            >
                {({ errors }) => (
                    <Form className="flex flex-col gap-5">
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
                        <Button btnType="submit" text={"Login"} />
                    </Form>
                )}

            </Formik>

            <div className="flex justify-center">
                <TextLink type={'link'} link={'/registration'}>Register new account</TextLink>
            </div>
        </div >
    );
}

export default AuthForm;