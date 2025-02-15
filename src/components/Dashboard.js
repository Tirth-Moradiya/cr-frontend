import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Pencil, Trash, Loader2 } from "lucide-react";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "../services/postService";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("add");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingID, setLoadingID] = useState(null);

  useEffect(() => {
    if (selectedTab !== "add") fetchPosts();
  }, [selectedTab]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getPost`
      );
      setPosts(response.data);
    } catch (error) {
      toast.error("Failed to fetch posts");
    }
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    addPost(title, description, fetchPosts, setLoading);
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    updatePost(selectedPostId, title, description, fetchPosts, setLoading);
  };

  const handleDeletePost = (postId) => {
    deletePost(postId, fetchPosts, setLoadingID);
  };

  return (
    <div className="flex flex-col min-h-[90vh] bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="hidden md:flex flex-col w-64 min-h-screen bg-gray-900 text-white p-5 space-y-4 fixed left-0 top-16">
        <button
          onClick={() => setSelectedTab("add")}
          className={`w-full p-3 rounded transition ${
            selectedTab === "add"
              ? "bg-blue-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          ➕ Add Post
        </button>
        <button
          onClick={() => setSelectedTab("update")}
          className={`w-full p-3 rounded transition ${
            selectedTab === "update"
              ? "bg-yellow-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          ✏️ Update Post
        </button>
        <button
          onClick={() => setSelectedTab("delete")}
          className={`w-full p-3 rounded transition ${
            selectedTab === "delete"
              ? "bg-red-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          🗑️ Delete Post
        </button>
      </div>

      <div className="flex-1 p-4 sm:p-8">
        {selectedTab === "add" && (
          <div className="w-full max-w-lg mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Add New Post
            </h2>
            <form onSubmit={handleAddPost} className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full p-2 sm:p-3 text-white rounded flex justify-center items-center bg-blue-500 hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? <>Loading....</> : "Add Post"}
              </button>
            </form>
          </div>
        )}

        {selectedTab === "update" && (
          <div className="w-full max-w-lg mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Update Post
            </h2>
            <select
              className="w-full p-2 sm:p-3 border rounded mb-3 sm:mb-4"
              onChange={(e) => setSelectedPostId(e.target.value)}
              value={selectedPostId}
            >
              <option value="">Select a post to update</option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
            <form
              onSubmit={handleUpdatePost}
              className="space-y-3 sm:space-y-4"
            >
              <input
                type="text"
                placeholder="New Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded"
                required
              />
              <textarea
                placeholder="New Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full p-2 sm:p-3 text-white rounded flex justify-center items-center bg-yellow-500 hover:bg-yellow-600"
                disabled={loading}
              >
                {loading ? <>Loading....</> : "Update Post"}
              </button>
            </form>
          </div>
        )}

        {selectedTab === "delete" && (
          <div className="w-full max-w-lg mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Delete Post
            </h2>
            <ul className="space-y-3">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="flex justify-between p-2 sm:p-3 bg-gray-100 rounded"
                >
                  <span className="text-sm sm:text-base">{post.title}</span>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 flex items-center"
                  >
                    {loadingID === post.id ? <>Loading....</> : "Delete"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around py-3 md:hidden">
        <button
          onClick={() => setSelectedTab("add")}
          className="flex flex-col items-center"
        >
          <Plus size={24} />
          Add
        </button>
        <button
          onClick={() => setSelectedTab("update")}
          className="flex flex-col items-center"
        >
          <Pencil size={24} />
          Update
        </button>
        <button
          onClick={() => setSelectedTab("delete")}
          className="flex flex-col items-center"
        >
          <Trash size={24} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
