// components/PostsGrid.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  category: string;
  url: string;
  credits: string;
}

const PostsGrid = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  // Fetch posts from API
  useEffect(() => {
      const token = localStorage.getItem('token');
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts', {
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en los headers
            },
          });
        setPosts(response.data.posts);
        console.log(response.data,posts);
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className={`bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                Math.random() > 0.5 ? 'row-span-2' : ''
              }`}
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{post.category}</p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Post
                </a>
              </div>
              <div className="bg-gray-100 p-2 text-xs text-gray-600">
                Credits: {post.credits}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsGrid;
