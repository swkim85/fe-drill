import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainNav from "./components/main-nav";
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
  title: "회사 소개 사이트 예제",
  description: "layout과 메뉴를 이용한 콘텐츠 표시 예제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-100 text-slate-900 flex flex-col">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
            <h1 className="text-lg font-semibold tracking-tight">Demo Company</h1>
            <MainNav />
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
