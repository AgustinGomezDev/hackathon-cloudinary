import type { Metadata } from "next";
import { afacad } from "./fonts";
import { metalMania } from './fonts';
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ecos de Halloween",
  description: "¡Ven y transforma a un famoso o a ti mismo en un monstruo!",
  
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${afacad.className} antialiased`}
      >
        <h1 className={`text-5xl md:text-8xl lg:text-9xl ${metalMania.className} text-center py-10 px-5`}>Ecos de Halloween</h1>
        <div className="absolute top-0 z-[-2] min-h-screen w-screen bg-transparent bg-[radial-gradient(#ea580c33_1px,#81340c10_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#ea580c80_100%)]"></div>
        <div className="h-full flex flex-col justify-between">
        {children}
        <Footer />
        </div>
      </body>
    </html>
  );
}
