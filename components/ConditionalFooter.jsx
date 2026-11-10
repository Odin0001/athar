'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer'; 

const ConditionalFooter = () => {
  const pathname = usePathname();
  const excludedPaths = ['/approach', '/why-athar', '/contact']; 
  const shouldRenderFooter = !excludedPaths.includes(pathname) && !pathname.startsWith('/admin');

  return shouldRenderFooter ? <Footer /> : null;
};

export default ConditionalFooter;