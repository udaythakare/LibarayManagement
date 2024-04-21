'use server'
import { revalidatePath } from 'next/cache'

export const addStudent = async (prevState, formData) => {
    const name = formData.get("name")
    const branch = formData.get('branch')
    const year = formData.get('year')
    const gender = formData.get('gender')

    console.log(name, branch, year, gender)

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}addStudent`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, branch, year, gender })
        });

        const data = await res.json()
        console.log(data)

        return { barcode: data.barcode_url }
    } catch (error) {
        console.log("Error adding the book : ", error.message);
    }
}

export const getStudents = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_NAME + "getStudents", { cache: 'no-cache' })
    const data = await res.json()
    return data
}

export const deleteStudent = async (studentId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}deleteStudent`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId })
    });

    const data = await res.text()
    if (data === "Student deleted") {
        revalidatePath("/home/manage-students")
        return
    }
}

export const entryAction = async (prevState, formData) => {

    const studentId = formData.get('studentId')
    console.log(studentId)
    // Get the current date in MySQL format (YYYY-MM-DD)
    const currentDate = new Date().toISOString().split('T')[0];

    // Get the current time in MySQL format (HH:MM:SS)
    const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}addEntry`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId, currentDate, currentTime })
    });

    const data = await res.text()
    if (data === "Entry Added") {
        console.log(data)
        revalidatePath("/home/manage-entry")
        return
    }
}


export const getAllEntries = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_NAME + "getEntries", { cache: 'no-cache' })
    const data = await res.json()
    console.log(data)
    return data
}

export const sendSS = async (SS) => {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}addEntry`, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ screenshotData: SS })
    // });

    // console.log(res)

    // const data = await res.text()
    // console.log(data)
    // return "slkdfjs"

    const blob = await fetch(SS).then((res) => res.blob());
    // Send the blob data to the backend
    const formData = new FormData();
    formData.append('image', blob);
    const res = await fetch('http://127.0.0.1:5000/addEntry', {
        method: 'POST',
        body: formData
    });

    const data = await res.text()
    return data
}

export const handleIssueBookAction = async (bookId,id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/issueBook?studentId=${id}&bookId=${bookId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'credentials': 'include'
        }
    });
    const data = await res.text();

    revalidatePath('/home/issue-book')
    return data
}

export const fetchAllIssuedBooks = async()=>{
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_NAME + "fetchAllIssuedBook",{cache : 'no-cache'})
    const data = await res.json()
    console.log(data)
    return data
}

export const handleReturnBook = async(student_id,book_id)=>{
    console.log('reache dhere')
    console.log(student_id,book_id)
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_NAME + "bookReturned",{
        method : "POST",
        headers : {
            'COntent-Type':'application/json'
        },
        body : JSON.stringify({student_id,book_id})
    })

    const data = await res.text()
    revalidatePath('/home/issue-book')
    revalidatePath('/home/manage-book')
    return data

}