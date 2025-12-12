import { createContext, useEffect, useState } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState("Read2Me");
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  return (
    <NavigationContext.Provider value={{ setPageTitle, pageTitle }}>
      {children}
    </NavigationContext.Provider>
  );
};
