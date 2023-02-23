import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Modal } from "../ui/Modal";
import { ImBin } from "react-icons/im";
import clsx from "clsx";
import { Button } from "../ui/Button";

interface Props {
  name: string;
  isHover: boolean;
  setShelfName: React.Dispatch<React.SetStateAction<string>>;
}

export const ShelfDelete = ({ name, isHover, setShelfName }: Props) => {
  const utils = trpc.useContext();
  const [modalOpen, setModalOpen] = useState(false);

  const deleteShelf = trpc.shelf.delete.useMutation({
    async onMutate(shelf) {
      await utils.shelf.getNameList.cancel();
      const prevList = utils.shelf.getNameList.getData();
      const newList = prevList?.filter(({ name }) => name !== shelf);

      utils.shelf.getNameList.setData(newList);
      setModalOpen(false);
      return { prevList };
    },
    onError(err, oldShelf, ctx) {
      if (ctx?.prevList) {
        utils.shelf.getNameList.setData(ctx.prevList);
      }
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.shelf.getNameList.invalidate();
    },
  });

  const handleClick = () => {
    deleteShelf.mutate(name);
  };

  return (
    <>
      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg duration-150 hover:bg-secondary hover:text-primary"
        onClick={() => setModalOpen(true)}
      >
        <ImBin
          className={clsx(
            "duration-150",
            !isHover ? "opacity-0" : "opacity-100"
          )}
        />
      </button>
      {modalOpen && (
        <Modal>
          <div className="flex flex-col text-white">
            <h3 className="text-2xl font-medium">Delete Shelf</h3>
            <p className="my-8 text-center text-lg font-medium">
              Are you sure want to delete this shelf?
            </p>
            <div className="flex w-full justify-center gap-2 self-center">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={handleClick}>
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
