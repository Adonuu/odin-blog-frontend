import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

export function ManageComment() {
    const location = useLocation();
    const navigate = useNavigate();
    const comment = location.state?.comment; // Retrieve passed post data

    const [contents, setContents] = useState(comment.contents);

    const { user } = useContext(UserContext);

    if (!comment) {
        navigate("/"); // Redirect if no post data is available
        return null;
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        // combine data
        const data = {
            commentId: comment.id,
            contents,
        };

        try {
            const response = await fetch(`http://localhost:3000/comments/${comment.id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                console.log(response);
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
            <div className="flex justify-between w-full">
                <h1 className="text-2xl font-bold">Update Comment</h1>
            </div>
            <form className="mt-4 flex flex-col gap-4 items-center" onSubmit={formSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="contents">Comment:</label>
                    <textarea 
                        className="bg-white w-xl text-black p-2 h-40 resize-none" 
                        name="contents" 
                        id="contents" 
                        value={contents}
                        onChange={(e) => setContents(e.target.value)} // Allow user input
                    />
                </div>
                <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600">
                    Update
                </button>
            </form>
        </>
    );
}
