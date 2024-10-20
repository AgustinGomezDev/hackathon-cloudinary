'use client';

import React, { useEffect, useState } from 'react';
import { getCldImageUrl } from 'next-cloudinary';
import { useSearchParams } from 'next/navigation';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Loader from '@/components/Loader';
import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';

const Page = () => {
    const searchParams = useSearchParams();
    const id: string | null = searchParams.get('id');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const originalImage = id ? getCldImageUrl({ src: id }) : null;

    const url = id ? getCldImageUrl({
        src: id,
        replaceBackground: 'dark halloween scene',
        replace: {
            from: 'person',
            to: 'a zombie with decaying green skin and hollow eyes',
            preserveGeometry: true
        },
        improve: true
    }) : null;

    useEffect(() => {
        setIsLoading(true);

        const checkImageLoaded = () => {
            if (url) {
                const img = new window.Image();
                img.src = url;
                img.onload = () => {
                    setIsLoading(false);
                };
                img.onerror = () => {
                    setIsLoading(false);
                };
            } else {
                setIsLoading(false);
            }
        };

        checkImageLoaded();
    }, [url]);

    return (
        <div className='h-96 lg:h-[40rem] flex items-center justify-center px-5'>
            <BackToHome />
            {isLoading ? (
                <Loader />
            ) : (
                url && originalImage ? (
                    <div className='flex flex-col gap-5'>
                        <ReactCompareSlider
                            className='h-[20rem] md:h-[35rem]'
                            itemOne={
                                <ReactCompareSliderImage
                                    className='w-auto rounded-xl'
                                    width={1200}
                                    height={200}
                                    src={originalImage || ''}
                                    alt="Imagen de Cloudinary"
                                />
                            }
                            itemTwo={
                                <ReactCompareSliderImage
                                    className='w-auto rounded-xl'
                                    width={1200}
                                    height={200}
                                    src={url || ''}
                                    alt="Imagen de Cloudinary modificada"
                                />
                            }
                        />
                        <Button text="Descargar" variant='outline' />
                    </div>
                ) : (
                    <p>No se encontró la imagen.</p>
                )
            )}
        </div>
    );
}

export default Page;
