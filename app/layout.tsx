import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Draw2Dev",
  description:
    "AI-powered tool to instantly convert your design wireframes into clean, production-ready code. Save hours of development time.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://draw-2-dev.vercel.app"),
  openGraph: {
    title: "Draw2Dev",
    description:
      "AI-powered tool to instantly convert your design wireframes into clean, production-ready code. Save hours of development time.",
    url: "https://draw-2-dev.vercel.app",
    siteName: "Draw2Dev",
    images: [
      {
        url: "https://draw-2-dev.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Draw2Dev - Convert Wireframes to Code",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Draw2Dev",
    description:
      "AI-powered tool to instantly convert your design wireframes into clean, production-ready code. Save hours of development time.",
    images: ["https://draw-2-dev.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
