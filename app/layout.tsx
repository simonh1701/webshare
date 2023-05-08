import { Container } from "@/components/container";
import "./globals.css";

import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata = {
  title: "Webshare",
  description:
    "Securely share text snippets over the internet. Basically a web clipboard.",
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
