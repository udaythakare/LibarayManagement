'use server'
import {revalidatePath} from 'next/cache'

export const deleteBook = async (bookId) => {
    console.log('section deleteion')
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}deleteBook`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId })
    });

    const data = await res.text()
    if (data === "Book deleted") {
        revalidatePath("/home/manage-books")
        return
    }

}