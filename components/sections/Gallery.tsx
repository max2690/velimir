"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section, Title } from "@/components/ui";
import Image from "next/image";
import { useParallax } from "@/lib/hooks/useParallax";

const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/img/gallery/g${(i + 1).toString().padStart(2, '0')}.jpg`,
  alt: `Velimir Work ${i + 1}`,
}));

const GalleryItem = ({ img, index }: { img: typeof galleryImages[0]; index: number }) => {
  // Разные скорости параллакса для создания глубины
  const parallaxSpeed = (index % 3 === 0 ? 0.05 : index % 3 === 1 ? 0.08 : 0.12) * (index % 2 === 0 ? 1 : -1);
  const offset = useParallax(parallaxSpeed);

  return (
    <motion.div
      key={img.id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.1 }}
      className="relative aspect-square overflow-hidden bg-separator/10"
    >
      <div
        style={{ transform: `translateY(${offset}px)` }}
        className="absolute inset-0 transition-transform duration-300 ease-out"
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-1000"
        />
      </div>
    </motion.div>
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
