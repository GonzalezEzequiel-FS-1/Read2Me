import React, { useContext, useEffect } from "react";
import { NavigationContext } from "../context/NavigationContext";

export const Library = () => {
  const { setPageTitle, pageTitle } = useContext(NavigationContext);
  useEffect(() => {
    setPageTitle("Library");
  }, []);

  return <div>{pageTitle}</div>;
};
