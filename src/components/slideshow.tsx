"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [images, setImages] = useState([]);
  const [isNextImageLoaded, setIsNextImageLoaded] = useState(true);

  // Load from directory
  useEffect(() => {
    const loadImages = async () => {
      try {
        const files = await fetch("/api/images").then((res) => res.json());
        setImages(files.map((file: string) => `images/${file}`));
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  // Helper function to preload an image
  const preloadImage = (src: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve();
      img.src = src;
    });
  };

  useEffect(() => {
    if (images.length === 0) return;

    const transitionTimer = setInterval(async () => {
      // Calculate next image index
      const nextIndex =
        currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;

      // Preload next image
      setIsNextImageLoaded(false);
      await preloadImage(`/${images[nextIndex]}`);
      setIsNextImageLoaded(true);

      // Start transition only after image is loaded
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex(nextIndex);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 1000);
    }, 8000);

    return () => clearInterval(transitionTimer);
  }, [images, currentImageIndex]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black overflow-hidden">
      {images.length > 0 && (
        <Image
          src={`/${images[currentImageIndex]}`}
          alt={`Slide ${currentImageIndex + 1}`}
          fill
          className={`absolute inset-0 max-w-[95%] max-h-[90%] m-auto object-contain transition-opacity duration-1000 ${
            isTransitioning || !isNextImageLoaded ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
      )}
      <div className="absolute flex justify-between items-center w-full absolute bottom-2 px-3 font-geist-mono text-xs text-gray-300 text-center">
        <div className="">
          <a
            href="mailto:ghost@darkwerk.com"
            className="transition-opacity duration-300 ease-in-out hover:opacity-75"
          >
            ghost@darkwerk.com
          </a>{" "}
          <span className="text-gray-400">||</span> {"signal: "}
          <a
            href="https://signal.me/#u/geist.404"
            className="transition-opacity duration-300 ease-in-out hover:opacity-75"
          >
            geist.404
          </a>
        </div>
        <a
          href="https://nysee.nyc"
          className="transition-opacity duration-300 ease-in-out hover:opacity-75"
        >
          nysee.nyc
        </a>
      </div>
    </div>
  );
};

export default Slideshow;
