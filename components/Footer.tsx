import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <>
            <p className="text-sm opacity-75 text-center text-balance mt-5">Hecho con 🧡 por <Link className='text-orange-400 underline hover:text-orange-600' href="https://github.com/AgustinGomezDev" target='_blank'>Agustín Gómez</Link></p>
        </>
    )
}

export default Footer