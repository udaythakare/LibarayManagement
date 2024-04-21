'use client'
import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Image from 'next/image'
import { editBook } from '@/actions/editBooks'

const initialState = {
    message: null,
    bookId: 0,
}

const EditBook = ({ book_quantity, book_name, book_description, book_id, book_author }) => {
    console.log('thsi is book id', book_id)
    const [modal, setModal] = useState(false)
    return (
        <div className="">
            <button onClick={() => setModal(true)} className="w-full flex items-center gap-2 text-sm text-slate-200 py-2 px-2 rounded border border-slate-500 hover:border-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="CurrentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>

            </button>
            {modal && (
                <dialog open={modal} className='flex justify-center items-center z-10'>
                    <EditBookForm setModal={setModal} book_quantity={book_quantity} book_name={book_name} book_description={book_description} book_id={book_id} book_author={book_author} />
                </dialog>
            )}
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type='submit' className={`bg-blue-400 ${pending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
            Submit
        </button>
    )
}

const EditBookForm = ({ setModal, book_quantity, book_name, book_description, book_id, book_author }) => {
    const [state, formAction] = useFormState(editBook, initialState)
    // state.bookId = book_id
    return (
        <div className=' w-64 p-4 bg-white shadow-md rounded-lg'>
            <button
                className="absolute top-0 right-0 bg-slate-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setModal(false)}
            >
                x
            </button>
            {state?.message === "Book Edited Successfully" ? setModal(false) : state?.message}

            <form className="mt-4" action={formAction}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book">
                        book Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="book"
                        type="text"
                        name='book'
                        placeholder="Enter book name"
                        defaultValue={book_name}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="book_description"
                        type="text"
                        name='book_description'
                        placeholder="Enter book description"
                        defaultValue={book_description}
                    />

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="book_quantity"
                        type="text"
                        name='book_quantity'
                        placeholder="Enter book quantity"
                        defaultValue={book_quantity}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="book_author"
                        type="text"
                        name='book_author'
                        placeholder="Enter book author"
                        defaultValue={book_author}
                    />


                    <input type="hidden" name="book_id" value={book_id} />


                </div>
                <SubmitButton />
            </form>

        </div>
    );
}

export default EditBook
