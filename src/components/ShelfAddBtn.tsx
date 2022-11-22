import React, { useState } from "react"
import { trpc } from "../utils/trpc"
import { IoMdAddCircle } from "react-icons/io"

const ShelfAddBtn = () => {
  
  const [showInput, setShowInput] = useState(false)
  const [name, setName] = useState("")

  const utils = trpc.useContext()

  const addShelf = trpc.shelf.add.useMutation({
    async onSuccess() {
      setShowInput(false)
      setName("")
      utils.shelf.getShelf.invalidate()
      utils.shelf.getNameList.invalidate()
    },
    onError(error) {
      console.log(error)
    }
  });

  const handleSubmit= (e: React.SyntheticEvent) => {
    e.preventDefault()
    addShelf.mutate({name})
  }

  return (
    <div className="w-44 self-center">
      {showInput 
        ?<form onSubmit={handleSubmit} className="flex">
          <input 
            className="w-44 bg-transparent text-center py-1 outline-none border-b-2 border-stone-800"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.currentTarget.value)} 
            onBlur={() => setShowInput(false)}
            placeholder={name}
            autoFocus={true}
            maxLength={50}
          />
        </form>
        :<button 
          className="flex items-center justify-center gap-2 w-full py-1 rounded-lg text-rose-200 bg-stone-700"
          onClick={() => setShowInput(true)}>
          Add New Shelf <IoMdAddCircle size={18} />
        </button>}
    </div>
  )
}

export default ShelfAddBtn