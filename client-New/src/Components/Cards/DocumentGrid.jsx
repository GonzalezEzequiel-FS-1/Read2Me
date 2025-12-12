import React, { useContext, useEffect, useRef, useState } from "react";
import { BookCards } from "../BookCards";
import { Button, Center, Container, Grid, SimpleGrid } from "@mantine/core";
import { ScrollContext } from "../../context/ScrollContext";
import { Scrollable } from "../CustomWrappers/Scrollable";

const books = [
  { title: "Book One 1", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 1", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 2", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 2", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 3", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 3", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 4", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 4", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 5", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 5", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 6", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 6", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 7", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 7", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 8", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 8", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 9", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 9", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 10", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 10", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 11", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 11", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 12", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 12", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 13", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 13", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 14", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 14", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 15", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 15", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 16", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 16", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 17", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 17", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 18", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 18", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 19", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 19", thumbnail: "/Read2MeLogo.png" },
  { title: "Book One 20", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two 20", thumbnail: "/Read2MeLogo.png" },
];


export const DocumentGrid = () => {
  const handleBookClick = (bookTitle) => {
    console.log(bookTitle);
  };

  return (
    <Container size="xl" px="md" py="xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
        {books.map((book) => (
          <BookCards
            key={book.id || book.title}
            thumbnailSRC={book.thumbnail}
            title={book.title}
            onClick={() => handleBookClick(book.title)}
          />
        ))}
      </div>
    </Container>
  );
};