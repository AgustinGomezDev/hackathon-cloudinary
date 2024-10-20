'use client'

import React, { FC } from 'react'

interface ButtonProps {
    icon?: React.ComponentType;
    text: string;
    cb?: () => void;
    variant: 'primary' | 'outline';
  }

const Button: FC<ButtonProps> = ({ icon: Icon, text, cb, variant  }) => {
    const handleClick = cb || (() => {});

    const buttonClassNames = variant === 'primary'
    ? "bg-orange-600 hover:bg-orange-700 text-white"
    : "bg-transparent border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white";
        
    return (
        <button className={`group relative inline-flex gap-2 items-center justify-center px-6 py-3 overflow-hidden font-bold rounded-md shadow-2xl transition-all duration-300 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${buttonClassNames}`} onClick={handleClick}>
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            {Icon && <Icon />}
            <span>{text}</span>
        </button>
    )
}

export default Button