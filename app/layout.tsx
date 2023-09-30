import { Container } from "@/components/container";
import "./globals.css";

import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  title: "Webshare",
  description:
    "Securely share text snippets over the internet. Basically a web clipboard.",
  openGraph: {
    title: "Webshare",
    description:
      "Securely share text snippets over the internet. Basically a web clipboard.",
    url: "https://webshare.simonh1701.app",
    siteName: "Webshare",
    locale: "en",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    noimageindex: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": 0,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="body">
        <Header />
        <Container className="w-full flex-1">
          <main>{children}</main>
        </Container>
        <Footer />
      </body>
    </html>
  );
}
