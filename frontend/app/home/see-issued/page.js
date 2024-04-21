import { fetchAllIssuedBooks } from '@/actions/studentAction'
import React from 'react'

const page = async () => {
    const books = await fetchAllIssuedBooks()
    return (
        <div className='text-white'>
            {books.length > 0 && (
                <div>
                    <table className="table-auto border-collapse border border-white">
                        <thead>
                            <tr>
                                <th className="border border-white px-4 py-2">Book ID</th>
                                <th className="border border-white px-4 py-2">Name</th>
                                <th className="border border-white px-4 py-2">Author</th>
                                <th className="border border-white px-4 py-2">Issued Date</th>
                                <th className="border border-white px-4 py-2">Returned Date</th>
                                <th className="border border-white px-4 py-2">Student Name</th>
                                <th className="border border-white px-4 py-2">Student Branch</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={index}>
                                    <td className="border border-white px-4 py-2">{book.book_id}</td>
                                    <td className="border border-white px-4 py-2">{book.name}</td>
                                    <td className="border border-white px-4 py-2">{book.author}</td>
                                    <td className="border border-white px-4 py-2">{book.issued_date}</td>
                                    <td className="border border-white px-4 py-2">{book.returned_date}</td>
                                    <td className="border border-white px-4 py-2">{book.student_name}</td>
                                    <td className="border border-white px-4 py-2">{book.student_branch}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default page
