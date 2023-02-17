import clsx from "clsx";
import { RiAddCircleFill } from "react-icons/ri";
import { type BookType } from "../../types/book";
import { trpc } from "../../utils/trpc";

interface Props {
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  setBooks: React.Dispatch<React.SetStateAction<BookType[]>>;
  shelfName: string;
}

const BookAddBtn = ({
  title,
  author,
  id,
  imageSrc,
  publicationDate,
  pageCount,
  shelfName,
  setSearchActive,
  setBooks,
}: BookType & Props) => {
  const utils = trpc.useContext();

  const addPost = trpc.book.add.useMutation({
    async onSuccess() {
      setSearchActive(false);
      setBooks([]);
      utils.shelf.getShelf.invalidate();
      utils.shelf.getNameList.invalidate();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleClick = () => {
    const input = {
      title,
      author,
      bookId: id,
      imageSrc,
      publicationDate,
      pageCount,
      shelfName,
    };
    addPost.mutate(input);
  };

  return (
    <>
      <button
        className={clsx(
          "xl mt-3 flex items-center gap-2 rounded py-1 px-2 text-lg font-bold duration-150 hover:bg-primary hover:text-secondary hover:shadow-none"
        )}
        onClick={handleClick}
      >
        <RiAddCircleFill />
        Add Book
      </button>
    </>
  );
};

export default BookAddBtn;
