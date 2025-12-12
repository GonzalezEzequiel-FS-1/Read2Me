import React from "react";
import {
  Card,
  Flex,
  Text,
  Image,
  Paper,
  Box,
  Center,
  Space,
  Divider,
  Title,
  Code,
} from "@mantine/core";

export const HorizontalCards = ({ thumbnail, titleText, description }) => {
  return (
    <Box
      p="sm"
      style={{
        minWidth: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Flex align="stretch" w="100%">
        <Box className="w-1/4 aspect-square overflow-hidden rounded-lg flex items-center justify-center">
          <Image src={thumbnail} className="w-full  object-cover" />
        </Box>

        <Box className="w-3/4 text-left px-2 flex flex-col items-start justify-between">
          <Title order={4}>{titleText}</Title>
          <Box className="h-full">
            <Text bg="transparent" c={"dimmed"} lineClamp={1}>
              {description}
            </Text>
          </Box>

          <Text>Stars</Text>
        </Box>
        <Flex direction={"column"} align={"center"} justify={"space-between"}>
          <Text>BookMark</Text>
          <Text>Author</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
