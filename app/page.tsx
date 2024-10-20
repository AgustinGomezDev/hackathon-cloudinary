import CloudinaryWidget from '@/components/CloudinaryWidget'
export default function Home() {


  return (
    <div className='h-[30rem] lg:h-[40rem] flex gap-10 flex-col justify-center items-center'>
      <p className="text-xl lg:text-4xl text-balance text-center md:max-w-xl lg:max-w-6xl">¡Sube la <span className='text-orange-400'>foto</span> de un <span className='text-orange-400'>famoso</span> o incluso la <span className='text-orange-400'>tuya</span> y prepárate para ver la <span className='text-orange-400'>transformación</span> en un auténtico <span className='text-orange-400'>monstruo</span>!</p>
      <CloudinaryWidget />
      <p className="text-xs lg:text-sm text-balance opacity-50 text-center max-w-xs md:max-w-lg">Para que el resultado sea óptimo, asegúrate de subir una imagen clara y de buena calidad, donde se le/te reconozca bien. ¡Así tu transformación será aún más sorprendente! (en ciertos casos aunque la imagen sea la correcta la IA puede fallar en su modificación)</p>
    </div>
  );
}
