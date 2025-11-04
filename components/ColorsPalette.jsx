'use client'
import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- Color Data and GSAP Eases Setup ---

// Custom Eases from original JS
gsap.registerEase('customEase', 'cubic-bezier(0.6, 0.01, 0.05, 1)');
gsap.registerEase('blurEase', 'cubic-bezier(0.25, 0.1, 0.25, 1)');
gsap.registerEase('counterEase', 'cubic-bezier(0.16, 1, 0.3, 1)');
gsap.registerEase('gentleIn', 'cubic-bezier(0.38, 0.005, 0.215, 1)');

const colorData = [
  { id: 1, name: 'TITLE 1', number: 'Service 1', hex: 'text 1', oklch: 'some other text', className: 'bg-red-500' },
  { id: 2, name: 'TITLE 2', number: 'Service 2', hex: 'text 2', oklch: 'some other text', className: 'bg-green-500' },
  { id: 3, name: 'TITLE 3', number: 'Service 3', hex: 'text 3', oklch: 'some other text', className: 'bg-blue-500' },
  { id: 4, name: 'TITLE 4', number: 'Service 4', hex: 'text 4', oklch: 'some other text', className: 'bg-yellow-500' },
  { id: 5, name: 'TITLE 5', number: 'Service 5', hex: 'text 5', oklch: 'some other text', className: 'bg-orange-500' },
  { id: 6, name: 'TITLE 6', number: 'Service 6', hex: 'text 6', oklch: 'some other text', className: 'bg-zinc-500' },
];

// --- Main ColorPalette Component ---

