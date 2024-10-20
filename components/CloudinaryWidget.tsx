'use client'

import { CldUploadWidget } from 'next-cloudinary';
import { Skull } from 'lucide-react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation'

interface ResourceInfo {
    public_id: string;
    secure_url: string;
}

const CloudinaryWidget = () => {
    const router = useRouter()

    const handleClick = (open: () => void) => {
        open();
    };

    return (
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
                        actions: {
                            upload: "Subir",
                            clear_all: "Limpiar todo",
                            log_out: "Cerrar"
                        },
                        notifications: {
                            general_error: "Ocurrió un error.",
                            general_prompt: "¿Estás seguro?",
                            limit_reached: "No puedes seleccionar más archivos.",
                            invalid_add_url: "La URL debe ser válida.",
                            invalid_public_id: "El ID público no puede contener \\,?,&,#,%,<,>.",
                            no_new_files: "Los archivos ya han sido cargados.",
                            image_purchased: "Imagen comprada",
                            video_purchased: "Video comprado",
                            purchase_failed: "Compra fallida. Por favor reintenta.",
                            service_logged_out: "Servicio cerrado debido a un error",
                            great: "Genial"
                        },
                        queue: {
                            title: "Fila de carga",
                            title_uploading_with_counter: "Cargando {{num}} elementos",
                            title_uploading: "Cargando elementos",
                            mini_title: "Cargados",
                            mini_title_uploading: "Cargado",
                            show_completed: "Mostrar completado",
                            retry_failed: "Reintento fallido",
                            abort_all: "Cancelar todos",
                            upload_more: "Cargar mas",
                            done: "Listo",
                            mini_upload_count: "{{num}} cargados",
                            mini_failed: "{{num}} fallidos",
                            statuses: {
                                uploading: "Cargando…",
                                error: "Error",
                                uploaded: "Listo",
                                aborted: "Cancelado"
                            }
                        },
                        uploader: {
                            filesize: {
                                na: "N/A",
                                b: "{{size}} Bytes",
                                k: "{{size}} KB",
                                m: "{{size}} MB",
                                g: "{{size}} GB",
                                t: "{{size}} TB"
                            },
                            errors: {
                                file_too_large: "El tamaño del archivo ({{size}}) excede el máximo permitido ({{allowed}})",
                                max_dimensions_validation: "Las dimensiones de la imagen ({{width}}X{{height}}) son mayores del máximo permitido: ({{maxWidth}}X{{maxHeight}})",
                                min_dimensions_validation: "Las dimensiones de la imagen ({{width}}X{{height}}) son menores del mínimo permitido: ({{minWidth}}X{{minHeight}})",
                                unavailable: "NA",
                                max_number_of_files: "Número de archivos excedido",
                                allowed_formats: "Formato de archivo no permitido",
                                max_file_size: "El archivo es demasiado grande",
                                min_file_size: "El archivo es muy pequeño"
                            },
                            close_mid_upload: "Hay cargas en proceso. Da clic en OK para cancelarlas."
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
                        },
                        metadataPage: {
                            title: "Valores estructurados de metadata",
                            subtitle: "1 archivo seleccionado",
                            subtitle_plural: "{{count}} archivos seleccionados",
                            tooltip: "Algunos campos de metadata requeridos están vacíos o los valores proporcionados son incorrectos.",
                            upload: "Cargar",
                            conflict_label: "Sobrescribir",
                            intro: {
                                openingText: "Puedes llenar los siguientes campos para agregar nueva metadata a tus archivos a ser cargados.",
                                conflictWarning: "Nota: Selecciona ‘Sobrescribir’ para los campos donde deseas aplicar los nuevos valores para archivos nuevos o a reemplazar.",
                                closingText: "Después de cargar, puedes modificar la metadata para archivos individuales desde la librería de medios."
                            },
                            closePrompt: "¿Estás seguro de querer cerrar esta caja de diálogo? Tus archivos no serán cargados.",
                            backPrompt: "¿Estás seguro? Tu selección de archivos y su metadata asociada se perderá.",
                            approveCancel: "Si",
                            cancel: "Cancelar",
                            validationErrors: {
                                string: {
                                    min: "Deben ser al menos {{min}} caracteres.",
                                    max: "No pueden ser más de {{max}} caracteres.",
                                    minAndMax: "La longitud debe ser entre {{min}}-{{max}} caracteres.",
                                    regex: "Debe incluir solamente XXXX."
                                },
                                integer: {
                                    lessThan: "Debe ser menos de {{less}}.",
                                    lessThanEqual: "No pueden ser más de {{max}}.",
                                    greaterThan: "Deben ser más de {{more}}.",
                                    greaterThanEqual: "Al menos deben ser {{min}}."
                                },
                                number: {
                                    lessThan: "Deben ser menos de {{less}}.",
                                    lessThanEqual: "No pueden ser más de {{max}}.",
                                    greaterThan: "Deben ser más de {{more}}.",
                                    greaterThanEqual: "Deben ser al menos {{min}}."
                                },
                                enum: {
                                    oneOf: "{{originalValue}} debe ser una de las opciones indicadas previamente."
                                },
                                set: {
                                    oneOf: "{{originalValue}} debe ser una de las opciones indicadas previamente."
                                },
                                date: {
                                    lessThan: "Debe ser antes de {{max}}.",
                                    lessThanEqual: "No puede ser después de {{max}}.",
                                    greaterThan: "Debe ser después de {{min}}.",
                                    greaterThanEqual: "No puede ser antes de {{min}}."
                                },
                                stringError: "Debe ser texto.",
                                numberError: "Debe ser un número.",
                                integerError: "Debe ser un número.",
                                dateError: "Debe ser una fecha.",
                                enumError: "Elige una de las opciones indicadas.",
                                setError: "Elige al menos una de las opciones indicadas.",
                                required: "Este campo es requerido.",
                                integerTypeError: "Este es un campo para valores enteros.",
                                digitsLimitError: "Este número no puede contener más de 16 dígitos.",
                                unsupportedFields: "Por favor contacta a tu administrador, hay un problema con los siguientes campos de metadata: ",
                                unsupportedRequiredFields: "Por favor contacta a tu administrador, hay un problema con los siguientes campos de metadata obligatorios: "
                            }
                        }
                    }
                }
            }}
            onSuccess={(result, { widget }) => {
                const info = result?.info as ResourceInfo | undefined
                if (info) {
                    router.push(`/halloween?id=${info.public_id}`)
                }
            }}
            onQueuesEnd={(result, { widget }) => {
                widget.close();
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
    )
}

export default CloudinaryWidget