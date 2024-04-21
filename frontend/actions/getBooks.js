'use server'

import {revalidatePath} from 'next/cache'

export const getBooks = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_NAME + "getBooks", { cache: 'no-cache' })
    const data = await res.json()
    return data
}

export const getAllBooks = async (author, name) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/getAllBooks?name=${name}&author=${author}`, { cache: 'no-cache' });
    revalidatePath('/home/manage-books')
    const data = await res.json();
    console.log(data)
    return data;
};
