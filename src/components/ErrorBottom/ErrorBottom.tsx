'use client'

import Button from '@/ui/Button/Button';
import Container from '@/ui/Container/Container';
import React, { useState } from 'react';

type ErrorBottomProps = {
    errorText: string | null;
}

const ErrorBottom: React.FC<ErrorBottomProps> = ({ errorText }) => {
    const [showError, setShowError] = useState<boolean>(true);

    const handleClose = () => {
        setShowError(false);
    };

    return (

        <div
            className={`fixed w-full bottom-4 left-0 right-0  text-mainblack  
                transition-transform duration-500 transform 
                ${showError ? 'translate-y-0' : 'translate-y-[calc(100%+16px)]'
                }`}
        >
            <Container>
                <div className="flex justify-between items-center bg-white py-4 px-6 rounded-lg">
                    <div>
                        <p className='font-bold'>Ops! Error!</p>
                        {errorText ?
                            <p>Reason: {errorText}</p>
                            :
                            <p>An error occurred. Please try again.</p>
                        }
                    </div>


                    <Button
                        text="Close"
                        onClick={handleClose}
                    />
                </div>
            </Container>
        </div>
    );
};

export default ErrorBottom;
