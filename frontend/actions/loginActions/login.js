'use server'

export const loginAdmin = async (prevState, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    const role = "admin"
    try {

        const res = await fetch(`http://127.0.0.1:5000/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        console.log('readhd her')

        if (!res.ok) {
            throw new Error('Failed to login');
        }

        const data = await res.text()
        if (data === "Login Successfull") {
            return { message: "Login Successfull" }
        }

        return { message: "Failed To Login!" }
    } catch (error) {
        console.log("Login Error: ", error);
    }
}

export const loginVendor = async (prevState, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    const role = "vendor"
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}api/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            throw new Error('Failed to login');
        }

        const data = await res.text()
        if (data === "Login Successfull") {
            return { message: "Login Successfull" }
        }

        return { message: "Failed To Login!" }
    } catch (error) {
        console.log("Login Error: ", error.message);
    }
}