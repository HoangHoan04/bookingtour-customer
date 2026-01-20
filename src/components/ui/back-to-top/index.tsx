import { useEffect, useState } from "react";

export default function BackToTop() {
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

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="fixed right-6 bottom-6 w-12 h-12 rounded-lg bg-teal-800/90 backdrop-blur-sm shadow-xl flex items-center justify-center transition-transform hover:scale-110 hover:bg-teal-700 z-50"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="pi pi-chevron-up text-white text-lg"></i>
    </button>
  );
}
