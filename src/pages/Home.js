import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchPosts } from "../services/postService"; // Import the API function

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };

    getPosts();
  }, []);

  return (
    <div className="min-h-[90vh] bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Latest Posts</h2>
        <p className="text-gray-400 text-center mb-8">
          Stay updated with the latest user posts.
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-3xl text-blue-500" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 border border-gray-700 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.description}</p>
                <p className="text-sm text-gray-500">
                  📅 {post.timestamp ? post.timestamp : "No Date"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
