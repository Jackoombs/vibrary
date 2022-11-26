import { useState } from "react"
import { trpc } from "../../utils/trpc"

interface Props {
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setShelfName: React.Dispatch<React.SetStateAction<string>>
}

const ShelfAddModal = ({ setAddModalOpen, setShelfName }: Props) => {

  const [name, setName] = useState("")
  const utils = trpc.useContext()

  const addShelf = trpc.shelf.add.useMutation({
    async onSuccess() {
      setAddModalOpen(false)
      setShelfName(name)
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
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden w-full rounded-lg bg-secondary text-left shadow-xl transition-all sm:my-8 l sm:max-w-lg">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <form onSubmit={handleSubmit} className="flex flex-col bg-secondary text-primary">
                <h3 className="text-2xl font-medium">Your New shelf</h3>
                <input 
                  className="w-3/4 self-center bg-white text-center text-lg text-primary font-semibold border-2 border-primary px-2 py-[2px] my-8 rounded-full focus:outline-none focus:border-red-700"
                  name="title" 
                  type="text" 
                  placeholder="Enter shelf name."
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
                <div className="flex justify-center w-full self-center gap-2">
                  <button 
                    className="w-1/4 py-1 border-2 border-primary rounded-lg font-semibold duration-150 hover:bg-primary hover:text-secondary "
                    type="button"
                    onClick={() => setAddModalOpen(false)}>
                    Cancel
                  </button>
                  <button
                    className="w-1/4 py-1 border-2 border-primary rounded-lg font-semibold duration-150 hover:bg-primary hover:text-secondary"
                    type="submit">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShelfAddModal