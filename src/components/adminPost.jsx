import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export function AdminPost({ post, setPosts }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const handleDelete = async () => {
        const id = post.id;
    
        const token = user.token;
    
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, { 
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
    
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };
    const handleClick = () => {
        navigate(`/admin/managePost/${post.id}`)
    }
    
    return (
        <div className="flex flex-col gap-3 p-4 bg-neutral-950 rounded-2xl cursor-pointer hover:bg-neutral-700" onClick={handleClick}>
            <div className="flex justify-between items-center">
                <h3>{post.title}</h3>
                <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleDelete}>X</button>
            </div>
            <div>{post.author.name}</div>
            <div>Published: {post.published ? "Yes" : "No"}</div>
            <div>{new Date(post.updatedAt).toLocaleString()}</div>
        </div>
    );
}

AdminPost.propTypes = {
    post: PropTypes.object.isRequired,
    setPosts: PropTypes.func.isRequired
};