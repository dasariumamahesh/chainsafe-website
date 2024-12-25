// src/app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import Providers from '@/components/Providers';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Chainsafe",
  description: "Add optional chaining",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background transition-colors duration-300`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}