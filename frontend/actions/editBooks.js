'use server'
import {revalidatePath} from 'next/cache'
export const editBook = async (prevState, formData) => {
    const book_name = formData.get('book')
    const book_description = formData.get('book_description')
    const book_quantity = formData.get('book_quantity')
    const book_id = formData.get('book_id')
    const book_author = formData.get('book_author')
    console.log(book_name, book_quantity, book_description, book_id)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}editBook`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ book_name, book_description, book_quantity, book_id, book_author })
        });

        const data = await res.text();
        console.log(data)

        if (data === "Book Edited Successfully") {
            revalidatePath("/home/manage-books");
            return { message: "Book Edited Successfully" };
        }

        return { message: data };
    } catch (error) {
        console.log("Error editing the Color:", error.message);
    }
}