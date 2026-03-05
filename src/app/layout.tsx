import type { Metadata } from "next";
import { QueryProvider } from "@/providers";
import { inter, josefinSans } from "./fonts";
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
      <body className={`${inter.variable} ${josefinSans.variable} font-primary`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
