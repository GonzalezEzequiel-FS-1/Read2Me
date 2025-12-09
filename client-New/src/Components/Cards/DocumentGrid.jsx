import React from "react";
import { BookCards } from "../BookCards";

const books = [
  { title: "Book One", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Two", thumbnail: "/Read2MeLogo.png" },
  { title: "Book Three", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Four", thumbnail: "/Read2MeLogo.png" },
  { title: "Book Five", thumbnail: "/reibo_amscot-thumb.1.png" },
  { title: "Book Six", thumbnail: "/Read2MeLogo.png" },
];

export const DocumentGrid = () => {
  return (
    <div className="p-4 bg-stone-700/50 rounded-2xl w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {books.map((book, idx) => (
          <BookCards
            key={idx}
            thumbnailSRC={book.thumbnail}
            title={book.title}
            onClick={() => console.log(book.title)}
          />
        ))}
      </div>
    </div>
  );
};
