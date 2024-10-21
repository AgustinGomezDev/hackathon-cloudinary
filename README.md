# Hackathon Cloudinary x Midudev

Proyecto desarrollado para la [Cloudinary CloudCreate Spooky AI Hackathon](https://cloudinary.com/blog/cloudinary-cloudcreate-spooky-ai-hackathon) organizada por [midudev](https://github.com/midudev).

![Hackathon Cloudinary Banner](https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_859/f_auto,q_auto/v1728314770/Web_Assets/blog/hackathon-banner/hackathon-banner-jpg?_i=AA)

## Características
- Transoforma el fondo de tú imagen en un escenario espeluznante.
- Transoforma a un famoso o a ti en un escalofriante monstruo.
- Descarga tu transformación fácilmente.
- Compara tu imagen original con la modificada de forma sencilla.
- ¿Mucho tiempo esperando tu transformación? Ve y caza cuántos fantasmas puedas con el loader interactivo.
- Interfaz intuitiva y responsiva.

## Tecnologías
- Cloudinary
- Typescript
- Nextjs
- TailwindCSS

## Funcionamiento
1. Sube una imagen o tómate una foto con la cámara.
2. Agrega información adicional para mejorar el prompt.
   1. Elegir género de la persona.
   2. Elegir monstruo para transformarse.
   3. Posibilidad de cambiar el fondo de la imagen.
3. Espera o juega en nuestro loader hasta que se genere tu imagen.
4. Compara tu imagen original con la modificada, también puedes descargarla!

## Capturas de pantalla
![Página principal](https://i.ibb.co/9VRb9BY/image.png)
![Cloudinary upload widget](https://i.ibb.co/c6BmrKL/image.png)
![Información adicional](https://i.ibb.co/1LWc6fW/image.png)
![Loading](https://i.ibb.co/JsRGCXd/image.png)
![Comparación imagenes](https://i.ibb.co/xS6xD41/image.png)

## Instalación

```bash
git clone https://github.com/AgustinGomezDev/hackathon-cloudinary.git
cd hackathon-cloudinary
npm i
npm run dev
```

Crea un archivo .env con el siguiente contenido

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<TU CLOUD NAME>
```
