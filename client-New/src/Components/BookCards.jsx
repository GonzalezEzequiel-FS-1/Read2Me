import React from "react";
import { Card, Text } from "@mantine/core";

export const BookCards = ({ title, thumbnailSRC, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer w-40 transition-transform hover:scale-105"
      padding={0}
      radius="md"
      shadow="sm"
      style={{
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      {/* Book Cover */}
      <div className="relative w-full aspect-[2/3] mb-2">
        <img
          src={thumbnailSRC}
          alt={title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Book Title */}
      <Text
        size="sm"
        fw={500}
        className="text-center line-clamp-2 px-1"
        lineClamp={2}
      >
        {title}
      </Text>
    </Card>
  );
};
