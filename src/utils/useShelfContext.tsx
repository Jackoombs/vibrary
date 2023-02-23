import { useContext } from "react";
import { ShelfContext } from "../pages";

export const useShelfContext = () => {
  const shelfContext = useContext(ShelfContext);

  if (!shelfContext) {
    throw new Error(
      "useShelfContext has to be used within <ShelfContext.Provider>"
    );
  }
  return shelfContext;
};
