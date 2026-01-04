'use client'
import { useState, useEffect } from "react";
import { FaUserTie, FaRegBuilding } from "react-icons/fa";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { FaPenFancy } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { PiRankingLight } from "react-icons/pi";
import { useTranslation } from "./LanguageProvider";

// --- SVGs for Icons (replacing v-icon) ---

// Email Icon (using feather icon style for consistency)
const MailIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
    <path d="M22 7l-10 7L2 7"></path>
  </svg>
);

// Lock Icon (using feather icon style for consistency)
const LockIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ContactForm = () => {
  const { t, lang } = useTranslation();
  const [signinForm, setSigninForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    subject: "",
    message: ""
  });

  const [typedText, setTypedText] = useState("");

  const phrases = [
    t('contact.secondSection.sentence'),
    // "Turning clicks into clients with conversion-optimized funnels.",
    // "Your digital presence, simplified. Seamless tech and strategy.",
    // "Performance marketing that drives qualified leads, not just traffic.",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinForm),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Email sent successfully!");
      setSigninForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        subject: "",
        message: ""
      });
    } else {
      alert("something went wrong");
      console.error("Form submission failed:", data.message || "Unknown error occurred.");
    }
    } catch(error) {
      console.error("An error occurred during form submission:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninForm((prev) => ({ ...prev, [name]: value }));
  };

  // Typing Effect Logic
  useEffect(() => {
    let charIndex = 0;
    let phraseIndex = 0;
    let isTyping = true;
    const typingSpeed = 70;
    const erasingSpeed = 40;
    const pauseDuration = 1500;
    let interval;

    const typeEffect = () => {
      const currentPhrase = phrases[phraseIndex % phrases.length];

      if (isTyping) {
        if (charIndex < currentPhrase.length) {
          setTypedText(currentPhrase.substring(0, charIndex + 1));
          charIndex++;
          interval = setTimeout(typeEffect, typingSpeed);
        } else {
          isTyping = false;
          interval = setTimeout(typeEffect, pauseDuration);
        }
      } else {
        if (charIndex > 0) {
          setTypedText(currentPhrase.substring(0, charIndex - 1));
          charIndex--;
          interval = setTimeout(typeEffect, erasingSpeed);
        } else {
          isTyping = true;
          phraseIndex++;
          interval = setTimeout(typeEffect, typingSpeed);
        }
      }
    };

    typeEffect();

    return () => clearTimeout(interval);
  }, []);

  // Custom CSS for the gradient background and typing cursor
  const customStyles = `
        .main-gradient-bg {
            background: linear-gradient(132deg, #97b9fd, #1a314c, #005057, #00bf93, #e3ff00, #fc4949);
            background-size: 400% 400%;
            animation: BackgroundGradient 15s ease infinite;
        }

        @keyframes BackgroundGradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .main-gradient-bg {
                animation: none;
            }
        }

        .typed-text-container::after {
            content: '|';
            display: inline-block;
            vertical-align: bottom;
            animation: cursorBlink 1s infinite;
            margin-left: 0.2rem;
            font-weight: 300;
        }

        @keyframes cursorBlink {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0;
            }
        }
    `;

  return (
    <>
      <style>{customStyles}</style>
      <main className="main-gradient-bg w-full min-h-screen py-12 overflow-auto flex items-start md:items-center justify-center">
        <div className="flex flex-col-reverse lg:flex-row justify-between w-full px-4 sm:px-8 md:px-16 gap-y-8 lg:space-y-0">
          {/* Right Side - Marketing Message */}
          <div className="w-full flex justify-center items-center lg:order-2 px-2 sm:px-4">
            <div className="text-white text-center p-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                {t('contact.secondSection.title')}
              </h1>
              <h2 className="text-base sm:text-xl md:text-4xl font-light min-h-[4rem] md:min-h-[5rem] overflow-hidden typed-text-container">
                {typedText}
              </h2>
            </div>
          </div>

          {/* Left Side - Login Form */}
          <div className="relative bg-gray-900/50 backdrop-blur-lg border border-white/20 shadow-2xl shadow-black rounded-3xl w-full max-w-lg mx-auto p-6 sm:p-8 text-white lg:order-1 mt-4 lg:mt-0">
            <form className="space-y-6" onSubmit={handleSubmit} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <h3 className="text-2xl font-semibold mb-8">
                {t('contact.headerTitle')}
              </h3>

              {/* name Input */}
              <div className="relative border border-gray-500 rounded-xl z-0 before:absolute before:inset-0 before:z-[-1] before:rounded-xl before:bg-[linear-gradient(to_top,#575757,transparent_80%)] before:opacity-0 focus-within:before:opacity-100 before:transition-opacity before:duration-300">
                <input
                  required
                  aria-label="Full Name"
                  type="text"
                  placeholder={t('contact.firstSection.fullName')}
                  name="name"
                  value={signinForm.name}
                  onChange={handleChange}
                  className={`placeholder-gray-400 text-white w-full py-3 px-4 ${lang === 'ar' ? 'pr-8' : 'pl-12'} sm:pl-12 sm:pr-10 rounded-xl bg-white/10 outline-none focus:bg-transparent transition-colors duration-300`}
                />
                <FaUserTie className={`text-gray-400 absolute left-3 ${lang === 'ar' ? 'right-3' : 'left-3'} sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5`} />
              </div>

              {/* Email Input */}
              <div className="relative border border-gray-500 rounded-xl z-0 before:absolute before:inset-0 before:z-[-1] before:rounded-xl before:bg-[linear-gradient(to_top,#575757,transparent_80%)] before:opacity-0 focus-within:before:opacity-100 before:transition-opacity before:duration-300">
                <input
                  required
                  aria-label="Email Address"
                  type="email"
                  placeholder={t('contact.firstSection.email')}
                  name="email"
                  value={signinForm.email}
                  onChange={handleChange}
                  className={`placeholder-gray-400 text-white w-full py-3 px-4 ${lang === 'ar' ? 'pr-8' : 'pl-12'} sm:pl-12 sm:pr-10 rounded-xl bg-white/10 outline-none focus:bg-transparent transition-colors duration-300`}
                />
                <MdOutlineMail className={`text-gray-400 absolute left-3 ${lang === 'ar' ? 'right-3' : 'left-3'} sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6`} />
              </div>
              
              {/* Phone Input */}
              <div className="relative border border-gray-500 rounded-xl z-0 before:absolute before:inset-0 before:z-[-1] before:rounded-xl before:bg-[linear-gradient(to_top,#575757,transparent_80%)] before:opacity-0 focus-within:before:opacity-100 before:transition-opacity before:duration-300">
                <input
                  required
                  aria-label="Phone Number"
                  type="text"
                  placeholder={t('contact.firstSection.phone')}
                  name="phone"
                  value={signinForm.phone}
                  onChange={handleChange}
                  className={`placeholder-gray-400 text-white w-full py-3 px-4 ${lang === 'ar' ? 'pr-8' : 'pl-12'} sm:pl-12 sm:pr-10 rounded-xl bg-white/10 outline-none focus:bg-transparent transition-colors duration-300`}
                />
                <MdOutlinePhone className={`text-gray-400 absolute left-3 ${lang === 'ar' ? 'right-3' : 'left-3'} sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6`} />
              </div>

              {/* Company Input */}
              <div className="relative border border-gray-500 rounded-xl z-0 before:absolute before:inset-0 before:z-[-1] before:rounded-xl before:bg-[linear-gradient(to_top,#575757,transparent_80%)] before:opacity-0 focus-within:before:opacity-100 before:transition-opacity before:duration-300">
                <input
                  required
                  aria-label="Company Name"
                  type="text"
                  placeholder={t('contact.firstSection.companyName')}
                  name="company"
                  value={signinForm.company}
                  onChange={handleChange}
                  className={`placeholder-gray-400 text-white w-full py-3 px-4 ${lang === 'ar' ? 'pr-8' : 'pl-12'} sm:pl-12 sm:pr-10 rounded-xl bg-white/10 outline-none focus:bg-transparent transition-colors duration-300`}
                />
                <FaRegBuilding className={`text-gray-400 absolute left-3 ${lang === 'ar' ? 'right-3' : 'left-3'} sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6`} />
              </div>

              {/* Position Input */}
              <div className="relative border border-gray-500 rounded-xl z-0 before:absolute before:inset-0 before:z-[-1] before:rounded-xl before:bg-[linear-gradient(to_top,#575757,transparent_80%)] before:opacity-0 focus-within:before:opacity-100 before:transition-opacity before:duration-300">
                <input
                  required
                  aria-label="Position"
                  type="text"
                  placeholder={t('contact.firstSection.position')}
                  name="position"
                  value={signinForm.position}
                  onChange={handleChange}
                  className={`placeholder-gray-400 text-white w-full py-3 px-4 ${lang === 'ar' ? 'pr-8' : 'pl-12'} sm:pl-12 sm:pr-10 rounded-xl bg-white/10 outline-none focus:bg-transparent transition-colors duration-300`}
                />
                <PiRankingLight className={`text-gray-400 absolute left-3 ${lang === 'ar' ? 'right-3' : 'left-3'} sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6`} />
              </div>

              {/* subject Input */}
              <div className="relative border border-gray-500 rounded-xl z-0 before:absolute before:inset-0 before:z-[-1] before:rounded-xl before:bg-[linear-gradient(to_top,#575757,transparent_80%)] before:opacity-0 focus-within:before:opacity-100 before:transition-opacity before:duration-300">
                <input
                  required
                  aria-label="Subject"
                  type="text"
                  placeholder={t('contact.firstSection.subject')}
                  name="subject"
                  value={signinForm.subject}
                  onChange={handleChange}
                  className={`placeholder-gray-400 text-white w-full py-3 px-4 ${lang === 'ar' ? 'pr-8' : 'pl-12'} sm:pl-12 sm:pr-10 rounded-xl bg-white/10 outline-none focus:bg-transparent transition-colors duration-300`}
                />
                <FaPenFancy className={`text-gray-400 absolute left-3 ${lang === 'ar' ? 'right-3' : 'left-3'} sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5`} />
              </div>

              {/* message Input */}
              <div className="relative border border-gray-500 rounded-xl z-0 before:absolute before:inset-0 before:z-[-1] before:rounded-xl before:bg-[linear-gradient(to_top,#575757,transparent_80%)] before:opacity-0 focus-within:before:opacity-100 before:transition-opacity before:duration-300">
                <textarea
                  required
                  aria-label="Your Message"
                  placeholder={t('contact.firstSection.message')}
                  name="message"
                  rows={4}
                  value={signinForm.message}
                  onChange={handleChange}
                  className={`placeholder-gray-400 text-white w-full py-3 px-4 ${lang === 'ar' ? 'pr-8' : 'pl-12'} sm:pl-12 sm:pr-10 rounded-xl bg-white/10 outline-none focus:bg-transparent transition-colors duration-300 resize-none`}
                ></textarea>
                <LuMessageSquareMore className={`text-gray-400 absolute left-3 ${lang === 'ar' ? 'right-3' : 'left-3'} sm:left-4 top-4 sm:top-6 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6`} />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              >
                {t('contact.firstSection.sendMessage')}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactForm;
