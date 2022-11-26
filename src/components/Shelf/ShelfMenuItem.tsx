import clsx from "clsx"
import { ImBin } from "react-icons/im"

interface Props {
  name: string
  count: number
  shelfName: string
  showDelete: boolean
  setShelfName: React.Dispatch<React.SetStateAction<string>>
  isHover: boolean
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<string>>
}

const ShelfMenuItem = ({ name, count, shelfName, showDelete, setShelfName, setDeleteModalOpen, isHover }: Props) => {

  return(
    <li className="relative flex items-center justify-between">

      <p      
        className={clsx("z-10 relative flex items-center py-1 ml-3 px-3 w-max rounded-lg duration-150 text-ellipsis",
          shelfName === name ? "text-primary cursor-default" : "cursor-pointer text-secondary",
          "hover:text-primary hover:bg-secondary"
        )}
        onClick={() => setShelfName(name)}>
        {name} ({count})
        <div 
          className={clsx("-z-10 absolute top-0 right-0 w-[180%] h-full rounded-lg bg-secondary hover:block",
          shelfName === name ? "block" : "hidden")}>
        </div>
      </p>
      {( showDelete ) &&
        <button 
          className="flex items-center justify-center w-8 h-8 cursor-pointer rounded-full duration-150 hover:bg-secondary hover:text-primary"
          onClick={() => setDeleteModalOpen(name)}>
          <ImBin 
            className={clsx("duration-150", !isHover ? "opacity-0" : "opacity-100")} 
          />
        </button>}
    </li>
  )
}

export default ShelfMenuItem