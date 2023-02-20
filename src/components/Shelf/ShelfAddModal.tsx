import { useState } from "react";
import { trpc } from "../../utils/trpc";

interface Props {
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShelfName: React.Dispatch<React.SetStateAction<string>>;
}

const ShelfAddModal = ({ setAddModalOpen, setShelfName }: Props) => {
  const [name, setName] = useState("");
  const utils = trpc.useContext();

  const addShelf = trpc.shelf.add.useMutation({
    async onSuccess() {
      setAddModalOpen(false);
      setShelfName(name);
      utils.shelf.getShelf.invalidate();
      utils.shelf.getNameList.invalidate();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addShelf.mutate({ name });
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="l relative w-full transform overflow-hidden rounded-lg bg-secondary text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col bg-secondary text-primary"
              >
                <h3 className="text-2xl font-medium">Your New shelf</h3>
                <input
                  className="my-8 w-3/4 self-center rounded-full border-2 border-primary bg-white px-2 py-[2px] text-center text-lg font-semibold text-primary focus:border-red-700 focus:outline-none"
                  name="title"
                  type="text"
                  placeholder="Enter shelf name."
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
                <div className="flex w-full justify-center gap-2 self-center">
                  <button
                    className="w-1/4 rounded-lg border-2 border-primary py-1 font-semibold duration-150 hover:bg-primary hover:text-secondary "
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-1/4 rounded-lg border-2 border-primary py-1 font-semibold duration-150 hover:bg-primary hover:text-secondary"
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelfAddModal;
