import type { Metadata } from "next";
import "./globals.css";
import TodoQueryProvider from "./todoQueryProvider";

export const metadata: Metadata = {
  title: "baro-intern",
  description: "baro-intern crud description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <TodoQueryProvider>
        <body>{children}</body>
      </TodoQueryProvider>
    </html>
  );
}
