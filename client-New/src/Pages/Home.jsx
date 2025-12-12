import { Box, Container, Space } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { DocumentGrid } from "../Components/Cards/DocumentGrid";
import { NavigationContext } from "../context/NavigationContext";
import { HomeTabs } from "../Components/Tabs/TabCollection/HomeTabs/HomeTabs";

export const Home = () => {
  const { setPageTitle } = useContext(NavigationContext);

  useEffect(() => {
    setPageTitle("Home");
  }, []);

  return (
    <Box className="flex flex-col h-full">
      <Space mt="lg" />
      <DocumentGrid />
      <Space mt="lg" />
      <HomeTabs className="flex-1" />
    </Box>
  );
};
