import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  museum?: boolean;
}

export const Section = ({ children, className, id, museum = true }: SectionProps) => {
  return (
    <section 
      id={id} 
      className={cn(
        "relative z-10",
        museum && "museum-padding",
        className
      )}
    >
      <div className="section-container">
        {children}
      </div>
    </section>
  );
};

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  subtitle?: string;
}

export const Title = ({ children, className, as: Tag = "h2", subtitle }: TitleProps) => {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <Tag className={cn(
        "text-foreground",
        Tag === "h1" && "text-5xl md:text-7xl lg:text-8xl mb-6",
        Tag === "h2" && "text-3xl md:text-5xl lg:text-6xl mb-4",
        Tag === "h3" && "text-xl md:text-2xl lg:text-3xl mb-3",
      )}>
        {children}
      </Tag>
      {subtitle && (
        <p className="text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button = ({ children, className, variant = "primary", ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-8 py-4 text-sm uppercase tracking-[0.2em] transition-all duration-300",
        variant === "primary" && "bg-foreground text-background hover:bg-secondary",
        variant === "secondary" && "bg-separator text-foreground hover:bg-white/10",
        variant === "outline" && "border border-separator text-foreground hover:border-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
