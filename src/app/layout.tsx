import type { Metadata } from "next";
import "@/app/globals.css";
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
      <body>
        <TodoQueryProvider>{children}</TodoQueryProvider>
      </body>
    </html>
  );
}
