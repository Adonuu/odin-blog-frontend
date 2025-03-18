import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { AdminPost } from '../components/adminPost';

export function Admin() {
  const navigate = useNavigate(); // Hook to get the navigate function
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getPosts() {
      if (!user) return; // Ensure user exists before making request
  
      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          },
        });
  
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
  
        const result = await response.json();
        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  
    getPosts();
  },[]);

  const handleClick = () => {
    navigate("/admin/createPost");
  }
  return (
    <>
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleClick}>
          Create Post
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map(post => (
        <AdminPost key={post.id} post={post} setPosts={setPosts} />
      ))}
      </div>
    </>
  );
}
