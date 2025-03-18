import { useNavigate } from 'react-router-dom';

export function CreatePost() {
    const navigate = useNavigate(); // Hook to get the navigate function
    const formSubmit = async (e) => {
        e.preventDefault();

        // get information not contained in form (authorId)
        const user = JSON.parse(localStorage.getItem("blogUserInfo"));
        const authorId = user.id;

        // get information from form
        const title = document.querySelector("#title").value;
        const contents = document.querySelector("#contents").value;
        const published = document.querySelector("#published").checked;

        // combine data
        const data = {
            authorId,
            title,
            contents,
            published
        }

        try {
            const response = await fetch("http://localhost:3000/posts", {
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
            navigate("/admin");
        } catch (error) {
            console.error("Error:", error); // Handle any errors that occur during fetch
        }
    }

    return (
      <>
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold">Create Post</h1>
        </div>
        <form className="mt-4 flex flex-col gap-4 items-center" onSubmit={formSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="title">Title:</label>
                <input className="bg-white w-xl text-black p-2" type="text" name="title" id="title" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="contents">Content:</label>
                <textarea className="bg-white w-xl text-black p-2 h-40 resize-none" name="contents" id="contents" />
            </div>
            <div className="flex flex-col gap-2 items-center">
                <label htmlFor="published">Publish:</label>
                <input className="w-6 h-6 p-4" type="checkbox" name="published" id="published" />
            </div>
            <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>
        </form>
      </>
    );
}
