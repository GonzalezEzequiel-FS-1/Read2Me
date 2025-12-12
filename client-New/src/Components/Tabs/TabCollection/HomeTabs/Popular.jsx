import React from "react";
import { HorizontalCards } from "../../../Cards/HorizontalCards";
import { Container, Divider, ScrollArea, Space } from "@mantine/core";
import { books } from "../../../../utils/books";
import bookQuery from "../../../../utils/booksQuery";
export const Popular = () => {
  return (
    <ScrollArea style={{ flex: 1, height: "50vh" }} scrollbarSize={6}>
      <Space mt="sm" />
      {bookQuery.items.map((book) => (
        <div key={book?.id}>
          <HorizontalCards
            titleText={book?.volumeInfo?.title || "No title"}
            description={book?.volumeInfo?.description || ""}
            thumbnail={book?.volumeInfo?.imageLinks?.thumbnail}
          />
          <Space mt="sm" />
          <Divider />
          <Space mt="sm" />
        </div>
      ))}
    </ScrollArea>
  );
};
