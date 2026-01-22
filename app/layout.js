import { Montserrat, Alexandria } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/utils/LenisProvider";
import SplashCursor from "@/components/SplashCursor";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/components/LanguageProvider";
import ConditionalFooter from "@/components/ConditionalFooter";
import FontController from "@/components/FontController";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const alexandria = Alexandria({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Athar",
  description: "Digital Marketing Agency",
  keywords: [
    "digital marketing",
    "marketing agency",
    "SEO",
    "PPC",
    "content marketing",
    "web design",
  ],
  authors: [{ name: "Athar", url: "https://athar.example.com" }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    maxSnippet: -1,
    maxImagePreview: "large",
    maxVideoPreview: -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Athar",
    description: "Digital Marketing Agency",
    url: "https://athar.example.com",
    siteName: "Athar",
    images: [
      {
        url: "https://athar.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Athar — Digital Marketing Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athar",
    description: "Digital Marketing Agency",
    images: ["https://athar.example.com/og-image.png"],
    creator: "@athar",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: 'nnH4fgW9zRnWSg0kYtR7LdFdH8lErPiIre5d9kDvZMQ'
  },
  alternates: {
    canonical: 'https://www.athar.agency',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${alexandria.className} antialiased`}
      >
        <SplashCursor />
        <LenisProvider>
          <LanguageProvider>
            <FontController 
              montserratClassName={montserrat.className}
              alexandriaClassName={alexandria.className}
            />
            <Navbar />
            {children}
            <ConditionalFooter />
          </LanguageProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
