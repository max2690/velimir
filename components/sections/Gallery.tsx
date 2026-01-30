"use client";

import React, { useState } from "react";
import { Section, Title } from "@/components/ui";
import Image from "next/image";
import { useParallax } from "@/lib/hooks/useParallax";

const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/img/gallery/g${(i + 1).toString().padStart(2, '0')}.jpg`,
  alt: `Velimir Work ${i + 1}`,
}));

const GalleryItem = ({ img, index }: { img: typeof galleryImages[0]; index: number }) => {
  const [imageError, setImageError] = useState(false);
  const parallaxSpeed = (index % 3 === 0 ? 0.05 : index % 3 === 1 ? 0.08 : 0.12) * (index % 2 === 0 ? 1 : -1);
  const offset = useParallax(parallaxSpeed);

  return (
    <div
      key={img.id}
      className="relative w-full overflow-hidden bg-separator/10"
    >
      {/* Spacer: высота = 100% от ширины → квадрат */}
      <div className="w-full pb-[100%]" aria-hidden />
      {/* Контент поверх spacer */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {!imageError ? (
          <div className="relative w-full h-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-1000"
              onError={() => setImageError(true)}
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-separator/20 text-secondary text-xs uppercase tracking-widest">
            Скоро
          </div>
        )}
      </div>
    </div>
  );
};

export const Gallery = () => {
  return (
    <Section id="gallery">
      <Title subtitle="Визуальный ряд материалов, текстур и готовых объектов.">
        Галерея
      </Title>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {galleryImages.map((img, index) => (
          <GalleryItem key={img.id} img={img} index={index} />
        ))}
      </div>
    </Section>
  );
};
