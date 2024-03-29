import { useState } from "react";
import { trpc } from "../../utils/trpc";
import ShelfMenuItem from "./ShelfMenuItem";
import { GoPlus } from "react-icons/go";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import { signOut } from "next-auth/react";
import { ShelfAdd } from "./ShelfAdd";

interface Props {
  shelfName: string;
  setShelfName: React.Dispatch<React.SetStateAction<string>>;
  setShelfMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const ShelfMenuSidebar = ({
  shelfName,
  setShelfName,
  setShelfMenuOpen,
  className,
}: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { data, isLoading, error } = trpc.shelf.getNameList.useQuery();

  interface Shelf {
    name: string;
    isDefault: boolean;
    _count: {
      books: number;
    };
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error!</h1>;

  return (
    <aside
      className={clsx(
        "z-[50] flex min-h-screen w-80 flex-col justify-between bg-primary px-8 py-10 text-secondary",
        className
      )}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
    >
      <div>
        {setShelfMenuOpen && (
          <button
            onClick={() => setShelfMenuOpen(false)}
            className="self-end py-4 text-3xl"
          >
            {<IoMdClose />}
          </button>
        )}
        <h1 className="pb-8 text-center font-space text-7xl font-light">
          vibrary
        </h1>
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-2xl font-medium">Your Shelves</h2>
          <ShelfAdd {...{ setShelfName, isHover }} />
        </div>
        <ul className="flex flex-col gap-2">
          {data.map((shelf: Shelf) => {
            if (shelf.isDefault)
              return (
                <ShelfMenuItem
                  key={shelf.name}
                  name={shelf.name}
                  count={shelf["_count"].books}
                  shelfName={shelfName}
                  setShelfName={setShelfName}
                  showDelete={false}
                  isHover={isHover}
                />
              );
          })}
          <div className="py-6 px-3">
            <hr className="border-t-2 border-secondary" />
          </div>
          {data.map((shelf: Shelf) => {
            if (!shelf.isDefault)
              return (
                <ShelfMenuItem
                  key={shelf.name}
                  name={shelf.name}
                  count={shelf["_count"].books}
                  shelfName={shelfName}
                  setShelfName={setShelfName}
                  showDelete={true}
                  isHover={isHover}
                />
              );
          })}
        </ul>
      </div>
      <button className="text-2xl font-semibold" onClick={() => signOut()}>
        Sign out
      </button>
    </aside>
  );
};

export default ShelfMenuSidebar;
