import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function SignUp() {
    const navigate = useNavigate(); // Hook to get the navigate function
    const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

    const formSubmit = async (e) => {
        e.preventDefault();
    
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;
    
        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return; // Stop the form submission if passwords don't match
        }

        const data = {
            name,
            email,
            password
        };
    
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const result = await response.json(); // Parse the JSON response
            console.log(result);
            navigate("/");
        } catch (error) {
            console.error("Error:", error); // Handle any errors that occur during fetch
        }
    };    

    return (
        <>
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
            <form className="mt-4 flex flex-col gap-4 items-center" onSubmit={formSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name:</label>
                    <input className="bg-white w-xl text-black p-2" type="text" name="name" id="name" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email:</label>
                    <input className="bg-white w-xl text-black p-2" type="email" name="email" id="email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password:</label>
                    <input className="bg-white w-xl text-black p-2" type="password" name="password" id="password" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input className="bg-white w-xl text-black p-2" type="password" name="confirm-password" id="confirm-password" />
                </div>

                {/* Show error message if passwords don't match */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</button>
            </form>
        </>
    );
}
