'use client'

import { Form, Formik } from "formik";

import { AuthData } from '@/types/auth'

import Button from '@/ui/Button/Button';
import Input from '@/ui/Input/Input';

function AuthForm() {
    return (
        <>
            <div>
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
            </div >
        </>
    );
}

export default AuthForm;