import type { Metadata } from 'next';
import { Fraunces, Instrument_Sans, IBM_Plex_Mono, Caveat } from 'next/font/google';
import './globals.css';

const serif = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-serif',
});

const sans = Instrument_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
});

const script = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: {
    default: 'Cherry Phan — Product & UX Designer',
    template: '%s — Cherry Phan',
  },
  description:
    'Design with empathy. Cherry Phan is a product & UX designer at SCAD who designs for slowness — memory, ritual, and the small moments we usually rush past.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
