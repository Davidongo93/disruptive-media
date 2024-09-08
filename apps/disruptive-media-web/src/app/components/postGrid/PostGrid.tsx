import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import useSession from '../hooks/UseSession';

interface Post {
  _id: string;
  title: string;
  topic: { _id: string, name: string };
  category: { _id: string, name: string };
  url: string;
  credits: { username: string };
}

const PostsGrid = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSession();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.posts);
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
            <PostCard
              key={post._id}
              title={post.title}
              topic={post.topic}
              category={post.category}
              url={post.url}
              credits={post.credits.username}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsGrid;
