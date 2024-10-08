import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Applicant Management | Two Tabs",
  icons: [
    {
      rel: "icon",
      url: "/favicon.png",
    },
  ],
};

const figtree = Figtree({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
      </head>
      <body
        className={`${figtree.className} antialiased bg-background text-foreground`}
      >
        <NextTopLoader showSpinner={false} />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
