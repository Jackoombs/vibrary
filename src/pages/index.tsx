import { useState } from "react";
import { type NextPage } from "next";
import { getSession } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import { ShelfMenuBtn } from "../components/Shelf/ShelfMenuBtn";
import ShelfMenuSidebar from "../components/Shelf/ShelfMenuSidebar";
import BookSearch from "../components/Book/BookSearch";
import { Bookcase } from "../components/Book/Bookcase";
import { createContext } from "react";
import { stubObject } from "lodash";

export type Shelf = {
  shelfName: string;
  setShelfName: React.Dispatch<React.SetStateAction<string>>;
};

export const ShelfContext = createContext<Shelf | null>(null);

const Home: NextPage = () => {
  const [shelfName, setShelfName] = useState("All Books");
  const [shelfMenuOpen, setShelfMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  return (
    <ShelfContext.Provider value={{ shelfName, setShelfName }}>
      <div className="mx-auto">
        <div className="flex justify-between">
          <ShelfMenuSidebar
            className="hidden lg:flex"
            {...{ shelfName, setShelfName }}
          />
          {shelfMenuOpen && (
            <ShelfMenuSidebar
              className="fixed lg:hidden"
              {...{ shelfName, setShelfName, setShelfMenuOpen }}
            />
          )}
          <div className="w-full overflow-visible px-4 py-6 lg:py-10 xl:px-12">
            <main className="flex w-full flex-col gap-5 overflow-visible lg:gap-8">
              <ShelfMenuBtn {...{ shelfMenuOpen, setShelfMenuOpen }} />
              <BookSearch
                shelfName={shelfName}
                setSearchActive={setSearchActive}
              />
              {!searchActive && (
                <h2 className="w-full text-4xl font-medium">{shelfName}</h2>
              )}

              <Bookcase {...{ shelfName, searchActive }} />
            </main>
          </div>
        </div>
      </div>
    </ShelfContext.Provider>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
