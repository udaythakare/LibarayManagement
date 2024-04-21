'use server'
import { cookies } from 'next/headers'

export const checkLoggedIn = async () => {
    console.log('this sid called')
    const cookie = cookies().toString()
    console.log(cookie)
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_NAME + "api/checkLoggedIn", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie, // Include the cookies in the headers
        },
        // Add any additional options or body if needed
    });
    const data = await res.json()
    console.log('this is data for login', data)
    return data
}