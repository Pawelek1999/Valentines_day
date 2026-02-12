import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesSize, setYesSize] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);

  const moveNo = () => {
    // Skalujemy odległość i zakres ruchu w zależności od wielkości przycisku TAK
    const scaleMultiplier = 1 + (yesSize - 1) * 0.5; 
    const minDistance = 150 * scaleMultiplier;
    
    // Obliczamy granice ekranu (zakładamy margines na wielkość przycisku)
    const maxX = window.innerWidth / 2 - 100; 
    const maxY = window.innerHeight / 2 - 50;

    let validPosition = false;
    let x, y;
    let attempts = 0;

    while (!validPosition && attempts < 50) {
      x = (Math.random() * 2 - 1) * maxX;
      y = (Math.random() * 2 - 1) * maxY;

      // Sprawdzenie odległości od przycisku TAK
      const distance = Math.sqrt(x * x + y * y);
      if (distance >= minDistance) {
        validPosition = true;
      }
      attempts++;
    }

    setNoButtonPos({ x, y });
    setYesSize(prev => prev + 0.3);
  };

  if (isAccepted) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-pink-100 p-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <h1 className="text-5xl font-bold text-rose-600 mb-4">Jeeej! ❤️🌹</h1>
          <p className="text-2xl text-rose-500 font-medium animate-pulse">Wiedziałem! Do zobaczenia! 😘</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-rose-50 overflow-hidden relative p-6">
      <h1 className="text-4xl md:text-6xl font-extrabold text-rose-600 mb-16 text-center drop-shadow-sm">
        Czy zostaniesz moją Walentynką? ❤️
      </h1>
      
      <div className="flex flex-row items-center justify-center gap-8 relative h-40 w-full">
        <button
          onClick={() => setIsAccepted(true)}
          style={{ transform: `scale(${yesSize})` }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-200 z-50 cursor-pointer"
        >
          TAK
        </button>

        <motion.button
          animate={{ x: noButtonPos.x, y: noButtonPos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={moveNo}
          onClick={moveNo}
          className="bg-red-500 text-white font-bold py-4 px-10 rounded-full shadow-xl cursor-pointer touch-none"
        >
          NIE
        </motion.button>
      </div>
    </div>
  );
}