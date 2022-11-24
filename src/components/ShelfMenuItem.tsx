import clsx from "clsx"

interface Props {
  name: string
  count: number
  shelfName: string
  setShelfName: React.Dispatch<React.SetStateAction<string>>
}

const ShelfMenuItem = ({ name, count, shelfName, setShelfName }: Props) => {

  return(
    <li 
      className={clsx("z-10 relative py-1 ml-3 px-3 w-max rounded-lg duration-150",
      shelfName === name ? "text-primary cursor-default" : "cursor-pointer text-secondary",
      "hover:text-primary hover:bg-secondary"
      )}
      onClick={() => setShelfName(name)} 
    >
      <div 
        className={clsx("-z-10 absolute top-0 right-0 w-[180%] h-full rounded-lg bg-secondary hover:block",
        shelfName === name ? "block" : "hidden")}>
      </div>
      <p>{name} ({count})</p>
    </li>
  )
}

export default ShelfMenuItem