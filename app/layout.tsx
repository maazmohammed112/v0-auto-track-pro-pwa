import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://autotrackpro.com'),
  title: 'AutoTrackPro - Vehicle Expense & Mileage Tracker',
  description: 'Track vehicle maintenance, fuel costs, service schedules, and mileage. Manage multiple cars with smart km-based reminders and detailed expense insights.',
  keywords: 'vehicle tracker, car maintenance, fuel tracker, mileage tracker, service reminders, car expenses, vehicle management app',
  authors: [{ name: 'AutoTrackPro' }],
  creator: 'AutoTrackPro',
  publisher: 'AutoTrackPro',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AutoTrackPro',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autotrackpro.com',
    siteName: 'AutoTrackPro',
    title: 'AutoTrackPro - Vehicle Expense & Mileage Tracker',
    description: 'Track vehicle maintenance, fuel costs, service schedules, and mileage. Manage multiple cars with smart km-based reminders.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AutoTrackPro - Vehicle Management App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoTrackPro - Vehicle Expense & Mileage Tracker',
    description: 'Smart vehicle management with fuel tracking, mileage insights, and service reminders.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#F5F4F0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              borderRadius: '999px',
              background: 'oklch(0.22 0.01 260)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px 20px',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
