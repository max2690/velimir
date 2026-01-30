"use client";

import React, { useState } from "react";
import { Section, Title } from "@/components/ui";

const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/img/gallery/g${(i + 1).toString().padStart(2, "0")}.jpg`,
  alt: `Velimir Work ${i + 1}`,
}));

const GalleryItem = ({ img }: { img: typeof galleryImages[0] }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-separator/10">
      <div className="w-full pb-[100%]" aria-hidden />
      <div className="absolute inset-0 overflow-hidden">
        {!imageError ? (
          <img
            src={img.src}
            alt={img.alt}
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-1000"
            onError={() => setImageError(true)}
          />
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
        {galleryImages.map((img) => (
          <GalleryItem key={img.id} img={img} />
        ))}
      </div>
    </Section>
  );
};
