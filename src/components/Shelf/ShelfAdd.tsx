import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Modal } from "../ui/Modal";
import { GoPlus } from "react-icons/go";
import clsx from "clsx";
import { Button } from "../ui/Button";

interface Props {
  setShelfName: React.Dispatch<React.SetStateAction<string>>;
  isHover: boolean;
}

export const ShelfAdd = ({ setShelfName, isHover }: Props) => {
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const utils = trpc.useContext();

  const addShelf = trpc.shelf.add.useMutation({
    async onMutate(shelf) {
      await utils.shelf.getNameList.cancel();
      const prevList = utils.shelf.getNameList.getData();
      const newShelf = {
        name: shelf.name,
        isDefault: false,
        _count: { books: 0 },
      };
      utils.shelf.getNameList.setData(
        prevList ? [newShelf, ...prevList] : [newShelf]
      );
      setModalOpen(false);
      setShelfName(name);
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addShelf.mutate({ name });
  };

  return (
    <>
      <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md duration-150 hover:bg-secondary hover:text-primary">
        <GoPlus
          onClick={() => setModalOpen(true)}
          className={clsx(
            "duration-150",
            !isHover ? "opacity-0" : "opacity-100"
          )}
          size={25}
        />
      </button>
      {modalOpen && (
        <Modal>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h3 className="text-2xl font-medium text-white">Your New shelf</h3>
            <input
              className="my-8 w-3/4 self-center rounded-full border-2 border-primary bg-white px-2 py-[2px] text-center text-lg font-semibold text-primary focus:border-red-700 focus:outline-none"
              name="title"
              type="text"
              placeholder="Enter shelf name."
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <div className="flex w-full justify-center gap-2 self-center">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="secondary" type="submit">
                Add
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
