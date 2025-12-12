import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const CustomSegmentedControl = ({ options = ["Home", "Library", "Read", "History"], onChange }) => {
  const [selected, setSelected] = useState(options[0]);
  const containerRef = useRef(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

  // Update bubble position when selected changes
  useEffect(() => {
    if (!containerRef.current) return;
    const index = options.indexOf(selected);
    const button = containerRef.current.children[index];
    if (button) {
      setIndicator({ x: button.offsetLeft, width: button.offsetWidth });
    }
  }, [selected, options]);

  const handleSelect = (option) => {
    setSelected(option);       // Updates bubble
    if (onChange) onChange(option);
  };

  return (
    <div className="relative w-full bg-gray-200/20 rounded-full p-1" ref={containerRef}>
      {/* Animated bubble */}
      <motion.div
        layout
        initial={false}
        animate={{ x: indicator.x, width: indicator.width }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="absolute top-1 left-0 h-10 bg-white/30 backdrop-blur-md rounded-full shadow-lg pointer-events-none"
      />

      {/* Buttons */}
      <div className="relative z-10 flex w-full">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
              selected === option ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
