import { useState } from "react"
import { trpc } from "../utils/trpc"
import ShelfMenuItem from "./ShelfMenuItem"

interface Props {
  shelfName: string
  setShelfName: React.Dispatch<React.SetStateAction<string>>
}

const ShelfMenuSidebar = ({ shelfName, setShelfName }: Props) => {

  const [isHover, setIsHover] = useState(false)

  console.log(isHover)

  const { data, isLoading, error } = trpc.shelf.getNameList.useQuery()
  
  interface Shelf  {
    name: string
    isDefault: boolean
    _count: {
      books: number
    }
  }

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>Error!</h1>
  
  return (
    <aside 
      className="flex flex-col px-2 min-h-screen bg-primary text-secondary max-w-sm min-w-[280px] lg:px-4 xl:px-8"
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      >
      <h1 className="font-space text-7xl text-center font-light py-8">vibrary</h1>
      <h2 className="text-2xl font-medium pb-6">Your Shelves</h2>
      <ul className="flex flex-col gap-2">
        {data.map((shelf: Shelf) => {
          if (shelf.isDefault) return (
            <ShelfMenuItem 
              key={shelf.name}
              name={shelf.name} 
              count={shelf["_count"].books} 
              shelfName={shelfName}
              setShelfName={setShelfName} 
            />
          ) 
        })}

        <div className="py-6 px-3">
          <hr className="border-t-2 border-secondary"/>
        </div>

        {data.map((shelf: Shelf) => {
          if (!shelf.isDefault) return (
            <ShelfMenuItem 
              key={shelf.name}
              name={shelf.name} 
              count={shelf["_count"].books} 
              shelfName={shelfName}
              setShelfName={setShelfName} 
            />
          )
        })}
      </ul>
    </aside>
  )
}

export default ShelfMenuSidebar