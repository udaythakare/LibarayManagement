import { handleReturnBook } from '@/actions/studentAction'
import React, { useEffect, useState } from 'react'

const IssuedBookList = ({ student_id, setShowIssuedComp }) => {
    const [message, setMessage] = useState(null)
    const [data, setData] = useState(null)
    useEffect(() => {
        const handleFetchIssuedBook = async () => {
            if (student_id === "") {
                return
            }
            const res = await fetch(process.env.NEXT_PUBLIC_SERVER_NAME + `fetchIssuedBooks?studentId=${student_id}`)
            const data = await res.json()
            console.log(data)
            if (data.message) {
                setMessage(data.message)
                return
            }
            setData(data)
        }
        handleFetchIssuedBook()
    }, [student_id])

    const handleBtnClick = async (book_id) => {
        const res = await handleReturnBook(student_id, book_id)
        alert(res)
    }
    return (
        <div>
            {message ? (message) : (
                data && (
                    <table className="border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-200 px-4 py-2">Name</th>
                                <th className="border border-gray-200 px-4 py-2">Book ID</th>
                                <th className="border border-gray-200 px-4 py-2">Issue Date</th>
                                <th className="border border-gray-200 px-4 py-2">Return Date</th>
                                <th className="border border-gray-200 px-4 py-2">Description</th>
                                <th className="border border-gray-200 px-4 py-2">Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, index) => (
                                <tr key={index} className="border border-gray-200">
                                    <td className="border border-gray-200 px-4 py-2">{d.name}</td>
                                    <td className="border border-gray-200 px-4 py-2">{d.book_id}</td>
                                    <td className="border border-gray-200 px-4 py-2">{d.issue_date}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {!d.return_date ? (
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleBtnClick(d.book_id)}>Returned</button>
                                        ) : (
                                            d.return_date
                                        )}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">{d.description}</td>
                                    <td className="border border-gray-200 px-4 py-2">{d.author}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );

}

export default IssuedBookList
