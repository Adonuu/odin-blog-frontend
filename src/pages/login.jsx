import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export function Login() {
    const navigate = useNavigate(); // Hook to get the navigate function
    const { setUser } = useContext(UserContext);

    const formSubmit = async (e) => {
        e.preventDefault();
    
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
    
        const data = {
            email,
            password
        };
    
        try {
            const response = await fetch("http://localhost:3000/users/login", {
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
            const userData = {
                id: result.user.id,
                name: result.user.name,
                token: result.token
            }
            localStorage.setItem("blogUserInfo", userData);
            setUser(userData);
            navigate("/");
        } catch (error) {
            console.error("Error:", error); // Handle any errors that occur during fetch
        }
    };    

    return (
        <>
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form className="mt-4 flex flex-col gap-4 items-center" onSubmit={formSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email:</label>
                    <input className="bg-white w-xl text-black p-2" type="email" name="email" id="email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password:</label>
                    <input className="bg-white w-xl text-black p-2" type="password" name="password" id="password" />
                </div>
                <button className="bg-neutral-950 p-4 rounded-2xl cursor-pointer hover:bg-blue-500">Login</button>
            </form>
        </>
    );
}
