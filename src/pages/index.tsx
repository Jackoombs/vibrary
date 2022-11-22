import { type NextPage } from "next";
import { getSession } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import BookSearch from "../components/BookSearch";
import BookShelf from "../components/Bookshelf";
import ShelfMenuSidebar from "../components/ShelfMenuSidebar";
import { useState } from "react";
import Header from "../components/Header";

const Home: NextPage = () => {

 
  const [shelfName, setShelfName] = useState("All Books")
  const [searchActive, setSearchActive] = useState(false)

  return (
    <>
      <div className="mx-auto">
        <Header />
        <div className="flex justify-between">
          <ShelfMenuSidebar shelfName={shelfName} setShelfName={setShelfName} />
          <main className="max-w-[min(90%,_64rem)] grow">
            <BookSearch shelfName={shelfName} setSearchActive={setSearchActive} />
            {!searchActive && <BookShelf shelfName={shelfName} initialIndex={0} alwaysDisplay={false} />}
          </main>
          <aside className="max-w-sm min-w-[280px] hidden lg:block">

          </aside>
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