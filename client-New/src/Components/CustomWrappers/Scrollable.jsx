import { useRef, useEffect, useContext } from "react";
import { ScrollContext } from "../../context/ScrollContext";

export const Scrollable = ({ id, children, className = "" }) => {
  const containerRef = useRef(null);
  const { updateScroll } = useContext(ScrollContext);

  useEffect(() => {
    console.log("Testing Scrollable");
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = el.scrollTop;
          console.log(`Scrollable ${id} scrollTop:`, scrollTop); // <-- testing log
          updateScroll(id, scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [id, updateScroll]);

  return (
    <div
      ref={containerRef}
      className={`overflow-auto border border-red-500 ${className}`}
    >
      {children}
    </div>
  );
};
