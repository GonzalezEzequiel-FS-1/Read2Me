import { Box, Container } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { DocumentGrid } from "../Components/Cards/DocumentGrid";
import { NavigationContext } from "../context/NavigationContext";

export const Home = () => {
  const { setPageTitle } = useContext(NavigationContext);

  useEffect(() => {
    setPageTitle("Home");
  }, []);

  return (
    <div>
      <DocumentGrid />
    </div>
  );
};
