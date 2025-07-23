import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar, { CameraBar } from '../components/Navbar';
import Camera from '../components/Camera';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecureSight",
  description: "SecureSight is a CCTV monitoring software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <Camera />
      </body>
    </html>
  );
}
