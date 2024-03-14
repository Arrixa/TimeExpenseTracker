import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from "@/app/components/ui/toaster"
import "react-toastify/dist/ReactToastify.css";
import { cn } from "../utils/utils"

export const metadata: Metadata = {
  title: 'FlairNow',
  description: 'Talent management system',
  icons: {
    icon: [
      {
        url: '/favicons/favicon.ico',
        href: '/favicons/favicon.ico',
      },
    ],
  },
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

  return (
    <html lang="en">  
      <body  className={cn(
          "h-screen w-screen bg-background font-sans antialiased box-border",
          fontSans.variable
        )}
        >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}


