import { useState } from "react"
import { trpc } from "../../utils/trpc"
import ShelfMenuItem from "./ShelfMenuItem"
import { GoPlus } from "react-icons/go"
import clsx from "clsx"
import ShelfAddModal from "./ShelfAddModal"
import ShelfDeleteModal from "./ShelfDeleteModal"

interface Props {
  shelfName: string
  setShelfName: React.Dispatch<React.SetStateAction<string>>
}

const ShelfMenuSidebar = ({ shelfName, setShelfName }: Props) => {

  const [isHover, setIsHover] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState("")

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
      className="flex flex-col px-8 min-h-screen md:static bg-primary text-secondary max-w-sm min-w-[280px]"
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      >
      <h1 className="font-space text-7xl text-center font-light py-8">vibrary</h1>
      <div className="flex justify-between items-center pb-6">
        <h2 className="text-2xl font-medium">Your Shelves</h2>
        <button className="flex items-center justify-center w-8 h-8 cursor-pointer rounded-full duration-150 hover:bg-secondary hover:text-primary">
          <GoPlus 
            onClick={() => setAddModalOpen(true)} 
            className={clsx("duration-150", !isHover ? "opacity-0" : "opacity-100")} 
            size={25}
          />
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {data.map((shelf: Shelf) => {
          if (shelf.isDefault) return (
            <ShelfMenuItem 
              key={shelf.name}
              name={shelf.name} 
              count={shelf["_count"].books} 
              shelfName={shelfName}
              setShelfName={setShelfName}
              showDelete={false}
              isHover={isHover} 
              setDeleteModalOpen={setDeleteModalOpen}
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
              showDelete={true}
              isHover={isHover} 
              setDeleteModalOpen={setDeleteModalOpen}
            />
          )
        })}
      </ul>
      { addModalOpen && <ShelfAddModal {...{setAddModalOpen, setShelfName}} /> }
      { deleteModalOpen && <ShelfDeleteModal shelfName={deleteModalOpen} {...{setDeleteModalOpen, setShelfName}} />}
    </aside>
  )
}

export default ShelfMenuSidebar