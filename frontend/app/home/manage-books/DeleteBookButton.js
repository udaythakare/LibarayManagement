"use client"
import { deleteBook } from '@/actions/deleteBook';
// import { deleteSection } from '@/actions/sectionActions/section';
import React from 'react'

const DeleteBookButton = ({ bookId }) => {

    const handleDeletion = () => {
        const ans = confirm("Are you sure you want to delete?");
        console.log(ans); // This will log true if OK is clicked, false if Cancel is clicked
        if (!ans) return

        deleteBook(bookId)
    };


    return (
        <button onClick={handleDeletion} className=" flex items-center gap-2 text-sm text-slate-200 py-2 px-2 rounded border border-slate-500 hover:border-slate-300">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="CurrentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
         
        </button>
    )
}

export default DeleteBookButton
