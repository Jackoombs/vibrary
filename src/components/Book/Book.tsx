import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { BookDelete } from "./BookDelete";
import { BookEdit } from "./BookEdit";
import { HiCheck } from "react-icons/hi";
import { trpc } from "../../utils/trpc";

interface Props {
  title: string;
  author?: string | undefined | null;
  id: string;
  imageSrc: string;
  spineColor: string;
  titleColor: string;
  read: boolean;

  index: number;
  activeIndex: number | undefined;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number | undefined>>;
  alwaysDisplay?: boolean;
  showButtonOptions?: boolean;
  className?: string;
}

const Book = ({
  title,
  id,
  author,
  imageSrc,
  spineColor,
  titleColor,
  index,
  read,
  activeIndex,
  setActiveIndex,
  alwaysDisplay,
  showButtonOptions = false,
  className,
}: Props) => {
  const [hover, setHover] = useState(false);
  const [isRead, setIsRead] = useState(read);
  const utils = trpc.useContext();

  const rotateIndex = () => {
    return index === activeIndex || activeIndex === undefined ? true : false;
  };

  const handleClick = () => {
    if (alwaysDisplay || !setActiveIndex) return;
    setActiveIndex(rotateIndex() ? -1 : index);
  };

  const updateRead = trpc.book.updateRead.useMutation({
    async onSuccess() {
      utils.book.invalidate();
      utils.shelf.invalidate();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleChange = () => {
    setIsRead((curr) => !curr);
    console.log(isRead);
    updateRead.mutate({ read: !isRead, id });
  };

  return (
    <>
      <motion.div
        className={clsx("flex", className)}
        animate={{ minWidth: rotateIndex() ? "206px" : "56px" }}
        transition={{ duration: 0.2, delay: index === activeIndex ? 0 : 0.1 }}
        style={{ minWidth: "56px" }}
      >
        <div
          onClick={handleClick}
          onPointerOver={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          style={{ perspective: "1000px" }}
          className="perspective relative flex h-60 w-0 cursor-pointer"
        >
          {/* <div 
          style={index === activeIndex? {transform:  "translateZ(-48.5px) translateX(28px) rotateY(-150deg)"  } : {transform:"translateZ(0) translateX(0) rotateY(-90deg)", }} 
          className="duration-500 absolute -left-[216px] w-40 h-60 bg-teal-800 border border-black origin-right">
        </div> */}
          <svg className="invisible absolute inset-0 w-min">
            <defs>
              <filter id="paper" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.9"
                  numOctaves="8"
                  result="noise"
                />
                <feDiffuseLighting
                  in="noise"
                  lightingColor="white"
                  surfaceScale="1"
                  result="diffLight"
                >
                  <feDistantLight azimuth="45" elevation="35" />
                </feDiffuseLighting>
              </filter>
            </defs>
          </svg>

          <div
            style={{
              backgroundColor: spineColor,
              transform: rotateIndex() ? "rotateY(-60deg)" : "rotateY(0deg)",
            }}
            className={clsx(
              "absolute z-10 flex h-60 w-14 origin-right justify-center rounded-md brightness-[0.8] contrast-[1.75] duration-500",
              `bg-[${spineColor}]`
            )}
          >
            <p
              className={clsx(
                "text-smb py-3 font-semibold line-clamp-2",
                `text-[${titleColor}]`
              )}
              style={{ color: titleColor, writingMode: "sideways-rl" }}
            >
              {title}
            </p>
            <span
              aria-hidden
              className="pointer-events-none fixed top-0 right-0 z-50 h-full w-full opacity-40 [filter:url(#paper)]"
            />
          </div>
          <div
            style={{
              transform: rotateIndex() ? "rotateY(30deg)" : "rotateY(90deg)",
            }}
            className="absolute left-14 h-60 w-40 origin-left brightness-[0.8] contrast-[1.75] duration-500"
          >
            {(!hover || !alwaysDisplay) && (
              <img
                className="pointer-events-none relative z-20 h-60 w-40 object-cover"
                src={imageSrc}
                style={{ objectFit: "cover" }}
                sizes="160px 240px"
                alt=""
              />
            )}
            <div className="absolute left-0 top-0 flex h-60 w-40 flex-col justify-between bg-gray-900 p-2 pl-4 text-slate-50 ">
              <p className="text-ellipsis text-lg line-clamp-6">{title}</p>
              <p className="text-md text-ellipsis line-clamp-1">{author}</p>
            </div>
            <span
              aria-hidden
              className="pointer-events-none fixed top-0 right-0 z-50 h-full w-full opacity-40 [filter:url(#paper)]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 z-50 h-full w-full"
              style={{
                background: `linear-gradient(to right, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.25) 4px, rgba(255, 255, 255, 0.25) 6px, transparent 7px, transparent 9px, rgba(255, 255, 255, 0.25) 9px, transparent 12px)`,
              }}
            />
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showButtonOptions && index === activeIndex && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex w-3/5 justify-center gap-3"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <input
                className={clsx(
                  "h-full w-full cursor-pointer appearance-none rounded-lg border border-primary ",
                  isRead ? "bg-primary" : "bg-secondary"
                )}
                type="checkbox"
                checked={isRead}
                onChange={handleChange}
              />
              <HiCheck
                className={clsx(
                  "pointer-events-none absolute text-2xl",
                  isRead ? "text-secondary" : "text-primary"
                )}
              />
            </div>
            <BookEdit
              {...{ id, title, author, imageSrc, spineColor, titleColor }}
            />
            <BookDelete {...{ id, title }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Book;
