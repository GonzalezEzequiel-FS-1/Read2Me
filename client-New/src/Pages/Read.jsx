import React, { useContext, useEffect } from "react";
import { NavigationContext } from "../context/NavigationContext";

export const Read = () => {
  const { setPageTitle, pageTitle } = useContext(NavigationContext);
  useEffect(() => {
    setPageTitle("New Call");
  }, []);

  return <div>{pageTitle}</div>;
};
