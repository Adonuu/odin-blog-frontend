import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Comment } from "./comment";

export function PostDisplay() {
    const location = useLocation();
    const navigate = useNavigate();
    const post = location.state?.post; // Retrieve passed post data

    const { user } = useContext(UserContext);

    if (!post) {
        navigate("/"); // Redirect if no post data is available
        return null;
    }

    const handleCreateComment = () => {
        navigate(`/comment/${post.id}`, { state: { post } });
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">{post.title}</h1>
                <h3 className="text-xl">{new Date(post.updatedAt).toLocaleString()}</h3>
            </div>
            <h4 className="mt-4 text-xl">Author: {post.author.name}</h4>
            <p className="p-4 mt-4">{post.contents}</p>
            <div className="flex justify-between items-center">
                <h4 className="text-4xl font-bold mt-4">Comments</h4>
                {user && (
                    <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleCreateComment}>Create Comment</button>
                )}
            </div>
            <div className="flex flex-col gap-4 p-4">
                {post.comments.map((comment) => (
                    <Comment comment={comment} />
                ))}
            </div>
        </>
    );
}
