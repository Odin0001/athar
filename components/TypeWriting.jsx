'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/components/LanguageProvider'

/**
 * Typewriter Component
 * @param {string[]} words - Array of words or phrases to type out.
 * @param {number} typingSpeed - Speed in milliseconds for typing a single character. (e.g., 100)
 * @param {number} deletingSpeed - Speed in milliseconds for deleting a single character. (e.g., 50)
 * @param {number} delayBeforeDelete - Delay in milliseconds before starting to delete. (e.g., 1500)
 * @param {string} className - Optional Tailwind CSS class for styling the container.
 */
const Typewriter = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBeforeDelete = 1500,
  className = '',
}) => {
  const { t } = useTranslation()
  const wordList = words || [t('home.firstSection.secondSentence'), t('home.firstSection.thirdSentence'), t('home.firstSection.fourthSentence'),]
  const [currentText, setCurrentText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // The word currently being typed or deleted
  const currentWord = wordList[wordIndex % wordList.length];

  useEffect(() => {
    let timer;
    let timeout;
    
    const handleTyping = () => {
      if (isDeleting) {
        // --- Deleting Phase ---
        setCurrentText(prev => currentWord.substring(0, prev.length - 1));
        
        if (currentText === '') {
          // Finished deleting, switch to typing the next word
          setIsDeleting(false);
          setWordIndex(prev => prev + 1);
        }
      } else {
        // --- Typing Phase ---
        setCurrentText(prev => currentWord.substring(0, prev.length + 1));
        
        if (currentText === currentWord) {
          // Finished typing, schedule delay before deleting
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, delayBeforeDelete);
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    
    // Slight pause on the first character of a new word to prevent immediate typing
    const currentSpeed = (isDeleting || currentText === '') ? speed : speed;

    timer = setTimeout(handleTyping, currentSpeed);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      clearTimeout(timeout);
    };
  }, [currentWord, currentText, isDeleting, wordIndex, typingSpeed, deletingSpeed, delayBeforeDelete, wordList.length]);

  return (
    <div className={`lg:text-7xl text-3xl w-full h-[50vh] flex justify-center items-center font-extrabold text-center py-4 px-4 italic ${className}`}>
      <div>
        <span>{currentText}</span>
        {/* Blinking Cursor */}
        <span
          className={`
            w-1 bg-blue-500 ml-1 inline-block
            animate-blink transition-opacity duration-500
          `}
        >
          &nbsp;
        </span>
      </div>
      {/*
        Tailwind Utility for Cursor Blinking (Define this in your global CSS file if Tailwind doesn't support @keyframes directly in config):

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      */}
    </div>
  );
};

export default Typewriter;