import ContactForm from '@/components/ContactForm'
import SlideShow from '@/components/draft-components/SlideShow'

export const metadata = {
  title: "Contact — Athar",
  description:
    "Get in touch with Athar — Digital Marketing Agency. Discuss your project, request a proposal, or ask about our services.",
  keywords: [
    "digital marketing",
    "marketing agency",
    "contact",
    "inquiry",
    "consultation",
    "proposal",
    "SEO",
    "PPC",
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
    title: "Contact — Athar",
    description:
      "Get in touch with Athar — Digital Marketing Agency. Discuss your project, request a proposal, or ask about our services.",
    url: "https://athar.agency/contact",
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
    title: "Contact — Athar",
    description:
      "Get in touch with Athar — Digital Marketing Agency. Discuss your project, request a proposal, or ask about our services.",
    images: ["https://athar.agency/og-image.png"],
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
    <>
      <ContactForm />
    </>
  )
}

export default page