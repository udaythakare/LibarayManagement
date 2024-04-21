'use client'
import { addBooks } from '@/actions/addBooks'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'


const initialState = {
    message: null,
}

const AddBooks = () => {
    const [modal, setModal] = useState(false)
    return (
        <div className="flex">
            <button onClick={() => setModal(true)} className=" text-gray py-2 px-4 rounded border border-slate-600 hover:border-slate-400 flex items-center gap-2 text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                Add New Book
            </button>
            {modal && (
                <dialog open={modal} className='flex justify-center items-center z-10'>
                    <AddBooksForm setModal={setModal} />
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

const AddBooksForm = ({ setModal }) => {
    const [state, formAction] = useFormState(addBooks, initialState)
    return (
        <div className=' w-64 p-4 bg-white shadow-md rounded-lg'>
            <button
                className="absolute top-0 right-0 bg-slate-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setModal(false)}
            >
                x
            </button>
            {state?.message === "Book Added Successfully" ?
                setModal(false)
                :
                state.message
            }

            <form className="mt-4" action={formAction}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book">
                        Book Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="book"
                        type="text"
                        name='book'
                        placeholder="Enter book name"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="book_description"
                        type="text"
                        name='book_description'
                        placeholder="Enter book description"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="book_author"
                        placeholder='Enter book author'
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"    // Set the input type to "number" to accept only numbers
                        name="quantity"
                        placeholder='Enter book quantity available'
                        min="0"    // Optionally specify the minimum allowed value
                        max="1000" // Optionally specify the maximum allowed value
                        step="1"   // Optionally specify the increment value (default is 1)
                    />

                </div>
                <SubmitButton />
            </form>

        </div>
    );
};


export default AddBooks
