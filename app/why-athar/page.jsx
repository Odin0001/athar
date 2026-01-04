import SlideShow from "@/components/draft-components/SlideShow"

export const metadata = {
  title: "Why Athar — Athar",
  description:
    "Why choose Athar — Digital Marketing Agency. Results-driven strategy, creative design, and measurable performance for growing brands.",
  keywords: [
    "why Athar",
    "digital marketing",
    "marketing agency",
    "about",
    "why choose us",
    "strategy",
    "SEO",
    "PPC",
    "web design",
    "performance marketing",
  ],
  authors: [{ name: "Athar", url: "https://athar.agency" }],
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
    title: "Why Athar — Athar",
    description:
      "Why choose Athar — Digital Marketing Agency. Results-driven strategy, creative design, and measurable performance for growing brands.",
    url: "https://athar.agency/why-athar",
    siteName: "Athar",
    images: [
      {
        url: "https://athar.agency/og-image.png",
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
    title: "Why Athar — Athar",
    description:
      "Why choose Athar — Digital Marketing Agency. Results-driven strategy, creative design, and measurable performance for growing brands.",
    images: ["https://athar.agency/og-image.png"],
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
      <SlideShow />
    </>
  )
}

export default page