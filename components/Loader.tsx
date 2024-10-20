import React, { useState, useEffect } from 'react';
import { Ghost } from 'lucide-react';

const Loader = () => {
    const [score, setScore] = useState(0);
    const [ghostPosition, setGhostPosition] = useState({ x: 50, y: 50 });
    const [isVisible, setIsVisible] = useState(true);
    const [speed, setSpeed] = useState(800);

    // Aumentar velocidad cada 5 puntos
    useEffect(() => {
        setSpeed(Math.max(800 - (Math.floor(score / 5) * 100), 300));
    }, [score]);

    // Movimiento del fantasma
    useEffect(() => {
        if (isVisible) {
            const moveInterval = setInterval(() => {
                const newX = Math.random() * 80 + 10;
                const newY = Math.random() * 80 + 10;

                // Animación
                setGhostPosition(prev => ({
                    x: newX,
                    y: newY
                }));
            }, speed);

            return () => clearInterval(moveInterval);
        }
    }, [isVisible, speed]);

    const handleGhostClick = () => {
        setScore(prev => prev + 1);
        setIsVisible(false);
        setTimeout(() => setIsVisible(true), 100);
    };

    return (
        <div>
            <p className='text-center mb-5 text-md md:text-xl text-gray-300'>Mientras cargamos tu imagen, diviértete un poco</p>
            <div className="relative backdrop-blur-md w-80 h-80 md:w-96 md:h-96 rounded-lg p-6 shadow-xl border-2 border-orange-400">
                <div className="absolute top-4 left-4 text-orange-400 flex items-center gap-2">
                    <span className="text-md md:text-xl font-bold">Puntos: {score}</span>
                </div>

                {isVisible && (
                    <button
                        onClick={handleGhostClick}
                        className="absolute transition-all duration-200 hover:scale-110"
                        style={{
                            left: `${ghostPosition.x}%`,
                            top: `${ghostPosition.y}%`,
                            transform: 'translate(-50%, -50%)',
                            animation: '0.5s ease-out',
                            transition: `all ${speed / 1000}s ease-out`
                        }}
                    >
                        <Ghost className=":w-10 h-10 text-white hover:text-orange-600" />
                    </button>
                )}
                <div className="absolute top-4 right-4">
                    <p className="text-xs md:text-sm text-orange-400">¡Atrapa los fantasmas! Velocidad: {Math.round((800 - speed) / 100 + 1)}x</p>
                </div>
            </div>
        </div>
    );
};

export default Loader;