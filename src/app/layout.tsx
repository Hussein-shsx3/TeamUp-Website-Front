import type { Metadata } from "next";
import { QueryProvider } from "@/providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "TeamUp",
  description: "TeamUp - Graduate Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
