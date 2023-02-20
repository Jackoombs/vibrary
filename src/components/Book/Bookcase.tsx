import { trpc } from "../../utils/trpc";
import { useWindowWidth } from "../../utils/useWindowWidth";
import BookShelf from "./Bookshelf";

interface Props {
  shelfName: string;
  searchActive: boolean;
}

export const Bookcase = ({ shelfName, searchActive }: Props) => {
  const windowWidth = useWindowWidth() || 3;

  const booksPerShelf = () => {
    if (windowWidth < 410) {
      return 3;
    } else if (windowWidth < 460) {
      return 4;
    } else if (windowWidth < 640) {
      return 5;
    } else if (windowWidth < 1024) {
      return 6;
    } else if (windowWidth < 1200) {
      return 8;
    } else {
      return 10;
    }
  };

  const { data, isLoading, error } = trpc.shelf.getShelf.useQuery({
    name: `${shelfName}`,
  });
  const books = data?.books;

  if (error) return <h1>Error!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (!books?.length || books === undefined)
    return (
      <p className="text-center text-lg font-medium">
        Use the search bar above to find <br /> books to add to your shelf
      </p>
    );

  const numberOfShelves = Math.ceil(books.length / booksPerShelf());

  return (
    <>
      {!searchActive && (
        <div className="flex flex-col gap-16">
          {[...Array(numberOfShelves).keys()].map((e) => (
            <BookShelf
              key={e}
              initialIndex={0}
              books={books.slice(
                e * booksPerShelf(),
                e * booksPerShelf() + booksPerShelf()
              )}
            />
          ))}
        </div>
      )}
    </>
  );
};
