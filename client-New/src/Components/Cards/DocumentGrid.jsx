import React, { useContext, useEffect, useRef, useState } from "react";
import { BookCards } from "../BookCards";
import {
  Button,
  Center,
  Container,
  Grid,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { ScrollContext } from "../../context/ScrollContext";
import { Scrollable } from "../CustomWrappers/Scrollable";
import { Carousel } from "@mantine/carousel";
import { books } from "../../utils/books";

export const DocumentGrid = () => {
  const handleBookClick = (bookTitle) => {
    console.log(bookTitle);
  };

  return (
    <>
      <Title order={2}>Recent Books</Title>
      <Carousel
        height="100%"
        slideSize="10%"
        slideGap="md"
        pt={"lg"}
        emblaOptions={{ loop: true, dragFree: false, align: "center" }}
      >
        {books.map((book) => (
          <Carousel.Slide key={book.title} className="py-2">
            <BookCards
              thumbnailSRC={book.thumbnail}
              title={book.title}
              onClick={() => handleBookClick(book.title)}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

/*

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


*/
