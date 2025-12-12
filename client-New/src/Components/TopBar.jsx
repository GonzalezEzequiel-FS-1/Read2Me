import React, { useContext } from "react";
import {
  Box,
  Container,
  Group,
  Title,
  ActionIcon,
  Avatar,
  Tooltip,
  useMantineTheme,
  Flex,
  Text,
} from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { AuthContext } from "../context/AuthContext";
import { NavigationContext } from "../context/NavigationContext";
import ThemeSwapper from "./ThemeSwapper";
import avatarImg from "/avatar.png";
import { Portal } from "@mantine/core";

export const TopBar = () => {
  const { userName } = useContext(AuthContext);
  const { pageTitle } = useContext(NavigationContext);
  const theme = useMantineTheme();

  // Header hides when scrolled past 0px, shows when scrolling up
  const pinned = useHeadroom({ fixedAt: 0 });

  const handleAssignUser = () => console.log(userName);

  return (
    <Container>
      <Flex
        w={"100%"}
        bg={"transparent"}
        justify={"space-between"}
        align={"center"}
      >
        {/* Page Title */}
        <Box>
          <Title
            order={2}
            truncate
            style={{
              fontWeight: 800,
              fontSize: "2rem",
            }}
          >
            {pageTitle}
          </Title>
        </Box>
        <Title order={3}>Read2Me</Title>
        {/* Right Controls */}
        <Group spacing="sm" align="center">
          <ThemeSwapper />

          <Tooltip label={userName || "User"} position="bottom">
            <ActionIcon
              variant="outline"
              size={'lg'}
              onClick={handleAssignUser}
              radius="xl"
            >
              {avatarImg ? (
                <Avatar
                variant="filled"
                  src={avatarImg}
                  radius={'xl'}
                  size={'md'}

                />
              ) : (
                <Avatar radius="xl" size={40}>
                  {userName?.[0] || "U"}
                </Avatar>
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Flex>
    </Container>
  );
};
