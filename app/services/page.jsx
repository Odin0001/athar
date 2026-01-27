import BeforeAfterComparison from "@/components/draft-components/BeforeAfterComparison"
import HeroScroll from "@/components/draft-components/HeroScroll"
import ImageGrid from "@/components/draft-components/ImageGrid"
import KeyholeSection from "@/components/draft-components/KeyholeSection"
import NameRotator from "@/components/draft-components/NameRotator"
import ParallaxPage from "@/components/draft-components/ParallaxPage"
import ParallaxScene from "@/components/draft-components/ParallaxScene"
import ParallaxSections from "@/components/draft-components/ParallaxSections"
import ParallaxSlides from "@/components/draft-components/ParallaxSlides"
import PinnedBackgroundZoom from "@/components/draft-components/PinnedBackgroundZoom"
import PinnedHeadings from "@/components/draft-components/PinnedHeadings"
import ScrollBoxes from "@/components/draft-components/ScrollBoxes"
import SlideShow from "@/components/draft-components/SlideShow"
import SlidesWrapper from "@/components/draft-components/SlidesWrapper"
import VerticalSections from "@/components/draft-components/VerticalSections"
import VideoScroll from "@/components/draft-components/VideoScroll"
import Services from "@/components/Services"

export const metadata = {
  title: "Services — Athar",
  description:
    "Services offered by Athar — Digital Marketing Agency. Strategy, SEO, PPC, content marketing, web design and performance-driven campaigns.",
  keywords: [
    "digital marketing",
    "marketing agency",
    "services",
    "SEO",
    "PPC",
    "content marketing",
    "web design",
    "analytics",
    "strategy",
    "conversion rate optimization",
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
    title: "Services — Athar",
    description:
      "Services offered by Athar — Digital Marketing Agency. Strategy, SEO, PPC, content marketing, web design and performance-driven campaigns.",
    url: "https://www.athar.agency/services",
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
    title: "Services — Athar",
    description:
      "Services offered by Athar — Digital Marketing Agency. Strategy, SEO, PPC, content marketing, web design and performance-driven campaigns.",
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
}
const page = () => {
  return (
    <div>
      {/* <PinnedBackgroundZoom /> */}
      {/* <SlidesWrapper /> dont mix this with name rotator */}
      {/* <ParallaxSlides /> dont mix this with name rotator */}
      <Services />
      {/* <KeyholeSection /> */}
      {/* <NameRotator /> */}
      {/* <PinnedHeadings /> */}
      {/* <VerticalSections /> */}
      {/* <VideoScroll /> */}
      
      
      {/* <BeforeAfterComparison /> */}
      {/* <SlideShow /> */}
      {/* <HeroScroll /> needs fixing */}
      {/* <ImageGrid /> */}
      {/* <ParallaxSections /> */}
      {/* <ParallaxPage /> */}
      {/* <ScrollBoxes /> */}
      {/* <ParallaxScene /> */}
    </div>
  )
}

export default page
