import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL", API_URL);

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/getPost`);

    const formattedPosts = response.data.map((doc) => ({
      id: doc.id,
      ...doc,
      timestamp: doc.timestamp?._seconds
        ? new Date(doc.timestamp._seconds * 1000).toLocaleString()
        : "No Date",
    }));

    console.log("Formatted Posts:", formattedPosts);
    return formattedPosts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export const addPost = async (title, description, fetchPosts, setLoading) => {
  setLoading(true);
  try {
    await axios.post(`${API_URL}/addPost`, { title, description });
    toast.success("Post added successfully!");
    fetchPosts();
  } catch (error) {
    toast.error("Failed to add post.");
  }
  setLoading(false);
};

export const updatePost = async (
  postId,
  title,
  description,
  fetchPosts,
  setLoading
) => {
  setLoading(true);
  try {
    await axios.put(`${API_URL}/updatePost/${postId}`, { title, description });
    toast.success("Post updated successfully!");
    fetchPosts();
  } catch (error) {
    toast.error("Failed to update post.");
  }
  setLoading(false);
};

export const deletePost = async (postId, fetchPosts, setLoadingID) => {
  setLoadingID(postId);
  try {
    await axios.delete(`${API_URL}/deletePost/${postId}`);
    toast.success("Post deleted successfully!");
    fetchPosts();
  } catch (error) {
    toast.error("Failed to delete post.");
  }
  setLoadingID(null);
};
