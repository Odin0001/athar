import Image from "next/image";
import Link from "next/link";
import logo from '@/public/logo.png';
import { useTranslation } from '@/components/LanguageProvider'
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";

const generateBubbleStyle = (size, distance, position, time, delay) => ({
  '--size': `${size}rem`,
  '--distance': `${distance}rem`,
  '--position': `${position}%`,
  '--time': `${time}s`,
  '--delay': `${delay}s`,
});

// The bubble data is extracted from your original HTML/CSS.
// We replace the CSS variables with a style object containing specific CSS properties.
const bubbleData = [
  { s: 3.28, d: 8.27, p: 80.43, t: 3.37, dl: -2.45 },
  { s: 5.05, d: 8.21, p: 81.24, t: 2.69, dl: -3.18 },
  { s: 2.89, d: 8.45, p: -1.89, t: 2.87, dl: -3.87 },
  { s: 2.99, d: 6.81, p: 100.02, t: 2.24, dl: -3.97 },
  { s: 3.06, d: 7.57, p: 101.36, t: 3.56, dl: -2.60 },
  { s: 3.23, d: 8.98, p: 69.45, t: 2.08, dl: -2.56 },
  { s: 5.98, d: 9.55, p: 33.98, t: 2.77, dl: -2.31 },
  { s: 3.71, d: 9.15, p: 36.78, t: 3.44, dl: -2.84 },
  { s: 2.08, d: 6.41, p: -3.73, t: 2.13, dl: -3.66 },
  { s: 2.85, d: 9.85, p: 63.52, t: 2.49, dl: -3.96 },
  { s: 2.02, d: 7.71, p: 10.66, t: 3.89, dl: -2.75 },
  { s: 5.15, d: 7.82, p: 44.27, t: 3.09, dl: -2.45 },
  { s: 3.12, d: 8.22, p: -0.84, t: 3.89, dl: -3.48 },
  { s: 3.07, d: 6.75, p: 17.19, t: 2.87, dl: -3.01 },
  { s: 3.04, d: 6.00, p: 30.43, t: 2.13, dl: -2.27 },
  { s: 2.49, d: 9.66, p: 38.28, t: 3.31, dl: -3.90 },
  { s: 4.34, d: 8.37, p: 8.93, t: 2.96, dl: -3.73 },
  { s: 3.02, d: 7.74, p: 7.14, t: 3.98, dl: -2.77 },
  { s: 5.08, d: 6.09, p: 99.46, t: 3.13, dl: -2.42 },
  { s: 4.22, d: 6.27, p: 97.58, t: 3.13, dl: -3.93 },
  { s: 3.57, d: 6.32, p: 92.70, t: 2.14, dl: -3.15 },
  { s: 3.59, d: 9.87, p: 98.38, t: 2.37, dl: -3.16 },
  { s: 3.15, d: 8.02, p: 17.20, t: 3.63, dl: -3.19 },
  { s: 3.49, d: 8.27, p: 10.48, t: 3.08, dl: -2.29 },
  { s: 5.77, d: 9.90, p: 3.26, t: 2.85, dl: -2.02 },
  { s: 5.24, d: 8.36, p: 87.23, t: 2.19, dl: -3.03 },
  { s: 2.20, d: 7.72, p: -0.17, t: 2.60, dl: -2.08 },
  { s: 2.10, d: 8.37, p: 32.33, t: 3.70, dl: -3.85 },
  { s: 3.64, d: 9.77, p: 87.38, t: 3.86, dl: -2.98 },
  { s: 2.01, d: 9.48, p: 18.07, t: 2.88, dl: -3.46 },
  { s: 4.84, d: 6.65, p: 42.56, t: 2.42, dl: -2.13 },
  { s: 2.65, d: 9.99, p: 47.41, t: 2.69, dl: -3.65 },
  { s: 2.18, d: 8.63, p: 79.91, t: 3.06, dl: -2.88 },
  { s: 3.96, d: 8.81, p: 22.09, t: 2.30, dl: -3.98 },
  { s: 3.26, d: 6.55, p: 56.03, t: 3.38, dl: -2.25 },
  { s: 4.72, d: 8.13, p: 83.77, t: 2.83, dl: -2.40 },
  { s: 2.46, d: 6.45, p: 77.05, t: 2.47, dl: -3.84 },
  { s: 3.50, d: 7.93, p: -1.75, t: 2.57, dl: -3.72 },
  { s: 3.29, d: 9.30, p: 18.74, t: 3.34, dl: -2.57 },
  { s: 5.22, d: 9.29, p: 42.28, t: 3.39, dl: -2.96 },
  { s: 2.82, d: 6.53, p: 8.32, t: 3.53, dl: -3.49 },
  { s: 3.96, d: 7.59, p: 86.99, t: 3.83, dl: -3.95 },
  { s: 5.86, d: 6.72, p: 93.52, t: 3.32, dl: -2.81 },
  { s: 4.66, d: 6.83, p: 18.34, t: 2.14, dl: -3.28 },
  { s: 5.65, d: 6.17, p: 103.56, t: 2.71, dl: -3.56 },
  { s: 3.41, d: 9.87, p: 60.40, t: 3.21, dl: -3.91 },
  { s: 4.36, d: 6.19, p: 55.80, t: 3.52, dl: -2.45 },
  { s: 5.66, d: 8.59, p: 72.97, t: 3.23, dl: -2.69 },
  { s: 5.36, d: 8.03, p: 68.03, t: 3.69, dl: -3.53 },
  { s: 5.58, d: 7.50, p: 94.12, t: 3.48, dl: -2.27 },
  { s: 3.28, d: 8.49, p: 48.79, t: 2.88, dl: -2.10 },
  { s: 2.57, d: 8.92, p: 36.30, t: 2.13, dl: -2.30 },
  { s: 3.19, d: 6.84, p: 77.43, t: 2.68, dl: -2.61 },
  { s: 2.92, d: 6.02, p: 64.48, t: 2.13, dl: -2.95 },
  { s: 6.00, d: 8.44, p: 13.27, t: 3.64, dl: -3.96 },
  { s: 3.68, d: 8.42, p: 32.34, t: 2.45, dl: -2.03 },
  { s: 4.16, d: 7.29, p: 53.76, t: 3.50, dl: -2.50 },
  { s: 4.79, d: 7.00, p: 71.92, t: 2.96, dl: -3.87 },
  { s: 2.52, d: 7.99, p: 64.83, t: 2.80, dl: -2.61 },
  { s: 2.88, d: 6.07, p: 11.87, t: 2.83, dl: -2.40 },
  { s: 2.10, d: 7.73, p: 89.80, t: 3.46, dl: -3.12 },
  { s: 3.34, d: 7.98, p: 68.66, t: 3.93, dl: -3.43 },
  { s: 3.97, d: 9.57, p: 8.31, t: 2.21, dl: -3.32 },
  { s: 2.79, d: 7.08, p: 28.40, t: 2.94, dl: -2.59 },
  { s: 4.25, d: 6.69, p: 42.55, t: 3.13, dl: -2.95 },
  { s: 5.72, d: 9.09, p: -3.38, t: 2.26, dl: -3.26 },
  { s: 3.22, d: 7.48, p: 101.95, t: 2.10, dl: -2.75 },
  { s: 2.18, d: 6.40, p: 50.89, t: 2.58, dl: -2.91 },
  { s: 5.81, d: 7.46, p: 90.39, t: 3.77, dl: -2.35 },
  { s: 3.62, d: 9.08, p: 11.15, t: 3.05, dl: -2.80 },
  { s: 5.00, d: 9.17, p: 64.58, t: 3.77, dl: -2.89 },
  { s: 2.71, d: 7.84, p: 5.67, t: 3.40, dl: -2.26 },
  { s: 5.86, d: 6.01, p: 8.07, t: 3.03, dl: -2.23 },
  { s: 3.18, d: 8.88, p: 8.39, t: 3.99, dl: -3.58 },
  { s: 5.63, d: 9.85, p: 1.08, t: 2.33, dl: -2.89 },
  { s: 3.40, d: 8.17, p: 84.27, t: 2.25, dl: -2.57 },
  { s: 3.26, d: 7.68, p: 51.32, t: 2.81, dl: -3.89 },
  { s: 2.74, d: 7.22, p: 56.25, t: 3.98, dl: -2.33 },
  { s: 2.22, d: 6.66, p: 6.69, t: 2.86, dl: -2.43 },
  { s: 4.22, d: 8.93, p: 25.15, t: 3.01, dl: -3.02 },
  { s: 5.18, d: 6.39, p: 102.46, t: 2.49, dl: -3.20 },
  { s: 5.51, d: 8.23, p: 101.15, t: 3.28, dl: -3.66 },
  { s: 3.34, d: 9.53, p: 29.88, t: 2.49, dl: -2.48 },
  { s: 5.57, d: 7.35, p: 22.86, t: 2.75, dl: -2.18 },
  { s: 4.12, d: 8.35, p: 29.49, t: 3.27, dl: -3.78 },
  { s: 5.95, d: 8.23, p: 86.92, t: 2.12, dl: -2.16 },
  { s: 3.41, d: 7.85, p: -4.74, t: 3.36, dl: -2.75 },
  { s: 3.77, d: 8.00, p: 58.87, t: 2.46, dl: -3.89 },
  { s: 4.97, d: 8.10, p: 73.33, t: 3.26, dl: -2.93 },
  { s: 5.24, d: 8.21, p: 49.79, t: 2.49, dl: -3.94 },
  { s: 2.31, d: 8.23, p: 52.76, t: 3.25, dl: -3.40 },
  { s: 5.41, d: 7.79, p: 55.30, t: 2.93, dl: -3.40 },
  { s: 4.79, d: 8.06, p: 6.48, t: 2.88, dl: -2.47 },
  { s: 5.20, d: 6.49, p: 17.19, t: 2.56, dl: -2.55 },
  { s: 2.65, d: 7.05, p: 99.81, t: 3.14, dl: -2.77 },
  { s: 5.46, d: 7.92, p: 56.29, t: 2.96, dl: -3.06 },
  { s: 5.38, d: 7.04, p: 90.43, t: 3.49, dl: -2.76 },
  { s: 3.68, d: 9.30, p: 50.08, t: 2.36, dl: -2.10 },
  { s: 2.64, d: 8.43, p: 34.50, t: 3.15, dl: -2.87 },
  { s: 3.04, d: 7.70, p: 54.37, t: 2.35, dl: -3.82 },
  { s: 4.95, d: 9.94, p: 93.38, t: 3.52, dl: -2.14 },
  { s: 2.26, d: 6.85, p: 7.62, t: 3.25, dl: -3.60 },
  { s: 2.97, d: 6.42, p: 0.90, t: 3.87, dl: -2.82 },
  { s: 3.76, d: 9.29, p: 104.60, t: 2.67, dl: -3.03 },
  { s: 2.53, d: 9.76, p: 17.47, t: 3.89, dl: -3.34 },
  { s: 5.81, d: 9.87, p: 15.66, t: 2.52, dl: -3.58 },
  { s: 2.45, d: 7.27, p: 36.90, t: 3.35, dl: -3.63 },
  { s: 5.77, d: 8.46, p: 35.06, t: 3.21, dl: -3.01 },
  { s: 4.39, d: 9.61, p: 22.26, t: 2.37, dl: -3.07 },
  { s: 3.95, d: 9.17, p: 55.04, t: 2.74, dl: -3.38 },
  { s: 3.84, d: 8.36, p: 3.43, t: 3.80, dl: -2.51 },
  { s: 2.38, d: 8.09, p: 51.44, t: 3.53, dl: -3.17 },
  { s: 3.99, d: 6.32, p: 58.47, t: 3.67, dl: -2.13 },
  { s: 3.83, d: 8.09, p: 47.22, t: 2.46, dl: -2.80 },
  { s: 5.41, d: 8.08, p: 7.19, t: 3.60, dl: -2.03 },
  { s: 2.33, d: 6.02, p: 69.53, t: 3.07, dl: -2.40 },
  { s: 3.19, d: 7.97, p: 79.81, t: 3.27, dl: -3.11 },
  { s: 3.04, d: 9.52, p: -2.88, t: 2.59, dl: -3.34 },
  { s: 2.02, d: 6.60, p: 12.04, t: 3.30, dl: -2.67 },
  { s: 2.31, d: 8.43, p: 10.08, t: 3.48, dl: -2.39 },
  { s: 2.40, d: 7.41, p: 35.10, t: 3.39, dl: -3.72 },
  { s: 5.41, d: 6.26, p: 88.48, t: 3.79, dl: -2.15 },
  { s: 4.19, d: 8.50, p: 55.29, t: 3.87, dl: -3.76 },
  { s: 5.23, d: 6.95, p: 87.02, t: 2.21, dl: -2.07 },
  { s: 3.23, d: 8.90, p: 70.69, t: 2.42, dl: -3.90 },
  { s: 4.42, d: 8.45, p: 16.18, t: 2.68, dl: -3.71 },
  { s: 5.18, d: 6.28, p: 51.63, t: 2.92, dl: -3.58 },
  { s: 4.30, d: 8.64, p: 25.71, t: 3.99, dl: -3.60 },
];

