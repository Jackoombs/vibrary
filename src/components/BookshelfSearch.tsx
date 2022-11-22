import { useState } from "react"
import { type BookType } from "../types/book"
import Book from "./Book"
import BookAddBtn from "./BookAddBtn"

interface Props {
  query: string
  books: BookType[]
  initialIndex: number | undefined
  alwaysDisplay: boolean
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>
  setBooks: React.Dispatch<React.SetStateAction<BookType[]>>
  shelfName: string
}

function BookshelfSearch({ query, books, shelfName, initialIndex, alwaysDisplay, setSearchActive, setBooks }: Props) {

  const [activeIndex, setActiveIndex] = useState(initialIndex)

  return (
    <div className="flex flex-col pt-10">
      <h2 className="text-4xl font-medium">Searching for: {query}</h2>
      <div className='grid grid-cols-5 pt-20'>
        {books.map(({title, author, id, imageSrc, publicationDate, pageCount, spineColor, titleColor}, index) => (
          <div key={index} className="flex flex-col items-center" >
            <Book {...{title, author, id, imageSrc, spineColor, titleColor, index, activeIndex, setActiveIndex, alwaysDisplay}} />
            <BookAddBtn {...{ title, author, id, imageSrc, publicationDate, pageCount, spineColor, titleColor, setSearchActive, setBooks, shelfName}} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookshelfSearch