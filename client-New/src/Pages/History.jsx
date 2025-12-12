import React, { useContext, useEffect } from "react";
import { NavigationContext } from "../context/NavigationContext";

export const History = () => {
  const { setPageTitle, pageTitle } = useContext(NavigationContext);
  useEffect(() => {
    setPageTitle("History");
  }, []);

  return <div>{pageTitle}</div>;
};
