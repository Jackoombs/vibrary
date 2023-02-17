interface Props {
  setShelfMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShelfMenuBtn = ({ setShelfMenuOpen }: Props) => {
  return (
    <button className="lg:hidden" onClick={() => setShelfMenuOpen(true)}>
      <div className="flex h-10 w-10 origin-center flex-col items-center justify-center gap-2 duration-75 hover:gap-3 ">
        <span className="h-[3px] w-full bg-primary"></span>
        <span className="h-[3px] w-full bg-primary"></span>
        <span className="h-[3px] w-full bg-primary"></span>
      </div>
    </button>
  );
};
