import { useCallback, useEffect, useState } from "react"
import { env } from "../env/client.mjs"
import BookShelf from "./BookshelfSearch"
import { debounce } from "lodash"
import { type BookType } from "../types/book.js"

interface Props {
  shelfName: string
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

const BookSearch = ({ shelfName, setSearchActive }: Props) => {

  interface Volume {
    id: string
    volumeInfo: VolumeInfo
  }

  interface VolumeInfo {
    title: string
    authors: string[] | undefined
    publishedDate?: string
    pageCount?: number
  }

  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<BookType[]>([])

  const formatQuery = (query: string) => {
    return query
      .toLowerCase()
      .trim()
      .replaceAll(" ", "_")
  }
 
  useEffect(() => {

    const URL = `https://www.googleapis.com/books/v1/volumes?key=${env.NEXT_PUBLIC_BOOKS_API_KEY}&maxResults=5&q=`

    const formatSearchResults = (volumes: Volume[]) => {
      return volumes.map((volume: Volume) => ({
        id: volume.id,
        title: volume.volumeInfo.title,
        author: volume.volumeInfo?.authors ? volume.volumeInfo?.authors[0] : undefined,
        imageSrc: `https://books.google.com/books/publisher/content/images/frontcover/${volume.id}?fife=w400-h600&source=gbs_api`,
        spineColor: "#0c4a6e" ,
        titleColor: "#FFFFFF",
        publicationDate: volume.volumeInfo.publishedDate,
        pageCount: volume.volumeInfo.pageCount
      }))
    }

    const getSearchResults = async (query: string) => {
      const formattedQuery = formatQuery(query)
      try {
        const res = await fetch(URL + formattedQuery)
        const data = await res.json()
        if (data.items) {
          console.log(data.items)
          setBooks(formatSearchResults(data.items))
          setSearchActive(true)
        } else {
          setBooks([])
          setSearchActive(false)
        }      
      } catch (error) {
        console.log(error)
        setBooks([])
      }
    }

    getSearchResults(query)
    // eslint-disable-next-line
  },[query])

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e?.target?.value)
  }

  // eslint-disable-next-line
  const debouncedChangeHandler = useCallback( 
    debounce(updateQuery, 300)
  ,[]) 

  return (
    <>
    <div className="flex justify-center items-center gap-4 px-8 py-3 rounded-full w-max mx-auto bg-slate-50 text-teal-900">
      <label htmlFor="title">Add a new title: </label>
      <input 
        className="bg-slate-50 border border-teal-900 p-2 rounded-full"
        name="title" 
        type="text" 
        onChange={debouncedChangeHandler}
        placeholder="eg. Moby Dick" 
      />
    </div>
    {books.length > 0 && <BookShelf query={query} books={books} setBooks={setBooks} shelfName={shelfName} setSearchActive={setSearchActive} initialIndex={undefined} alwaysDisplay={true}/>}
    </>
  )
}

export default BookSearch