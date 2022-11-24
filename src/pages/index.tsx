import { type NextPage } from "next";
import { getSession } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import BookSearch from "../components/Book/BookSearch";
import BookShelf from "../components/Book/Bookshelf";
import ShelfMenuSidebar from "../components/ShelfMenuSidebar";
import { useState } from "react";

const Home: NextPage = () => {

 
  const [shelfName, setShelfName] = useState("All Books")

  return (
    <>
      <div className="mx-auto">
        <div className="flex justify-between">
          <ShelfMenuSidebar shelfName={shelfName} setShelfName={setShelfName} />
          <main className="max-w-[min(90%,_64rem)] mx-auto grow px-4">
            <BookShelf shelfName={shelfName} initialIndex={0} alwaysDisplay={false} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}