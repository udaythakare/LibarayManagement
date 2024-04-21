'use client'
import React from 'react'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { loginAdmin } from '@/actions/loginActions/login'
import { useRouter } from 'next/navigation'


const initialState = {
    message: null
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type='submit' className={`bg-blue-400 ${pending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
            Login
        </button>
    )
}


const LoginForm = () => {
    const router = useRouter()
    const [state, formAction] = useFormState(loginAdmin, initialState)
    return (
        <div className="flex justify-center items-center h-screen">
            <form action={formAction} className="bg-white shadow-md rounded px-10 pt-8 pb-10 mb-4 w-96">
                <div>
                    {state?.message === "Login Successfull" ? router.push("/home/manage-books") : state?.message}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <SubmitButton />
                </div>
            </form>

        </div>
    )
}

export default LoginForm
