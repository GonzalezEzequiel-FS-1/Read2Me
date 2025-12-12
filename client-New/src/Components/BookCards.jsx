import React, { useContext } from "react";
import { Box, Card, Text } from "@mantine/core";
import { ThemeContext } from "../context/ThemeContext";

export const BookCards = ({ title, thumbnailSRC, onClick }) => {
  const { colorTheme } = useContext(ThemeContext);

  // Decide overlay and text colors based on theme
  const overlayColor =
    colorTheme === "dark" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)";
  const textColor = colorTheme === "dark" ? "white" : "black";
  const cardBgColor = colorTheme === "dark" ? "#1a1a1a" : "#ffffff";

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer w-40 transition-transform hover:scale-105 group"
      padding={0}
      radius="md"
      shadow="sm"
      style={{
        backgroundColor: cardBgColor,
        border: "none",
      }}
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
        {/* Book cover */}
        <img
          src={thumbnailSRC}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay for readability */}
        <div
          style={{
            backgroundColor: overlayColor,
            backdropFilter: "blur(1px)",
          }}
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
        ></div>

        {/* Bottom inset shadow for premium feel */}
        <div
          style={{
            boxShadow: "inset 0 -20px 20px -10px rgba(0,0,0,0.5)", // subtle bottom inset
          }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
        ></div>

        {/* Title */}
        <Box className="absolute bottom-0 left-0 px-2 py-1 w-full transition-opacity duration-300 group-hover:opacity-0">
          <Text size="md" fw={900} lineClamp={2} style={{ color: textColor }}>
            {title}
          </Text>
        </Box>
      </div>
    </Card>
  );
};
