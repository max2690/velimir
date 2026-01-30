"use client";

import React, { useState, useEffect, useRef } from "react";
import { Section, Title } from "@/components/ui";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { trackProductInteraction } from "@/lib/metrika";

const products = [
  {
    id: "art-objects",
    title: "Арт-объекты и игровые наборы",
    description: "Шахматы, нарды и покерные наборы из эпоксидной смолы и дерева. Индивидуальные формы и акцент на деталях.",
    images: [
      "/img/products/art-1.jpg",
      "/img/products/art-2.jpg",
      "/img/products/art-3.jpg",
    ],
  },
  {
    id: "epoxy-tables",
    title: "Столы из эпоксидной смолы",
    description: "Обеденные и переговорные столы из массива и смолы. Проектируются под интерьер и характер пространства.",
    images: [
      "/img/products/epoxy-tables-1.jpg",
      "/img/products/epoxy-tables-2.jpg",
      "/img/products/epoxy-tables-3.jpg",
    ],
  },
  {
    id: "custom-furniture",
    title: "Мебель на заказ",
    description: "Изготовление по эскизам заказчика. Нестандартные формы, сложная геометрия и точное соответствие проекту.",
    images: [
      "/img/products/custom-furniture-1.jpg",
      "/img/products/custom-furniture-2.jpg",
      "/img/products/custom-furniture-3.jpg",
    ],
  },
  {
    id: "cnc-services",
    title: "ЧПУ и инженерная точность",
    description: "Собственное ЧПУ-производство позволяет реализовывать сложнейшие формы с безупречной точностью.",
    images: [
      "/img/products/cnc-1.jpg",
      "/img/products/cnc-2.jpg",
      "/img/products/cnc-3.jpg",
    ],
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Отслеживание появления карточки в viewport
  useEffect(() => {
    if (hasTrackedView || !cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView) {
            setHasTrackedView(true);
            trackProductInteraction(product.id, "view");
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [product.id, hasTrackedView]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % product.images.length);
    trackProductInteraction(product.id, "click");
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    trackProductInteraction(product.id, "click");
  };

  const handleMouseEnter = () => {
    trackProductInteraction(product.id, "hover");
  };

  return (
    <div 
      ref={cardRef}
      className="group"
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-separator/10 mb-8">
        <div key={currentImage} className="absolute inset-0">
          <Image
            src={product.images[currentImage]}
            alt={product.title}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            unoptimized
          />
        </div>
        
        {/* Navigation Overlays */}
        <div className="absolute inset-x-0 bottom-0 flex justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={prevImage}
            className="w-10 h-10 bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center space-x-2">
            {product.images.map((_, i) => (
              <div 
                key={i} 
                className={`w-1 h-1 rounded-full transition-all ${i === currentImage ? 'bg-white w-4' : 'bg-white/30'}`} 
              />
            ))}
          </div>
          <button 
            onClick={nextImage}
            className="w-10 h-10 bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <h3 className="text-xl font-display mb-4 uppercase tracking-wider">{product.title}</h3>
      <p className="text-secondary text-sm leading-relaxed mb-6">{product.description}</p>
      
      <div className="w-12 h-px bg-separator group-hover:w-full transition-all duration-700" />
    </div>
  );
};

export const Products = () => {
  return (
    <Section id="products">
      <Title subtitle="Ключевые направления нашей деятельности и возможности производства.">
        Направления
      </Title>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
};
