import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type NextFontWithVariable } from "@next/font/dist/types";
import { Montserrat, Space_Grotesk } from "@next/font/google";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import clsx from "clsx";

const montserrat: NextFontWithVariable = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const space: NextFontWithVariable = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div
        id="root"
        className={clsx(
          montserrat.variable,
          space.variable,
          "min-h-[100svh] bg-secondary font-sans text-primary"
        )}
      >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
