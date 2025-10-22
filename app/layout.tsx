import type React from "react"
import type { Metadata } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rigeo.com'),
  title: {
    default: "Rigeo - Builder Community Platform | Connect, Create, and Compete",
    template: "%s | Rigeo"
  },
  description: "Join the global builder community on Rigeo. Showcase your projects, connect with developers, climb the leaderboard, and get discovered by the world's top tech companies.",
  keywords: [
    "developer community",
    "indie developers",
    "indie makers",
    "builder platform",
    "developer leaderboard",
    "tech portfolio",
    "project showcase",
    "developer networking",
    "g4",
    "datafast",
    "indiedevs.me",
    "indie hackers",
    "product hunt",
    "developer profiles",
    "coding community"
  ],
  authors: [{ name: "Rigeo" }],
  creator: "Rigeo",
  publisher: "Rigeo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Rigeo - Builder Community Platform",
    description: "Connect with builders, showcase your projects, and climb the global leaderboard",
    url: "https://rigeo.com",
    siteName: "Rigeo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 1200,
        height: 630,
        alt: "Rigeo - Builder Community Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rigeo - Builder Community Platform",
    description: "Connect with builders, showcase your projects, and climb the global leaderboard",
    images: ["/placeholder-logo.png"],
    creator: "@rigeo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
  alternates: {
    canonical: "https://rigeo.com",
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rigeo",
    "description": "Global builder community platform for developers and creators",
    "url": "https://rigeo.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://rigeo.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "author": {
      "@type": "Organization",
      "name": "Rigeo"
    }
  }

  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400&display=swap" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.min.js"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
