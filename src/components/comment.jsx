import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


export function Comment({ comment }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const id = comment.id;
    
        const token = user.token;
    
        try {
            const response = await fetch(`http://localhost:3000/comments/${id}`, { 
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`, // Authorization header with token
                    "Content-Type": "application/json"
                },
            });
    
            if (!response.ok) {
                console.log(response);
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    const handleEdit = async () => {
        navigate(`/comment/manageComment/${comment.id}`, { state: { comment } })
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-l font-bold">{comment.author?.name || "Unknown Author"}</h1>
                <div className="flex gap-2">
                    {(user.id === comment.authorId || user.role === "ADMIN") && (
                        <>
                            <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleEdit}>Edit</button>
                            <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </div>
                
            </div>
            <h3 className="">{new Date(comment.updatedAt).toLocaleString()}</h3>
            <p>{comment.contents}</p>
        </div>
    );

}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}