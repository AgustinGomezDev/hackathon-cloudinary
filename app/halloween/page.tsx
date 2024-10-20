'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { getCldImageUrl } from 'next-cloudinary';
import { useSearchParams } from 'next/navigation';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Loader from '@/components/Loader';
import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';
import monsters from '@/data/monsters.json'
import { Download } from 'lucide-react'


const ImageComparison  = () => {
    const searchParams = useSearchParams();
    const id: string | null = searchParams.get('id');
    const gender: string | null = searchParams.get('gender');
    const monster: string | null = searchParams.get('monster');
    const changeBackground: string | null = searchParams.get('changeBackground');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const originalImage = id ? getCldImageUrl({ src: id }) : null;

    const getGeneratedImageUrl = useCallback(() => {
        if (!id) return null;

        let prompt = ''

        if(monster){
            const monsterPrompt = monsters.find((e) => e.id === parseInt(monster))
            prompt = `a very spooky ${gender} ${monsterPrompt?.prompt}`
        }

        return getCldImageUrl({
            src: id,
            replaceBackground: changeBackground === 'true' ? 'A spooky graveyard with crooked tombstones covered in fog glowing jack-o-lanterns scattered among the graves and a full moon illuminating the scene' : '',
            replace: {
                from: 'person',
                to: prompt,
                preserveGeometry: true
            },
            improve: true
        })
    }, [id, monster, gender, changeBackground])

    const loadImageWithRetries = useCallback(async (src: string, maxRetries: number = 10): Promise<string> => {
        let attempts = 0;
        const baseDelay = 1000;

        
        while (attempts < maxRetries) {
            try {
                const result = await new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(src);
                    img.onerror = () => reject(new Error('Error al cargar la imagen.'));
                    img.src = src;
                })
                return result as string;
            } catch {
                attempts++;
                if (attempts === maxRetries) {
                    throw new Error(`Error al cargar la imagen después de ${maxRetries} intentos.`)
                }
            }

            const delay = baseDelay * Math.pow(1.5, attempts)
            await new Promise(resolve => setTimeout(resolve, delay));

            const freshUrl = getGeneratedImageUrl();
            if (freshUrl) src = freshUrl;
        }
        throw new Error('Intentos máximos alcanzados.');
    }, [getGeneratedImageUrl])

    useEffect(() => {
        const url = getGeneratedImageUrl();
        if (!url) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setErrorMessage(null)

        loadImageWithRetries(url)
            .then((loadedUrl) => {
                setImageUrl(loadedUrl);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error cargando la imagen:', error);
                if (error.message.includes('423')) {
                    setErrorMessage('El recurso está temporalmente bloqueado. Intenta de nuevo.');
                } else {
                    setErrorMessage('Error al cargar la imagen. Por favor, intenta de nuevo.');
                }
                setIsLoading(false);
            });
    }, [id, getGeneratedImageUrl, loadImageWithRetries]);

    return (
        <div className='h-96 lg:h-[40rem] flex items-center justify-center px-5'>
            <BackToHome />
            {isLoading ? (
                <Loader />
            ) : errorMessage ? (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-red-500">{errorMessage}</p>
                    <Button
                        text="Reintentar"
                        variant='outline'
                        cb={() => window.location.reload()}
                    />
                </div>
            ) : (
                imageUrl && originalImage ? (
                    <div className='flex flex-col items-center gap-5'>
                        <ReactCompareSlider
                            className='h-[20rem] md:h-[35rem] shadow-xl'
                            itemOne={
                                <ReactCompareSliderImage
                                    className='w-auto rounded-xl'
                                    width={1200}
                                    height={200}
                                    src={originalImage}
                                    alt="Imagen de Cloudinary"
                                />
                            }
                            itemTwo={
                                <ReactCompareSliderImage
                                    className='w-auto rounded-xl'
                                    width={1200}
                                    height={200}
                                    src={imageUrl}
                                    alt="Imagen de Cloudinary modificada"
                                />
                            }
                        />
                        <Button icon={Download} text="Descargar" variant='outline' cb={() => window.open(imageUrl, '_blank')} />
                    </div>
                ) : (
                    <p>No se encontró la imagen.</p>
                )
            )}
        </div>
    );
}

const Page = () => (
    <Suspense fallback={<Loader />}>
        <ImageComparison />
    </Suspense>
);

export default Page;
