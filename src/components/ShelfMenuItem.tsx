import clsx from "clsx"

interface Props {
  name: string
  count: number
  shelfName: string
  setShelfName: React.Dispatch<React.SetStateAction<string>>
}

const ShelfMenuItem = ({ name, count, shelfName, setShelfName }: Props) => {

  console.log(shelfName, name)
  return(
    <li 
      className={clsx("py-1 ml-3 px-3 w-max rounded-lg duration-150 hover:bg-stone-700 hover:text-rose-200",
      shelfName === name ? "bg-stone-700 text-rose-200 cursor-default" : "cursor-pointer"
      )}
      onClick={() => setShelfName(name)} 
    >
      {name} ({count})
    </li>
  )
}

export default ShelfMenuItem