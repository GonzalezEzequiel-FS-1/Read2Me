import React from "react";
import { Container, Tabs } from "@mantine/core";
import { Popular } from "./Popular";
import { Newest } from "./Newest";
import { Collections } from "./Collections";

export const HomeTabs = () => {
  return (

      <Tabs defaultValue="popular">
        <Tabs.List grow justify="center">
          <Tabs.Tab value="popular">Popular</Tabs.Tab>
          <Tabs.Tab value="newest">Newest</Tabs.Tab>
          <Tabs.Tab value="collections">Collections</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="popular">
          <Popular />
        </Tabs.Panel>
        <Tabs.Panel value="newest">
          <Newest />
        </Tabs.Panel>
        <Tabs.Panel value="collections">
          <Collections />
        </Tabs.Panel>
      </Tabs>

  );
};
