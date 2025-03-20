import { useEffect, useState } from "react";
import { Post } from "../components/post";

export function Index() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
  
      try {
        const response = await fetch("http://localhost:3000/posts?published=true", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
  
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
  
        const result = await response.json();
        setPosts(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    getPosts();
  },[]);

  return (
    <>
      <h1 className="text-2xl font-bold">Posts</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
