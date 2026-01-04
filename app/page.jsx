import DarkVeil from "@/components/DarkVeil";
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'
import HorizontalScroll from "@/components/HorizontalScroll";
import ColorsPalette from "@/components/ColorsPalette";
import Carousel from "@/components/Carousel";
import NameRotator from "@/components/draft-components/NameRotator";
import ImageGrid from "@/components/draft-components/ImageGrid";
import Header from "@/components/Header";
import StackedSection from "@/components/StackedSection";
import PinnedHeadings from "@/components/draft-components/PinnedHeadings";
import Typewriter from "@/components/TypeWriting";
import Expertise from "@/components/Expertise";
import MultiDimensionsSlider from "@/components/MultiDimensionsSlider";

import Approach from "@/components/Approach";
import WhyUs from "@/components/WhyUs";
import Header2 from "@/components/Header2";


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
  authors: [{ name: "Athar" }],
  alternates: {
    canonical: "https://athar.agency/" // replace with production URL
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "Athar",
    description: "Full-service digital marketing and creative studio — branding, web, SEO, paid media and performance marketing.",
    url: "https://athar.agency/",
    siteName: "Agency",
    images: [
      {
        url: "https://athar.agency/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Athar"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Athar",
    description: "Full-service digital marketing and creative studio — branding, web, SEO, paid media and performance marketing.",
    creator: "@your_twitter" // replace with real handle
  },
  verification: {
    google: "your-google-site-verification-token" // replace with your token
  }
};

export default function Home() {
  
  return (
    <>
      <Header2 />
      {/* <Header /> */}
      <Typewriter />
      {/* <StackedSection /> */}
      <Expertise />
      {/* <HorizontalScroll /> */}
      {/* <PinnedHeadings /> */}
      {/* <MultiDimensionsSlider /> */}
      <Approach />
      <WhyUs />
      {/* <ColorsPalette /> */}
      
      {/* <Carousel /> */}
      {/* <NameRotator /> */}
      {/* <ImageGrid /> */}
    </>
  );
}