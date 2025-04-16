import { useEffect, useState } from "react";
import PointinUpAnime from '../../image/pointing-up.png';

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
      className={`fixed bottom-0 right-3 md:right-20 p-3 text-ayotaku-text-default rounded-t-md duration-500 cursor-pointer transition-opacity ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <img src={PointinUpAnime} alt="Pointing up Anime" className="w-16 md:w-24 bg-transparent rounded-full" />
    </button>
  )
}

export default ButtonScrollUpComponent;