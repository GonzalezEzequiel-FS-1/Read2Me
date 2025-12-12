import { createContext, useState, useCallback } from "react";

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  // Object to store scroll positions by ID
  const [scrollMap, setScrollMap] = useState({});

  // Function to update scroll position for a given container
  const updateScroll = useCallback((id, scrollTop) => {
    setScrollMap((prev) => ({ ...prev, [id]: scrollTop }));
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollMap, updateScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};
