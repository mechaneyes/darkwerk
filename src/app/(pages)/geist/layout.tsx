import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "darkwerk",
  description: "Ain't Nothin' Goin' on but the Ghosts",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👻</text></svg>",
        type: "image/svg+xml",
      }
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👻</text></svg>",
        type: "image/svg+xml",
      }
    ],
  },
  openGraph: {
    title: "darkwerk",
    description: "Ain't Nothin' Goin' on but the Ghosts",
    url: "https://darkwerk.com",
    siteName: "darkwerk",
    images: [
      {
        url: "https://darkwerk.com/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "darkwerk",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