const Footer = () => {
  // We use a specific, non-variable blue color for the background
  const { t, lang } = useTranslation()
  const footerBgColor = '#005057';

  return (
    <footer className="footer z-10 relative grid min-h-48 w-full" style={{ background: footerBgColor, margin: 0, padding: 0 }}>
      {/* The 'bubbles' section must use vanilla CSS for the blob filter and complex animations. 
        We use a placeholder class name and a style attribute with the chosen color.
      */}
      <div className="bubbles absolute top-0 left-0 right-0 h-4" style={{ background: footerBgColor, filter: 'url("#blob")' }}>
        {bubbleData.map((bubble, index) => (
          <div
            key={index}
            className="bubble absolute rounded-full"
            style={{
              ...generateBubbleStyle(bubble.s, bubble.d, bubble.p, bubble.t, bubble.dl),
              background: footerBgColor,
            }}
          ></div>
        ))}
      </div>

      {/* Footer Content: Uses Tailwind classes for layout and styling */}
      <div className="content bg-blue-600 pt-24 pb-8 z-20 w-full" style={{ background: footerBgColor, margin: 0 }}>
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 grid-cols-1 justify-items-center gap-6 text-white md:grid-cols-2 md:px-6 sm:grid-cols-1 sm:gap-14">
          
          {/* Label Section */}
          <div className="footer__label flex flex-col items-center sm:block">
            <Image src={logo} alt="Logo" width={200} className="mb-6" />
            <span className="text-sm sm:text-xs">
              {t('home.firstSection.secondSentence')}
            </span>
            <span className="text-sm sm:text-xs flex gap-2 items-center mt-4 -ml-1">
              <IoLocationOutline size={20} />
              {t('footer.location')}
            </span>
          </div>

          {/* Links Section */}
          <ul className="footer__links flex flex-col space-x-8 justify-center sm:space-x-0 sm:space-y-6 space-y-2">
            <li>
              <Link href="/about" className="footer__link relative group">
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link href="/services" className="footer__link relative group">
                {t('nav.services')}
              </Link>
            </li>
            <li>
              <Link href="/approach" className="footer__link relative group">
                {t('nav.approach')}
              </Link>
            </li>
            <li>
              <Link href="/why-athar" className="footer__link relative group">
                {t('nav.why')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer__link relative group">
                {t('nav.contact')}
              </Link>
            </li>
          </ul>

          {/* Socials Section */}
          <div className="footer__socials justify-self-center sm:justify-self-start">
            <a href="https://www.instagram.com/atharcreativeagency?igsh=dzl0dndvOTAwNWpj" className="footer__social text-xl mr-6 hover:opacity-80 flex items-center gap-2 mb-6">
              <FaInstagram size={20} /> <span>Instagram</span>
            </a>
            <a href="https://www.linkedin.com/company/athar-creative" className="footer__social text-xl mr-6 hover:opacity-80 flex items-center gap-2 mb-6">
              <FaLinkedinIn size={20} /> <span>Linkedin</span>
            </a>
            <a href="https://www.youtube.com/@AtharCreativeagency" className="footer__social text-xl mr-6 hover:opacity-80 flex items-center gap-2 mb-6">
              <AiOutlineYoutube size={20} /> <span>Youtube</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="footer__copy text-center text-sm text-gray-300 pt-12 pb-8" style={{ background: footerBgColor }}>
          ©{new Date().getFullYear()} Athar, All rights reserved.
        </p>
      </div>

      {/* SVG Filter: Must remain outside the component flow but inside the body for the filter to work */}
      <svg style={{ position: 'fixed', top: '100vh', left: 0, width: 0, height: 0 }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9" result="blob"></feColorMatrix>
          </filter>
        </defs>
      </svg>
    </footer>
  );
};

export default Footer;