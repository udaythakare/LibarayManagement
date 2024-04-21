'use client'
import React, { useState } from 'react';
import IssuedBookList from './IssuedBookList';
import { handleIssueBookAction } from '@/actions/studentAction';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter()
    const [bookId, setBookId] = useState(null)
    const [issueMessage, setIssueMessage] = useState(null)


    const [bookData, setBookData] = useState(null);
    const [studentData, setStudentData] = useState(null)
    const [studentMessage, setStudentMessage] = useState(null)
    const [modal, setModal] = useState(false)
    const [id, setId] = useState(null)
    const [showIssuedComp, setShowIssuedComp] = useState(false)
    const handleFetchStudentId = async () => {
        console.log(id)
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_NAME + `getStudentInfo?studentId=${id}`)
        const data = await res.json()
        console.log(data)
        setStudentData(data)
        setShowIssuedComp(true)
    }


    const handleIssueBook = async () => {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/issueBook?studentId=${id}&bookId=${bookId}`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'credentials': 'include'
        //     }
        // });
        const res = await handleIssueBookAction(bookId,id)
        setId(id)
        router.refresh()
        // const data = await res.text();
        setIssueMessage(res);
    }

    return (
        <>
            <div className='text-white flex items-center'>
                <input type="text" className="mr-2 px-2 py-1 border border-gray-300 rounded" placeholder='Enter student ID' onChange={(e) => setId(e.target.value)} />
                <input type="button" className="px-4 py-2 bg-blue-500 text-white rounded" value="Search" onClick={handleFetchStudentId} />
            </div>

            <div className='text-white flex justify-start ml-32 mt-10'>
                {studentData && (
                    <>
                        <div className="mb-8">
                            <div className="text-left mb-4">
                                <p className="font-bold">Student ID: {studentData[0].id}</p>
                            </div>
                            <div className="text-left mb-4">
                                <p className="font-bold">Name : {studentData[0].name}</p>
                            </div>
                            <div className="text-left mb-4">
                                <p className="font-bold">Branch : {studentData[0].branch}</p>
                            </div>
                            <div className="text-left mb-4">
                                <p className="font-bold">Gender : {studentData[0].gender}</p>
                            </div>
                            <div className="text-left mb-4">
                                <p className="font-bold">Year : {studentData[0].year}</p>
                            </div>

                            <button onClick={() => setModal(true)} >Issue Book +</button>

                            <dialog open={modal} className="fixed inset-0 z-10 overflow-y-auto h-96">
                                <div className="flex items-center justify-center h-full">
                                    <div className="bg-white p-4 rounded shadow-md relative">
                                        <button className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded" onClick={() => setModal(false)}>x</button>
                                        {issueMessage && (issueMessage)}
                                        <input type="text" className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded" placeholder='Enter book ID' onChange={(e) => setBookId(e.target.value)} />
                                        <input type="text" className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded" value={id} placeholder='Enter student ID' />
                                        <button className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleIssueBook}>Issue</button>
                                    </div>
                                </div>
                            </dialog>



                        </div>


                    </>
                )}
            </div>


            <div className='text-white' >
                {showIssuedComp && (
                    <IssuedBookList student_id={id} />
                )}
            </div>


        </>
    );
}

export default Page;