const ColorPalette = () => {
  const containerRef = useRef(null);
  const rowRefs = useRef([]);
  const [activeId, setActiveId] = useState(null);
  

  // Handle the row click expansion/contraction
  const handleRowClick = useCallback((id) => {
    setActiveId(prevId => prevId === id ? null : id);
  }, []);

  // GSAP for initial load animation
  useGSAP(() => {
    const rows = rowRefs.current.filter(Boolean);
    const tl = gsap.timeline({ defaults: { ease: 'gentleIn' } });

    // Initial load animation for rows
    tl.fromTo(rows, { opacity: 0, y: 10, flex: 1 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'customEase' });

    rows.forEach((row, index) => {
      // Initial text blur animation
      tl.fromTo(row.querySelector('.color-hex'), { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4 }, `<+${0.1 + index * 0.08}`);
      tl.fromTo(row.querySelector('.color-number'), { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4 }, `<+0.1`);
      tl.fromTo(row.querySelector('.color-name'), { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4 }, `<+0.1`);
    });

  }, { scope: containerRef });

  // GSAP for expansion logic
  useGSAP(() => {
    const rows = rowRefs.current.filter(Boolean);

    rows.forEach(row => {
      const rowId = Number(row.dataset.id);
      const isCurrentActive = rowId === activeId;
      const expandedContent = row.querySelector('.expanded-content');
      const colorContent = row.querySelector('.color-content');

      // 1. Row Flex Animation
      gsap.to(row, {
        flex: isCurrentActive ? 8 : (activeId === null ? 1 : 0.5),
        duration: 0.4,
        ease: 'counterEase',
      });

      // 2. Visibility Toggle & Child Animations
      if (isCurrentActive) {
        gsap.set(expandedContent, { display: 'flex' });
        gsap.set(colorContent, { display: 'none' });

        // Get manually split characters for animation (Replaces SplitType)
        const nameChars = expandedContent.querySelectorAll('.char');

        // Expanded name char animation
        gsap.fromTo(
          nameChars,
          { opacity: 0, filter: 'blur(15px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 0.5, stagger: 0.02, ease: 'customEase' }
        );

        // Expanded details animation
        const detailItems = expandedContent.querySelectorAll('.expanded-details div');
        gsap.to(detailItems, {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.4,
          stagger: 0.1,
          ease: 'blurEase',
        });

      } else {
        // Reset and hide expanded content for non-active or closing rows
        gsap.set(colorContent, { display: 'flex' });
        
        // Use a timeline to ensure content is hidden after flex animation starts
        gsap.timeline({
          delay: 0.1, // Small delay to let flex change start
          onComplete: () => {
            gsap.set(expandedContent, { display: 'none' });
          }
        })

        // Reset expanded details opacity and blur for next transition
        const detailItems = expandedContent.querySelectorAll('.expanded-details div');
        gsap.set(detailItems, { opacity: 0, filter: 'blur(10px)' });

        // Reset expanded name
        const nameChars = expandedContent.querySelectorAll('.char');
        gsap.set(nameChars, { opacity: 0, filter: 'blur(15px)' });
      }
    });
  }, { scope: containerRef, dependencies: [activeId] });

  return (
    <div ref={containerRef} className="flex flex-col w-screen h-screen overflow-hidden relative bg-black">
      {colorData.map((color, index) => (
        <div
          key={color.id}
          data-id={color.id}
          ref={el => rowRefs.current[index] = el}
          onClick={() => handleRowClick(color.id)}
          onMouseEnter={() => activeId === null && gsap.to(rowRefs.current[index], { flex: 1.2, duration: 0.2, ease: 'counterEase' })}
          onMouseLeave={() => activeId === null && gsap.to(rowRefs.current[index], { flex: 1, duration: 0.2, ease: 'blurEase' })}
          className={`${color.className} w-full flex justify-between items-center px-8 lg:px-12 cursor-pointer translate-y-[10px] flex-1 overflow-hidden relative will-change-transform opacity-0`}
        >
          {/* Normal Content View */}
          <div className="color-content flex justify-between items-center w-full h-full relative text-white/90">
            <div
              className="color-hex text-xl sm:text-2xl lg:text-3xl tracking-tighter font-bold transition duration-200 p-2 rounded-md opacity-0 blur-lg hover:bg-white/15"
            >
              HEX {color.hex}
            </div>
            <div className="color-number text-xl sm:text-2xl lg:text-3xl tracking-tighter font-bold absolute left-1/2 -translate-x-1/2 opacity-0 blur-lg">
              {color.number}
            </div>
            <div className="color-name text-xl sm:text-2xl lg:text-3xl tracking-tighter font-bold opacity-0 blur-lg">
              {color.name}
            </div>
          </div>

          {/* Expanded Content View */}
          <div className="expanded-content absolute top-0 left-0 w-full h-full hidden flex-col justify-center items-center p-8 text-white/90 z-10">
            <div className="expanded-color-info flex flex-col items-center justify-center w-full h-full relative">
              <div className="expanded-color-name text-[14vw] font-normal tracking-tighter text-center absolute top-1/2 left-0 w-full -translate-y-1/2 will-change-transform whitespace-nowrap">
                {/* Manual text splitting for character animation (Replaces SplitType) */}
                {color.name.split('').map((char, charIndex) => (
                    <span key={charIndex} className="char inline-block opacity-0 blur-lg">
                        {char === ' ' ? '\u00A0' : char} {/* Preserve space */}
                    </span>
                ))}
              </div>
              <div className="expanded-details flex gap-8 lg:gap-12 text-2xl lg:text-3xl tracking-tighter font-bold absolute bottom-[15%] left-0 w-full justify-center flex-col sm:flex-row sm:gap-8">
                <div
                  className="detail-number opacity-0 blur-lg p-2 rounded-md text-center"
                >
                  {color.number}
                </div>
                <div
                  className="detail-hex opacity-0 blur-lg p-2 rounded-md hover:bg-white/15 cursor-pointer text-center"
                >
                  HEX {color.hex}
                </div>
                <div
                  className="detail-oklch opacity-0 blur-lg p-2 rounded-md hover:bg-white/15 cursor-pointer text-center"
                >
                  {color.oklch}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;