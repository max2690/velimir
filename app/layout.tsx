import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELIMIR | Мастерская форм и смысла",
  description: "Мебель, арт-объекты, индивидуальные изделия из эпоксидной смолы и массива дерева. ЧПУ-обработка и инженерная точность.",
  openGraph: {
    title: "VELIMIR LUX | Архитектурная мебель и арт-объекты",
    description: "Тихая сила, материальность и цикл производства.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ymId = process.env.NEXT_PUBLIC_YM_ID;

  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <div className="grain-overlay" />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1C1F22",
              color: "#EAE7E0",
              borderRadius: "0",
              border: "1px solid #2C2F32",
            },
          }}
        />
        
        {/* Yandex Metrika */}
        {ymId && (
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${ymId}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
