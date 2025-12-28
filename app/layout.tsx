import type { Metadata } from 'next';
import { Inter, Noto_Sans_Oriya } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const notoOriya = Noto_Sans_Oriya({ weight: ['400', '500', '600'], subsets: ['oriya', 'latin'] });

export const metadata: Metadata = {
  title: 'Postroket',
  description: 'Multilingual finance tools, jobs, and document generators for India.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${notoOriya.className}`}>
      <body>{children}</body>
    </html>
  );
}
