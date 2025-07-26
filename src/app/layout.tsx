import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
