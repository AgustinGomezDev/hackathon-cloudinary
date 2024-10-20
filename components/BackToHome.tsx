import React from 'react';
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const BackToHome = () => {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <div className="absolute top-5 left-5">
            <button onClick={handleBackToHome}
            className='cursor-pointer p-2 transition-transform duration-300 ease-in-out hover:-translate-x-2'>
                <ArrowLeft />
            </button>
        </div>
    )

}

export default BackToHome   