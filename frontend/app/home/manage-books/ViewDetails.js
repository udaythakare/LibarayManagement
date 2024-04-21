'use client'
import { getAllBooks } from '@/actions/getBooks';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const ViewDetails = ({ book_author, book_name }) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState(null)

    console.log(data, 'this is data')

    useEffect(() => {
        const handleStatus = async () => {
            const res = await getAllBooks(book_author, book_name)
            console.log(res)
            console.log('----------------------------------')
            setData(res)
        }
        handleStatus()
    }, [])

    return (
        <>
            <div className='text-white' onClick={() => setModal(true)}>
                view status
            </div>
            <Modal
                isOpen={modal}
                className='flex justify-center items-center z-10'
                style={{
                    overlay: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    content: {
                        width: '50%', // Set the width of the modal
                        height: '50%', // Set the height of the modal
                        margin: 'auto', // Center the modal horizontally
                        backgroundColor: 'white', // Background color
                        borderRadius: '8px', // Border radius
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Box shadow
                        outline: 'none', // Remove outline
                        padding: '20px', // Padding
                        overflow: 'auto', // Overflow
                        position: 'relative' // Set position to relative for button positioning
                        // You can add other CSS properties as needed
                    }
                }}
            >
                {data !== null && (
                    <>
                        <button
                            className="absolute top-0 right-0 mr-4 mt-4 bg-red-800 text-white px-4 py-2 rounded"
                            onClick={() => setModal(false)}
                        >
                            x
                        </button>
                        <table className="border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2">ID</th>
                                    <th className="border border-gray-200 px-4 py-2">Name</th>
                                    <th className="border border-gray-200 px-4 py-2">Author</th>
                                    <th className="border border-gray-200 px-4 py-2">Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((d, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-200 px-4 py-2">{d.id}</td>
                                        <td className="border border-gray-200 px-4 py-2">{d.name}</td>
                                        <td className="border border-gray-200 px-4 py-2">{d.author}</td>
                                        <td className="border border-gray-200 px-4 py-2">{d.isAvailable}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </Modal>

        </>
    );
}

export default ViewDetails;
