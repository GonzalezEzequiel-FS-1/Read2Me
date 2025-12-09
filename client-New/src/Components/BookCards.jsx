import React from "react";

export const BookCards = ({ title, thumbnailSRC, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-md shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center p-2 w-40"
    >
      <img
        src={thumbnailSRC}
        alt={title}
        className="w-32 h-48 object-cover rounded-sm"
      />
      <p className="text-sm font-medium mt-2 text-center line-clamp-2">
        {title}
      </p>
    </div>
  );
};
