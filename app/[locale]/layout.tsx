import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "../../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { PropsWithChildren } from "react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Briele | Official Website",
  description: "Briele's official artist website. Listen to the new music.",
  manifest: "/manifest.json", // PWA manifest
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: "#0f1c47",
};

type RootLayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

export default async function RootLayout({
  children,
  params: {locale}
}: RootLayoutProps) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/videos/islanda.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem={false}
            disableTransitionOnChange
            forcedTheme="dark"
          >
            <Header />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
