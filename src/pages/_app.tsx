import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {type NextFontWithVariable } from "@next/font/dist/types";
import { IBM_Plex_Sans } from "@next/font/google"

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const ibm: NextFontWithVariable = IBM_Plex_Sans({
  weight : ["300", "400", "500", "600", "700"],
  variable: '--font-ibm',
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={ibm.variable}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
