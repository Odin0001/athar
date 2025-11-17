import ParallaxPage from "@/components/draft-components/ParallaxPage"
import Services from "@/components/Services"

export const metadata = {
  title: "Approach — Athar",
  description: "Our approach to delivering measurable digital marketing results — strategy, design, and performance.",
  keywords: [
    "digital marketing",
    "marketing agency",
    "approach",
    "strategy",
    "SEO",
    "PPC",
    "content",
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
    title: "Approach — Athar",
    description: "Our approach to delivering measurable digital marketing results — strategy, design, and performance.",
    url: "https://athar.example.com/approach",
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
    title: "Approach — Athar",
    description: "Our approach to delivering measurable digital marketing results — strategy, design, and performance.",
    images: ["https://athar.example.com/og-image.png"],
    creator: "@athar",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

const page = () => {
  return (
    <>
      {/* <ParallaxPage /> */}
      <Services />
    </>
  )
}

export default page