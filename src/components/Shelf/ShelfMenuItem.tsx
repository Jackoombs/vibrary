import clsx from "clsx";
import { ImBin } from "react-icons/im";
import { ShelfDelete } from "./ShelfDelete";

interface Props {
  name: string;
  count: number;
  shelfName: string;
  showDelete: boolean;
  setShelfName: React.Dispatch<React.SetStateAction<string>>;
  isHover: boolean;
}

const ShelfMenuItem = ({
  name,
  count,
  shelfName,
  showDelete,
  setShelfName,
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
      {showDelete && <ShelfDelete {...{ isHover, setShelfName, name }} />}
    </li>
  );
};

export default ShelfMenuItem;
