import { useEffect, useState } from "react";

function ButtonScrollUpComponent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 p-3 bg-ayotaku-box hover:bg-ayotaku-super-dark text-ayotaku-text-default rounded-full shadow-lg duration-500 cursor-pointer transition-opacity ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <svg className="w-6 h-6 text-gray-800 dark:text-ayotaku-text-default" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
      </svg>
    </button>
  )
}

export default ButtonScrollUpComponent;