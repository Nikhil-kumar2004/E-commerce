import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

// Slides with image + caption
const slides = [
  {
    title: 'Bright Side Vibes',
    subtitle: 'Vibrant layers to match your bold spirit.',
    image: assets.hero,
  },
  {
    title: 'Effortless Elegance',
    subtitle: 'Discover timeless fashion for every mood.',
    image: assets.hero_1,
  },
  {
    title: 'Bold Street Charm',
    subtitle: 'Where comfort meets bold colors.',
    image: assets.hero_2,
  },
  {
    title: 'Sunny Side Style',
    subtitle: 'Light, playful, and ready to twirl.',
    image: assets.hero_3,
  },
  {
    title: 'Retro Pop Vibes',
    subtitle: 'A perfect throwback with a modern twist.',
    image: assets.hero_4,
  },
  {
    title: 'Midnight Muse',
    subtitle: 'Edgy, bold, and made to impress.',
    image: assets.hero_5,
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // 3 seconds auto scroll

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 h-[500px] overflow-hidden">
      {/* Left: Captions */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-6 bg-white text-[#414141]">
        <div className="text-center sm:text-left max-w-md space-y-4">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="w-8 md:w-10 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-lg">TRENDING STYLES</p>
          </div>
          <h1
            style={{ fontFamily: 'serif' }}
            className="text-3xl sm:py-3 lg:text-5xl leading-relaxed transition-all duration-1000"
          >
            {slides[activeIndex]?.title}
          </h1>
          <p className="text-sm md:text-base text-gray-600 transition-opacity duration-1000">
            {slides[activeIndex]?.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Image carousel- scrollTo vs tranlateX */}
      <div className="w-full sm:w-1/2 h-[500px] overflow-hidden relative flex items-center justify-center bg-white">
        <div
          className="flex transition-transform duration-[2000ms] ease-in-out will-change-transform h-full"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            width: `${slides.length * 100}%`,
          }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.title}
              loading="lazy"
              className="w-full h-[500px] object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
