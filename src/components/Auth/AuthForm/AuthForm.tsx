'use client'

import { Form, Formik } from "formik";

import { AuthData } from '@/types/auth'

import Button from '@/ui/Button/Button';
import Input from '@/ui/Input/Input';
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "@/api/apiErrorHandler";
import { authApi } from "@/api/authApi";
import TextLink from "@/ui/TextLink/TextLink";

function AuthForm() {

    // API
    const login = useMutation<any, ApiError, AuthData>({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.error(error)
        }
    })
    return (
        <>
            <div className="flex flex-col gap-5 border-1 border-lightGray p-8 rounded-xl">
                <Formik<AuthData>
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    onSubmit={(value) => {
                        console.log(value)
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
                                inptType="text"
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
        </>
    );
}

export default AuthForm;