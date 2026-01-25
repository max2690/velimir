import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Section, Title, Button } from "@/components/ui";
import { CTAForm } from "@/components/sections/CTAForm";
import Script from "next/script";

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOPageProps {
  h1: string;
  sections: {
    title: string;
    content: string;
  }[];
  faqs: FAQItem[];
}

export const SEOPageTemplate = ({ h1, sections, faqs }: SEOPageProps) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <Section className="pt-48 pb-24 border-b border-separator">
        <Title as="h1">{h1}</Title>
      </Section>

      {sections.map((section, idx) => (
        <Section key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-separator/5"}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <h2 className="text-2xl font-display uppercase tracking-widest">{section.title}</h2>
            <div className="lg:col-span-2 text-secondary text-lg leading-relaxed space-y-6">
              {section.content.split('\n').map((para, pIdx) => (
                para && <p key={pIdx}>{para}</p>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section id="faq" className="bg-background">
        <Title>Часто задаваемые вопросы</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {faqs.map((faq, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-lg uppercase tracking-widest text-foreground">{faq.question}</h3>
              <p className="text-secondary leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTAForm />
      
      <Footer />
      <FloatingContact />

      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
    </main>
  );
};
