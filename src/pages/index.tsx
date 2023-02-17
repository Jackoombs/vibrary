import { useState } from "react";
import { type NextPage } from "next";
import { getSession } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import { ShelfMenuBtn } from "../components/Shelf/ShelfMenuBtn";
import ShelfMenuSidebar from "../components/Shelf/ShelfMenuSidebar";
import BookSearch from "../components/Book/BookSearch";
import { Bookcase } from "../components/Book/Bookcase";

const Home: NextPage = () => {
  const [shelfName, setShelfName] = useState("All Books");
  const [shelfMenuOpen, setShelfMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  return (
    <>
      <div className="mx-auto">
        <div className="flex justify-between">
          <ShelfMenuSidebar
            className="hidden lg:block"
            {...{ shelfName, setShelfName }}
          />
          {shelfMenuOpen && (
            <ShelfMenuSidebar
              className="fixed lg:hidden"
              {...{ shelfName, setShelfName, setShelfMenuOpen }}
            />
          )}
          <div className="w-full px-4 pt-6 lg:pt-10 xl:px-12 overflow-visible">
            <main className="flex w-full flex-col gap-5 overflow-visible lg:gap-8">
              <ShelfMenuBtn {...{ shelfMenuOpen, setShelfMenuOpen }} />
              <h2 className="w-full text-4xl font-medium">{shelfName}</h2>
              <BookSearch
                shelfName={shelfName}
                setSearchActive={setSearchActive}
              />
              <Bookcase booksPerShelf={4} {...{ shelfName, searchActive }} />
            </main>
          </div>
        </div>
      </div>
    </>
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
