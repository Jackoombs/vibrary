import { useState } from "react";
import { type BookType } from "../../types/book";
import Book from "./Book";
import BookAddBtn from "./BookAddBtn";

interface Props {
  query: string;
  books: BookType[];
  initialIndex: number | undefined;
  alwaysDisplay: boolean;
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  setBooks: React.Dispatch<React.SetStateAction<BookType[]>>;
  shelfName: string;
}

function BookshelfSearch({
  query,
  books,
  shelfName,
  initialIndex,
  alwaysDisplay,
  setSearchActive,
  setBooks,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="flex flex-col pt-10">
      <h2 className="flex items-end gap-4 text-2xl font-medium">
        Showing results for: <p className="text-xl italic">{query}</p>
      </h2>
      <div className="grid grid-cols-2 gap-y-8 pt-20 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {books.map(
          (
            {
              title,
              author,
              id,
              imageSrc,
              publicationDate,
              pageCount,
              spineColor,
              titleColor,
            },
            index
          ) => (
            <div key={index} className="flex flex-col items-center">
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
                  alwaysDisplay,
                  read: false,
                }}
              />
              <BookAddBtn
                {...{
                  title,
                  author,
                  id,
                  imageSrc,
                  publicationDate,
                  pageCount,
                  spineColor,
                  titleColor,
                  setSearchActive,
                  setBooks,
                  shelfName,
                }}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default BookshelfSearch;
