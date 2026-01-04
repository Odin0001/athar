import ImageGrid from '@/components/draft-components/ImageGrid'
import ScrollSections from '@/components/ScrollSections'

export const metadata = {
  title: "About — Athar",
  description: "About Athar — Digital Marketing Agency",
  keywords: [
    "digital marketing",
    "marketing agency",
    "about",
    "company",
    "team",
    "SEO",
    "web design",
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
    title: "About — Athar",
    description: "About Athar — Digital Marketing Agency",
    url: "https://athar.agency/about",
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
    title: "About — Athar",
    description: "About Athar — Digital Marketing Agency",
    images: ["https://athar.agency/og-image.png"],
    creator: "@athar",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const page = () => {
  return (
    <>
    <div className='h-[350vh]'>
      <ScrollSections />
    </div>
      {/* <ImageGrid /> */}
    </>
  )
}

export default page