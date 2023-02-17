import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { trpc } from "../../utils/trpc";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { HexColorPicker, HexColorInput } from "react-colorful";
import Book from "./Book";

interface Props {
  title: string;
  author?: string | undefined | null;
  id: string;
  imageSrc: string;
  spineColor: string;
  titleColor: string;
}

export const BookEdit = ({
  title,
  author,
  id,
  imageSrc,
  spineColor,
  titleColor,
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);
  const utils = trpc.useContext();

  const bookSchema = z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    spineColor: z.string(),
    titleColor: z.string(),
    imageSrc: z.string(),
  });
  type BookSchema = z.infer<typeof bookSchema>;

  const { register, watch, handleSubmit, control } = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: { id, spineColor, titleColor, title, imageSrc },
  });

  const updateBook = trpc.book.update.useMutation({
    async onSuccess() {
      utils.book.invalidate();
      utils.shelf.invalidate();
    },
    onError(error) {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<BookSchema> = (data) => {
    updateBook.mutate(data);
    setModalOpen(false);
  };

  const watchData = watch();

  return (
    <>
      <button
        className="b flex h-8 w-full cursor-pointer items-center justify-center rounded-lg bg-primary text-2xl text-secondary duration-150 hover:bg-secondary hover:text-primary"
        onClick={() => setModalOpen(true)}
      >
        <MdEdit />
      </button>
      {modalOpen && (
        <Modal>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="flex flex-col gap-6"
          >
            <h2 className="text-center text-xl font-semibold text-secondary">
              {title}
            </h2>
            <div className="grid grid-cols-2 grid-rows-[reapeat(4,auto)] gap-x-4 gap-y-4 sm:gap-x-6">
              <div className="flex flex-col gap-1">
                <label
                  className="text-xs font-medium tracking-widest text-secondary"
                  htmlFor="author"
                >
                  Author
                </label>
                <input
                  className="rounded-lg border-2 bg-secondary p-2 focus:border-red-500 focus:outline-none"
                  type="text"
                  {...register("author")}
                  defaultValue={author ? author : ""}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-xs font-medium tracking-widest text-secondary"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="rounded-lg border-2 bg-secondary p-2 focus:border-red-500 focus:outline-none"
                  type="text"
                  {...register("title")}
                  defaultValue={title}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <label
                  className="text-xs font-medium tracking-widest text-secondary"
                  htmlFor="imageSrc"
                >
                  Image Url
                </label>
                <input
                  className="rounded-lg border-2 bg-secondary p-2 focus:border-red-500 focus:outline-none"
                  type="text"
                  {...register("imageSrc")}
                  defaultValue={imageSrc}
                />
              </div>
              <Controller
                control={control}
                name="spineColor"
                defaultValue={spineColor}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs font-medium tracking-widest text-secondary"
                      htmlFor="spineColor"
                    >
                      Spine Color
                    </label>
                    <HexColorPicker
                      color={value}
                      style={{ width: "100%", height: "8rem" }}
                      {...{ onChange, value }}
                    />
                    <HexColorInput
                      defaultValue={spineColor}
                      className="rounded-lg border-2 bg-secondary p-2 focus:border-red-500 focus:outline-none"
                      color={value}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="titleColor"
                defaultValue={titleColor}
                render={({ field: { onChange, value } }) => (
                  <div className="row-start-4 flex flex-col gap-1">
                    <label
                      className="text-xs font-medium tracking-widest text-secondary"
                      htmlFor="titleColor"
                    >
                      Title Color
                    </label>
                    <HexColorPicker
                      color={value}
                      style={{ width: "100%", height: "8rem" }}
                      placeholder={titleColor}
                      {...{ onChange, value }}
                    />
                    <HexColorInput
                      defaultValue={titleColor}
                      className="rounded-lg border-2 bg-secondary p-2 focus:border-red-500 focus:outline-none"
                      color={value}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <div className="col-start-2 row-span-2 row-start-3 flex w-full items-center justify-center self-center rounded-lg bg-secondary sm:py-10">
                <Book
                  className="scale-75 sm:scale-100"
                  id={id}
                  imageSrc={imageSrc}
                  author={watchData.author}
                  title={watchData.title}
                  spineColor={watchData.spineColor}
                  titleColor={watchData.titleColor}
                  {...{ activeIndex, setActiveIndex }}
                  index={0}
                  read={true}
                />
              </div>
            </div>
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
