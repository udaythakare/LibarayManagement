'use client'
import { addStudent } from '@/actions/studentAction'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'


const initialState = {
    message: null,
    studentId: null,
    barcode: null
}

const AddStudents = () => {
    const [modal, setModal] = useState(false)
    return (
        <div className="flex">
            <button onClick={() => setModal(true)} className=" text-gray py-2 px-4 rounded border border-slate-600 hover:border-slate-400 flex items-center gap-2 text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                Add New Student
            </button>
            {modal && (
                <dialog open={modal} className='flex justify-center items-center z-10'>
                    <AddStudentsForm setModal={setModal} />
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

const AddStudentsForm = ({ setModal }) => {
    const [state, formAction] = useFormState(addStudent, initialState)
    return (
        <div className=' w-64 p-4 bg-white shadow-md rounded-lg'>
            <button
                className="absolute top-0 right-0 bg-slate-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setModal(false)}
            >
                x
            </button>
            {/* {state?.message === "Student Added Successfully" ? (
                <p className="text-green-600 font-semibold">{state.studentId}</p>
            ) : (
                <p className="text-red-600 font-semibold">{state.message}</p>
            )} */}

            {state.barcode && (
                <Image src={process.env.NEXT_PUBLIC_IMAGE + state.barcode + '.png'} width={200} height={200} alt='barcode' />
            )}

            <form className="mt-4" action={formAction}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Student Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name='name'
                        placeholder="Enter name name"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="branch"
                        type="text"
                        name='branch'
                        placeholder="Enter branch"
                    />
                    <select name='year' className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700">
                        <option value={'first year'}>first year</option>
                        <option value={'second year'}>second year</option>
                        <option value={'third year'}>third year</option>
                        <option value={'fourth year'}>fourth year</option>
                    </select>
                    <select name='gender' className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700">
                        <option value={'male'}>male</option>
                        <option value={'female'}>female</option>
                    </select>

                </div>
                <SubmitButton />
            </form>

        </div>
    );
};


export default AddStudents
