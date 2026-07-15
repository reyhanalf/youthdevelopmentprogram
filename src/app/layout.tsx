import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Youth Development Program | Kenali Potensimu",
  description: "Temukan minat, bakat, dan peluang masa depan melalui materi pembelajaran yang interaktif dan assessment sederhana yang tervalidasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-poppins">{children}</body>
    </html>
  );
}
