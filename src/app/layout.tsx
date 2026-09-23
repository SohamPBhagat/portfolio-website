import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Soham | B.Sc. Data Science (SPPU) & AI Systems Developer',
  description: 'Portfolio of Soham — 2nd-year undergraduate in Data Science at Savitribai Phule Pune University (SPPU) Department of Technology building multi-agent systems and software.',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Figtree:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-amber-400/30 selection:text-amber-300">
        {children}
      </body>
    </html>
  );
}
