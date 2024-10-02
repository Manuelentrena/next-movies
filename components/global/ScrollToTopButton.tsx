import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showButton && (
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-secondary-foreground/50 p-3 text-white shadow-lg hover:bg-secondary-foreground focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label="Scroll to top"
      >
        <ArrowUp size={25} />
      </button>
    )
  );
};

export default ScrollToTopButton;
