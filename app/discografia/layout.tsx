import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Discografia | Briele - Portfolio musicale",
  description: "Scopri la discografia di Briele: tutti i brani, singoli e album che raccontano la sua evoluzione artistica e sonora.",
  keywords: ["Briele", "discografia", "musica", "portfolio musicale", "album", "singoli"],
  openGraph: {
    title: "Discografia | Briele - Portfolio musicale",
    description: "Scopri la discografia di Briele: tutti i brani, singoli e album che raccontano la sua evoluzione artistica e sonora.",
    url: "https://www.brielebriele.com/discografia",
    siteName: "Briele",
    images: [
      {
        url: "/covers/lenti.png",
        width: 1200,
        height: 630,
        alt: "Briele discografia copertina"
      }
    ],
    locale: "it_IT",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Discografia | Briele - Portfolio musicale",
    description: "Scopri la discografia di Briele: tutti i brani, singoli e album che raccontano la sua evoluzione artistica e sonora.",
    images: ["/covers/lenti.png"]
  }
};

export default function DiscografiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 