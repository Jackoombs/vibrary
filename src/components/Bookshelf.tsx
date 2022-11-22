import { useState } from "react"
import Book from "./Book"
import { trpc } from "../utils/trpc"

interface Props {
  shelfName: string
  initialIndex: number | undefined
  alwaysDisplay: boolean
}

function BookShelf({ shelfName, initialIndex, alwaysDisplay }: Props) {

  const [activeIndex, setActiveIndex] = useState(initialIndex)

  const {data, isLoading, error} = trpc.shelf.getShelf.useQuery({name: `${shelfName}`})
  const books = data?.books

  if (error) return <h1>Error!</h1>

  return (
    <div className="flex flex-col pt-10">
      <h2 className="text-4xl font-medium w-full">{shelfName}</h2>
      <div className='flex justify-center gap-[1px] mx-auto pt-20'>
        {isLoading
        ?"It's loading"
        :books !== undefined
          ?books.map(({title, author, id, imageSrc, spineColor, titleColor}, index) => (
            <div key={index} className="flex flex-col items-center" >
              <Book {...{title, author, id, imageSrc, spineColor, titleColor, index, activeIndex, setActiveIndex, alwaysDisplay}} />
            </div>
          ))
          :<h2>Use the search bar to find books to add to your shelf</h2>
        }
      </div>
    </div>
  )
}

export default BookShelf