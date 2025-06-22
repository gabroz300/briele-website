import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/videos/islanda.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
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
      </body>
    </html>
  );
}
