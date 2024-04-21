import React from 'react'
import AddBooks from './AddBooks'
import { getBooks } from '@/actions/getBooks'
import DeleteBookButton from './DeleteBookButton'
import EditBook from './EditBook'
import ViewDetails from './ViewDetails'
// import Addbook from './AddSection'
// import { getSections } from '@/actions/sectionActions/section'
// import DeleteSectionButton from './DeleteSectionButton'
// import Image from 'next/image'
// import EditSection from './EditSection'

const page = async () => {
    const books = await getBooks()
    console.log(books)

    if (books.message) {
        return (
            <div>
                No Books
                <AddBooks />
            </div>
        )
    }
    return (
        <div className='z-50'>
            <div className='flex justify-between items-center p-4'>
                <h2 className="text-lg text-slate-200 text-left">Library Management</h2>
                <AddBooks />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 p-5 w-full">
                {books.map((book, index) => (
                    <div key={index} className="box-border border border-slate-600 hover:border-slate-400 p-2 rounded-lg relative flex justify-between items-center w-full px-6" >

                        <div className='w-1/2'>
                            <p className="text-lg capitalize text-slate-200">{book.name}</p>
                            <p className="text-lg capitalize text-slate-200"> Available Quantity : {book.total_books}</p>
                            <p className="text-lg capitalize text-slate-200"> Book Author : {book.author}</p>
                            {/* <p className='text-slate-400'>{book.description}</p> */}

                        </div>

                        <div className='box-border flex items-center justify-end gap-2 w-1/4'>
                            {/* <EditBook book_quantity={book.quantity} book_name={book.name} book_description={book.description} book_image={book.image} book_id={book.id} book_author={book.author} /> */}
                            <DeleteBookButton bookId={book.id} />
                            <ViewDetails book_author={book.author} book_name={book.name} />
                        </div>


                    </div>
                ))}
            </div>

        </div>
    )
}

export default page
