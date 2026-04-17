import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "받은메일함",
  description: "게시판 검색 UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
