'use client'

import AuthForm from '@/components/Auth/AuthForm/AuthForm'
import RegistrtionForm from './RegistrtionForm/RegistrtionForm';

const Auth = () => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col gap-5 rounded-xl border-1 border-lightGray p-4 bg-lightblack max-w-lg'>
                <RegistrtionForm></RegistrtionForm>
                111
                <AuthForm></AuthForm>
            </div>
        </div>
    )
}

export default Auth;