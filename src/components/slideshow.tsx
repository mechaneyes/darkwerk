"use client";

import React, { useState, useEffect } from "react";

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    if (images.length === 0) return;

    const transitionTimer = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );

        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 1000);
    }, 8000);

    return () => clearInterval(transitionTimer);
  }, [images]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {images.length > 0 && (
        <img
          src={`/${images[currentImageIndex]}`}
          alt={`Slide ${currentImageIndex + 1}`}
          className={`absolute inset-0 w-[97%] h-[93%] m-auto object-contain transition-opacity duration-1000 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </div>
  );
};

export default Slideshow;
