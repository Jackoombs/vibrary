import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";



const Home: NextPage = () => {

  return (
    <>
        <h1 className="font-sans text-6xl font-medium">Vibrary</h1>
        <main>
        </main>
    </>
  );
};

export default Home;

