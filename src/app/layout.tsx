import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HireAI - Your Smart Hiring Assistant',
  description: 'AI-powered hiring assistant built in 6 hours during the 100x Hackathon. Try it out!',
  openGraph: {
    title: 'HireAI - Smart Hiring in Minutes',
    description: 'Built at the 100x Hackathon in just 6 hours. An AI assistant to speed up your hiring process.',
    images: [
      {
        url: 'https://yourdomain.com/preview-image.png',
        width: 1200,
        height: 630,
        alt: 'HireAI Preview',
      },
    ],
    url: 'https://main.d3r5nh3ds41tf9.amplifyapp.com/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireAI - Smart Hiring in Minutes',
    description: 'Built at the 100x Hackathon in just 6 hours. An AI assistant to speed up your hiring process.',
    images: ['https://yourdomain.com/preview-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
} 