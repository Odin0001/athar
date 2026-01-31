import { Montserrat, Alexandria } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
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
  description: "Agency is a full-service digital marketing and creative studio specializing in branding, web design, SEO, paid media and performance-driven campaigns.",
  keywords: [
    "digital marketing",
    "digital marketing in UAE",
    "digital marketing agency",
    "marketing agency",
    "creative agency",
    "branding",
    "brand strategy",
    "web design",
    "website design",
    "SEO",
    "search engine optimization",
    "PPC",
    "paid media",
    "social media marketing",
    "content marketing",
    "email marketing",
    "conversion rate optimization",
    "CRO",
    "UX",
    "UI",
    "performance marketing",
    "analytics",
    "ecommerce marketing",
    "growth marketing"
  ],
  authors: [{ name: "Athar", url: "https://www.athar.agency" }],
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
    description: "Full-service digital marketing and creative studio — branding, web, SEO, paid media and performance marketing.",
    url: "https://www.athar.agency",
    siteName: "Athar",
    images: [
      {
        url: "https://www.athar.agency/og-image.jpg",
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
    description: "Full-service digital marketing and creative studio — branding, web, SEO, paid media and performance marketing.",
    images: ["https://www.athar.agency/og-image.jpg"],
    creator: "@athar",
  },
  icons: {
    icon: "/favicon.ico",
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
        <Analytics />
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
