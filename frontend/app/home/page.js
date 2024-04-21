import React from 'react'
import Link from 'next/link'

const Page = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen text-white'>
            <Link href={'/home/manage-books'} className=' m-6 w-64 h-16 flex items-center justify-center bg-blue-500 rounded-lg'>
                Manage Books
            </Link>
            <Link href={'/home/manage-students'} className=' m-6 w-64 h-16 flex items-center justify-center bg-blue-500 rounded-lg'>

                Manage Students
            </Link>
            <Link href={'/home/manage-entry'} className='m-6 w-64 h-16 flex items-center justify-center bg-blue-500 rounded-lg'>
                Student Entry
            </Link>
            <Link href={'/home/issue-book'} className='m-6 w-64 h-16 flex items-center justify-center bg-blue-500 rounded-lg'>
                Issue Book
            </Link>
            <Link href={'/home/see-issued'} className='m-6 w-64 h-16 flex items-center justify-center bg-blue-500 rounded-lg'>
                See Issued Book
            </Link>
        </div>
    )
}

export default Page
