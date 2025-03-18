import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';

export function ManagePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      if (!user) return;

      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [id, user]);

  const formSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: document.querySelector("#title").value,
      contents: document.querySelector("#contents").value,
      published: document.querySelector("#published").checked,
    };

    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Post updated successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Update Post</h1>
      </div>
      <form className="mt-4 flex flex-col gap-4 items-center" onSubmit={formSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title:</label>
          <input className="bg-white w-xl text-black p-2" type="text" name="title" id="title" defaultValue={post.title} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contents">Content:</label>
          <textarea className="bg-white w-xl text-black p-2 h-40 resize-none" name="contents" id="contents" defaultValue={post.contents} />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="published">Publish:</label>
          <input className="w-6 h-6 p-4" type="checkbox" name="published" id="published" defaultChecked={post.published} />
        </div>
        <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
      </form>
    </>
  );
}
