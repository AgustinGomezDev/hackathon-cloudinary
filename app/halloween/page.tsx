'use client';

import React, { useEffect, useState } from 'react';
import { getCldImageUrl } from 'next-cloudinary';
import { useSearchParams } from 'next/navigation';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Loader from '@/components/Loader';
import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';
import monsters from '@/data/monsters.json'
import { Download } from 'lucide-react'


const Page = () => {
    const searchParams = useSearchParams();
    const id: string | null = searchParams.get('id');
    const gender: string | null = searchParams.get('gender');
    const monster: string | null = searchParams.get('monster');
    const changeBackground: string | null = searchParams.get('changeBackground');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const originalImage = id ? getCldImageUrl({ src: id }) : null;

    const setPrompt = () => {
        let prompt = ''

        if (monster) {
            const monsterPrompt = monsters.find((e) => e.id === parseInt(monster))
            prompt = `a very spooky ${gender} ${monsterPrompt?.prompt}`
        }

        return prompt
    }

    const url = id ? getCldImageUrl({
        src: id,
        replaceBackground: changeBackground === 'true' ? 'A spooky graveyard with crooked tombstones covered in fog glowing jack-o-lanterns scattered among the graves and a full moon illuminating the scene' : '',
        replace: {
            from: 'person',
            to: setPrompt(),
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
                    <div className='flex flex-col items-center gap-5'>
                        <ReactCompareSlider
                            className='h-[20rem] md:h-[35rem] shadow-xl'
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
                        <Button icon={Download} text="Descargar" variant='outline' cb={() => window.open(url, '_blank')} />
                    </div>
                ) : (
                    <p>No se encontró la imagen.</p>
                )
            )}
        </div>
    );
}

export default Page;
