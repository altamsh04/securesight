import type { Metadata } from "next";
import Navbar, { CameraBar } from '../components/Navbar';
import Camera from '../components/Camera';
import "./globals.css";

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
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Navbar />
        <Camera />
      </body>
    </html>
  );
}
