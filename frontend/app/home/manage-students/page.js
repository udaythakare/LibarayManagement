import React from 'react'
// import AddBooks from './AddStudents'
// import { getBooks } from '@/actions/getBooks'
// import DeleteBookButton from './DeleteBookButton'
// import EditBook from './EditBook'
import AddStudents from './AddStudents'
import { getStudents } from '@/actions/studentAction'
import DeleteStudentButton from './DeleteStudent'
// import Addbook from './AddSection'
// import { getSections } from '@/actions/sectionActions/section'
// import DeleteSectionButton from './DeleteSectionButton'
// import Image from 'next/image'
// import EditSection from './EditSection'

const page = async () => {
    const students = await getStudents()
    // console.log(books)
    return (
        <div className='z-50'>
            <div className='flex justify-between items-center p-4'>
                <h2 className="text-lg text-slate-200 text-left">Library Management</h2>
                <AddStudents />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 p-5 w-full">
                {students.map((student, index) => (
                    <div key={index} className="box-border border border-slate-600 hover:border-slate-400 p-2 rounded-lg relative flex justify-between items-center w-full px-6" >

                        <div className='w-1/2'>
                            <p className="text-lg capitalize text-slate-200"> Student Library ID : {student.id}</p>
                            <p className="text-lg capitalize text-slate-200">{student.name}</p>
                            <p className="text-lg capitalize text-slate-200"> Gender : {student.gender}</p>
                            <p className="text-lg capitalize text-slate-200"> Year : {student.year}</p>
                            <p className='text-lg capitalize text-slate-200'> Brach : {student.branch}</p>


                        </div>

                        <div className='box-border flex items-center justify-end gap-2 w-1/4'>
                            <DeleteStudentButton studentId={student.id} />
                        </div>


                    </div>
                ))}
            </div>

        </div>
    )
}

export default page
