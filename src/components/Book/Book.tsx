import { motion } from "framer-motion"
import Image from "next/image"
import clsx from "clsx"
import { useState } from "react"

interface Props {
  title: string
  author?: string | undefined | null
  id: number | string
  imageSrc: string
  spineColor: string
  titleColor: string

  index: number
  activeIndex: number | undefined
  setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>
  alwaysDisplay?: boolean
}

const Book = ({ title, author, imageSrc, spineColor, titleColor, index, activeIndex, setActiveIndex, alwaysDisplay  }: Props) => {

  const [hover, setHover] = useState(false)
  
  const rotateIndex = () => {
    return index === activeIndex || activeIndex === undefined ? true : false
  }

  const handleClick = () => {
    if (alwaysDisplay) return
    setActiveIndex(rotateIndex() ? -1 : index)
  }

  return (
    <motion.div 
      className="flex"
      animate={{minWidth: rotateIndex() ? "206px": "56px"}} 
      transition={{duration: 0.2, delay: index === activeIndex ? 0 : 0.1}}
      style={{minWidth: "56px"}}
    >
      
      <div 
        onClick={handleClick} 
        onPointerOver={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        style={{perspective: "1000px"}} 
        className="w-0 flex h-60 relative perspective cursor-pointer">

        {/* <div 
          style={index === activeIndex? {transform:  "translateZ(-48.5px) translateX(28px) rotateY(-150deg)"  } : {transform:"translateZ(0) translateX(0) rotateY(-90deg)", }} 
          className="duration-500 absolute -left-[216px] w-40 h-60 bg-teal-800 border border-black origin-right">
        </div> */}
      <svg className="invisible absolute inset-0">
        <defs>
          <filter id="paper" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="8" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1" result="diffLight">
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>

        <div 
          style={{ backgroundColor: spineColor, transform: rotateIndex() ?  "rotateY(-60deg)" : "rotateY(0deg)" }} 
          className={clsx("z-10 duration-500 absolute w-14 h-60 origin-right flex justify-center brightness-[0.8] contrast-[1.5]", `bg-[${spineColor}]`)}>
          <p className={clsx("py-3 text-smb font-semibold line-clamp-2", `text-[${titleColor}]`)} style={{color: titleColor, writingMode: "sideways-rl" }}>{title}</p>
          <span
              aria-hidden
              className="pointer-events-none fixed top-0 right-0 z-50 h-full w-full opacity-40 [filter:url(#paper)]"
          />
        </div>
        <div 
          style={{ transform: rotateIndex() ? "rotateY(30deg)" : "rotateY(90deg)" }} 
          className="duration-500 absolute left-14 w-40 h-60 origin-left brightness-[0.8] contrast-[1.75]">
          {(!hover || !alwaysDisplay) && 
          <Image className="pointer-events-none w-40 h-60" src={imageSrc} fill={true} style={{objectFit: "cover"}} sizes="160px 240px" alt="" />}
          <div 
            className="w-40 h-60 z-20 pl-4 p-2 bg-gray-900 text-slate-50 flex flex-col justify-between ">
            <p className="text-lg text-ellipsis line-clamp-6">{title}</p>
            <p className="text-md line-clamp-1 text-ellipsis">{author}</p>
          </div>
          <span
              aria-hidden
              className="pointer-events-none fixed top-0 right-0 z-50 h-full w-full opacity-40 [filter:url(#paper)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-50 h-full w-full"
            style={{
              background: `linear-gradient(to right, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.25) 4px, rgba(255, 255, 255, 0.25) 6px, transparent 7px, transparent 9px, rgba(255, 255, 255, 0.25) 9px, transparent 12px)`,}}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Book