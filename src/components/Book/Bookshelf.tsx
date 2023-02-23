import { useState } from "react";
import Book from "../Book/Book";
import type { Book as BookType } from "@prisma/client";

interface Props {
  initialIndex: number | undefined;
  books: BookType[];
}

function BookShelf({ initialIndex, books }: Props) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="overflow-x-hidden">
      <div className="flex max-w-full justify-center gap-1  overflow-x-visible">
        {books.map(
          (
            { title, author, id, imageSrc, spineColor, titleColor, read },
            index
          ) => (
            <div key={id} className="flex flex-col items-center gap-3">
              <Book
                {...{
                  title,
                  author,
                  id,
                  imageSrc,
                  spineColor,
                  titleColor,
                  index,
                  activeIndex,
                  setActiveIndex,
                  read,
                }}
                showButtonOptions
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default BookShelf;
