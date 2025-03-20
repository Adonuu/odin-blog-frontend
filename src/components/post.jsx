import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function Post({ post }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/post/${post.id}`, { state: { post } });
    }
    
    return (
        <div className="flex flex-col gap-3 p-4 bg-neutral-950 rounded-2xl cursor-pointer hover:bg-neutral-700" onClick={handleClick}>
            <h3>{post.title}</h3>
            <div>{post.author.name}</div>
            <div>{new Date(post.updatedAt).toLocaleString()}</div>
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
};