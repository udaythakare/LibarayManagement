'use server'
import {revalidatePath} from 'next/cache'

export const addBooks = async (prevState, formData) => {
    const book_name = formData.get('book')
    const book_description = formData.get('book_description')
    const book_author = formData.get('book_author')
    const quantity = formData.get('quantity')
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}addBook`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ book_name, book_author, book_description,quantity })
        });

        const data = await res.text()
        console.log(data)
        if (data === "Book Added Successfully") {
            revalidatePath('/home/manage-books')
            return { message: "Book Added Successfully" }
        }
        return { message: data }
    } catch (error) {
        console.log("Error adding the book : ", error.message);
    }
}