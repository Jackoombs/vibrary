import { useEffect, useState } from "react"
import Book from "../Book/Book"
import { trpc } from "../../utils/trpc"
import BookSearch from "./BookSearch"

interface Props {
  shelfName: string
  initialIndex: number | undefined
  alwaysDisplay: boolean
}

function BookShelf({ shelfName, initialIndex, alwaysDisplay }: Props) {

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [searchActive, setSearchActive] = useState(false)

  useEffect(() => {
    setActiveIndex(0)
  },[searchActive])

  const {data, isLoading, error} = trpc.shelf.getShelf.useQuery({name: `${shelfName}`})
  const books = data?.books

  if (error) return <h1>Error!</h1>

  return (
    <div className="flex flex-col pt-10">
      <h2 className="text-4xl font-medium w-full mb-3">{shelfName}</h2>
      <BookSearch shelfName={shelfName} setSearchActive={setSearchActive} />
      {!searchActive &&       
        <div className='flex justify-center gap-[1px] mx-auto pt-10'>
          {isLoading && "It's loading"}
          {data && books?.map(({title, author, id, imageSrc, spineColor, titleColor}, index) => (
              <div key={index} className="flex flex-col items-center" >
                <Book {...{title, author, id, imageSrc, spineColor, titleColor, index, activeIndex, setActiveIndex, alwaysDisplay}} />
              </div>
            ))}
          {(!isLoading && !books) && <h2>Use the search bar to find books to add to your shelf</h2>}
        </div>}
    </div>
  )
}

export default BookShelf