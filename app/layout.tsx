import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GREENPACK — AI-Powered Waste Intelligence Platform',
  description:
    'GREENPACK is an AI-powered trust and intelligence infrastructure for India\'s informal recycling ecosystem. Connecting waste pickers, kabadiwalas, and recycling industries.',
  keywords: 'waste management, recycling, AI, India, kabadiwala, sustainability, circular economy',
  authors: [{ name: 'GREENPACK Team' }],
  openGraph: {
    title: 'GREENPACK — Waste Intelligence Platform',
    description: 'AI-powered waste intelligence infrastructure for India\'s informal recycling ecosystem.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0D1208" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) { console.log('SW registered: ', registration.scope); },
                    function(err) { console.log('SW registration failed: ', err); }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
