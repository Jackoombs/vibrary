import clsx from "clsx";
import { ImBin } from "react-icons/im";

interface Props {
  name: string;
  count: number;
  shelfName: string;
  showDelete: boolean;
  setShelfName: React.Dispatch<React.SetStateAction<string>>;
  isHover: boolean;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<string>>;
}

const ShelfMenuItem = ({
  name,
  count,
  shelfName,
  showDelete,
  setShelfName,
  setDeleteModalOpen,
  isHover,
}: Props) => {
  return (
    <li className="relative flex items-center justify-between">
      <p
        className={clsx(
          "relative z-10 ml-3 flex w-max items-center text-ellipsis rounded-lg py-1 px-3 font-medium tracking-widest duration-150",
          shelfName === name
            ? "cursor-default text-primary"
            : "cursor-pointer text-secondary",
          "hover:bg-secondary hover:text-primary"
        )}
        onClick={() => setShelfName(name)}
      >
        {name} ({count})
        <span
          className={clsx(
            "absolute top-0 right-0 -z-10 h-full w-[180%] rounded-lg bg-secondary hover:block",
            shelfName === name ? "block" : "hidden"
          )}
        ></span>
      </p>
      {showDelete && (
        <button
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg duration-150 hover:bg-secondary hover:text-primary"
          onClick={() => setDeleteModalOpen(name)}
        >
          <ImBin
            className={clsx(
              "duration-150",
              !isHover ? "opacity-0" : "opacity-100"
            )}
          />
        </button>
      )}
    </li>
  );
};

export default ShelfMenuItem;
