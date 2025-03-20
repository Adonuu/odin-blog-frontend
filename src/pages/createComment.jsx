import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function CreateComment() {
    const location = useLocation();
    const navigate = useNavigate();
    const post = location.state?.post; // Retrieve passed post data

    const { user } = useContext(UserContext);

    if (!post) {
        navigate("/"); // Redirect if no post data is available
        return null;
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        // get information not contained in form (authorId)
        const authorId = user.id;
        const postId = post.id;

        // get information from form
        const contents = document.querySelector("#contents").value;

        // combine data
        const data = {
            authorId,
            postId,
            contents,
        }

        try {
            const response = await fetch("http://localhost:3000/comments", {
                method: "POST",
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
            navigate(`/post/${post.id}`, { state: { post } });
        } catch (error) {
            console.error("Error:", error); // Handle any errors that occur during fetch
        }
    }

    return (
        <>
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold">Create Comment</h1>
        </div>
        <form className="mt-4 flex flex-col gap-4 items-center" onSubmit={formSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="contents">Comment:</label>
                <textarea className="bg-white w-xl text-black p-2 h-40 resize-none" name="contents" id="contents" />
            </div>
            <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>
        </form>
        </>
    );
}