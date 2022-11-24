import React, { useState } from "react"
import { trpc } from "../utils/trpc"
import { BiPlusMedical } from "react-icons/bi"
import clsx from "clsx"

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
      // <form onSubmit={handleSubmit} className="bg-primary">
      //   <div className="flex justify-center w-4/5">
      //     <input 
      //       className={clsx("w-44 block bg-secondary text-center outline-none rounded-l"
      //       , "placeholder:text-primary font-semibold")}
      //       type="text" 
      //       value={name} 
      //       onChange={(e) => setName(e.currentTarget.value)} 
      //       onBlur={() => setShowInput(false)}
      //       placeholder="Add a shelf"
      //       autoFocus={true}
      //       maxLength={50}
      //     />
      //       <button className="h-full w-8 border bg-primary" type="submit">
      //         <BiPlusMedical />
      //       </button>
      //   </div>
      // </form>

    <form onSubmit={handleSubmit} className="bg-transparent w-4/5 h-8 mx-auto flex justify-between rounded-l-lg rounded-r-lg mb-3">
      <input 
        className="bg-secondary w-full h-full blockitems-center text-primary rounded-l-lg px-2 outline-none placeholder:text-primary focus:border border focus:"
        type="text" 
        value={name} 
        onInput={(e) => setName(e.currentTarget.value)} 
        onBlur={() => setShowInput(false)}
        placeholder="Add a shelf"
        autoFocus={true}
        maxLength={50}
      />
      <button className="flex bg-blue-700 w-10 h-full rounded-r-lg">
        <BiPlusMedical className="m-auto"/>
      </button>
    </form>
  )
}

export default ShelfAddBtn