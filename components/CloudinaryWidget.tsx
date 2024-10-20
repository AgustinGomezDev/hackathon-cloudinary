'use client'

import { CldUploadWidget } from 'next-cloudinary';
import { Skull } from 'lucide-react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import monsters from '@/data/monsters.json'

interface ResourceInfo {
    public_id: string;
    secure_url: string;
}

const CloudinaryWidget = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [uploadedImageInfo, setUploadedImageInfo] = useState<ResourceInfo | null>(null)
    const [gender, setGender] = useState('')
    const [monster, setMonster] = useState('')
    const [changeBackground, setChangeBackground] = useState(false)
    const router = useRouter()

    const handleClick = (open: () => void) => {
        open();
    };

    const handleModalSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (uploadedImageInfo) {
            router.push(`/halloween?id=${uploadedImageInfo.public_id}&gender=${gender}&monster=${monster}&changeBackground=${changeBackground}`)
        }
        setIsModalOpen(false)
    }

    return (
        <>
            <CldUploadWidget
                uploadPreset="upload-unsigned-images"
                options={{
                    sources: ['local', 'camera'],
                    multiple: false,
                    maxFiles: 1,
                    cropping: true, // add to avoid instant upload
                    defaultSource: "local",
                    styles: {
                        palette: {
                            window: "#0A0A0A",
                            windowBorder: "#6B6B6B",
                            tabIcon: "#EA580C",
                            menuIcons: "#EA580C",
                            textDark: "#0A0A0A",
                            textLight: "#EDEDED",
                            link: "#EA580C",
                            action: "#FF620C",
                            inactiveTabIcon: "#CED7E2",
                            error: "#F44235",
                            inProgress: "#0078FF",
                            complete: "#20B832",
                            sourceBg: "#0A0A0A"
                        },
                        frame: {
                            background: "#732c0775"
                        }
                    },
                    language: "es",
                    text: {
                        es: {
                            or: "O",
                            back: "Regresar",
                            advanced: "Avanzado",
                            close: "Cerrar",
                            no_results: "Sin resultados",
                            search_placeholder: "Buscar archivos",
                            about_uw: "Acerca de Upload Widget",
                            menu: {
                                files: "Mis archivos",
                                camera: "Cámara"
                            },
                            local: {
                                browse: "Selecciona",
                                dd_title_single: "Arrastra tu imagen aquí",
                            },
                            selection_counter: {
                                selected: "Seleccionado"
                            },
                            crop: {
                                title: "Cortar",
                                crop_btn: "Cortar",
                                skip_btn: "Omitir",
                                reset_btn: "Reiniciar",
                                close_btn: "Si",
                                close_prompt: "Al cerrar se cancelarán todas las cargas, ¿estás seguro?",
                                image_error: "Error al cargar imagen",
                                corner_tooltip: "Arrastra la esquina para ajustar tamaño",
                                handle_tooltip: "Arrastra el control para ajustar tamaño"
                            },
                            camera: {
                                capture: "Capturar",
                                cancel: "Cancelar",
                                take_pic: "Toma una foto para cargarla",
                                explanation: "Asegúrate que tu cámara esté conectada y que tu navegador permite capturas de pantalla. Cuando estés listo, da clic en Capturar.",
                                camera_error: "Error al acceder a la cámara",
                                retry: "Reintentar cámara",
                                file_name: "Cámara_{{time}}"
                            }
                        }
                    }
                }}
                onSuccess={(result) => {
                    const info = result?.info as ResourceInfo | undefined
                    if (info) {
                        setUploadedImageInfo(info)
                        setIsModalOpen(true)
                    }
                }}
                onQueuesEnd={() => {
                    
                }}
            >
                {({ open }) => {
                    return (
                        <>
                            <Button variant='primary' text="Subir una imagen" cb={() => handleClick(open)} icon={Skull} />
                        </>
                    );
                }}
            </CldUploadWidget>

            {isModalOpen && (
                <div className="fixed inset-0 bg-[#732c0775] flex items-center justify-center">
                    <div className="bg-background p-6 rounded-lg max-w-md w-full text-white z-10 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4 text-orange-500">Información adicional</h2>
                        <form onSubmit={handleModalSubmit}>
                            <div className="mb-4">
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">
                                    Género
                                </label>
                                <select
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full p-2 bg-[#242424] border border-gray-800 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent active:outline-none focus:outline-none"
                                    required
                                >
                                    <option value="" disabled>Selecciona el género de la persona para ayudar a la IA</option>
                                    <option value="male">Masculino</option>
                                    <option value="female">Femenino</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="monster" className="block text-sm font-medium text-gray-300 mb-1">
                                    Monster
                                </label>
                                <select
                                    id="monster"
                                    value={monster}
                                    onChange={(e) => setMonster(e.target.value)}
                                    className="w-full p-2 bg-[#242424] border border-gray-800 border-opacity-50 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent active:outline-none focus:outline-none"
                                    required
                                >

                                    <option value="" disabled>Selecciona el monstruo</option>
                                    {monsters.map(monster => (
                                        <option key={monster.id} value={monster.id}>{monster.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 flex items-center">
                                <input
                                    type="checkbox"
                                    id="background"
                                    checked={changeBackground === true}
                                    onChange={(e) => setChangeBackground(e.target.checked)}
                                    className="appearance-none relative peer h-4 w-4 rounded cursor-pointer bg-gray-700 border-gray-600 checked:bg-orange-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-800 focus:outline-none focus:ring-offset-0 focus:ring-2 disabled:border-steel-400 disabled:bg-steel-400"
                                />
                                <svg
                                    className="absolute w-4 h-4 mt-1 hidden peer-checked:block pointer-events-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <label htmlFor="background" className="ml-2 block text-sm font-medium text-gray-300">
                                    Cambiar fondo
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default CloudinaryWidget