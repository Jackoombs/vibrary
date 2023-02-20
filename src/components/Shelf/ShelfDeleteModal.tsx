import { trpc } from "../../utils/trpc";

interface Props {
  shelfName: string;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<string>>;
  setShelfName: React.Dispatch<React.SetStateAction<string>>;
}

const ShelfDeleteModal = ({
  shelfName,
  setDeleteModalOpen,
  setShelfName,
}: Props) => {
  const utils = trpc.useContext();

  const deleteShelf = trpc.shelf.delete.useMutation({
    async onSuccess() {
      setDeleteModalOpen("");
      setShelfName("All Books");
      utils.shelf.getShelf.invalidate();
      utils.shelf.getNameList.invalidate();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleClick = () => {
    deleteShelf.mutate(shelfName);
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
              <div className="flex flex-col bg-secondary text-primary">
                <h3 className="text-2xl font-medium">Delete Shelf</h3>
                <p className="my-8 text-center text-lg font-medium">
                  Are you sure want to delete this shelf?
                </p>
                <div className="flex w-full justify-center gap-2 self-center">
                  <button
                    className="w-1/4 rounded-lg border-2 border-primary py-1 font-semibold duration-150 hover:bg-primary hover:text-secondary "
                    type="button"
                    onClick={() => setDeleteModalOpen("")}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-1/4 rounded-lg border-2 border-primary py-1 font-semibold duration-150 hover:bg-primary hover:text-secondary"
                    onClick={handleClick}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelfDeleteModal;
