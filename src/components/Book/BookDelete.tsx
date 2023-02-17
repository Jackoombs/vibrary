import { useState } from "react";
import { ImBin } from "react-icons/im";
import { trpc } from "../../utils/trpc";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Text } from "../ui/Text";

interface Props {
  title: string;
  id: string;
}

export const BookDelete = ({ title, id }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const utils = trpc.useContext();

  const deleteBook = trpc.book.delete.useMutation({
    async onSuccess() {
      utils.book.invalidate();
      utils.shelf.invalidate();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteBook.mutate({ id });
    setModalOpen(false);
  };

  return (
    <>
      <button
        className="flex h-8 w-full cursor-pointer items-center justify-center rounded-lg bg-primary text-xl text-secondary duration-150 hover:bg-secondary hover:text-primary"
        onClick={() => setModalOpen(true)}
      >
        <ImBin />
      </button>
      {modalOpen && (
        <Modal>
          <form onSubmit={handleSubmit} action="">
            <h2 className="text-center text-xl font-semibold text-secondary">
              {title}
            </h2>
            <Text variant="secondary" size="text-sm" textCenter>
              Are you sure you want to remove this book?
            </Text>
            <div className="flex justify-center gap-2">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="secondary" type="submit">
                Confirm
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
