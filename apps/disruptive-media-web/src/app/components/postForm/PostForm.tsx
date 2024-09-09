import { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePostForm = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdPost, setCreatedPost] = useState(null);

  // Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:3001/topics');
        console.log("response.data: ", response.data);
        
        setTopics(response.data);
        // Initially, no categories are available until a topic is selected
        setCategories([]);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  // Fetch and filter categories based on selected topic
  useEffect(() => {
    if (selectedTopic) {
      const topic = topics.find(t => t._id === selectedTopic);
      console.log('Topic: ',topic, 'Topics: ', topics);
      
      if (topic) {
        const fetchCategories = async () => {
          try {
            const response = await axios.get('http://localhost:3001/categories');
            // Filter categories based on `topic.categoriesAllowed`
            const allowedCategoryNames = topic.categoriesAllowed; // Allowed category names
            const allCategories = response.data; // All categories from API

            const categoryMap = allCategories
            .filter((category) => allowedCategoryNames.includes(category.name)) // Filtrar por nombres permitidos
            .map((category) => {
              return {
                _id: category._id,
                name: category.name
              };
            });

            setCategories(categoryMap);
            console.log('allowedCategories: ', allowedCategoryNames,'category map:',categoryMap, 'categories:', categories);
            
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        fetchCategories();
      }
    } else {
      setCategories([]);
    }
  }, [selectedTopic, topics]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      title,
      topicId: selectedTopic,
      categoryId: selectedCategory,
      url,
    };
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3001/posts', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreatedPost(response.data);
      setStep(5);
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error('Error during post creation:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setSelectedTopic('');
    setSelectedCategory('');
    setCategories([]);
    setStep(1);
    setError('');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Create a New Post</h2>
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                  URL
                </label>
                <input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Next
              </button>
            </form>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Select a Topic</h2>
            <div className="mb-4">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic._id} value={topic._id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setStep(3)}
                disabled={!selectedTopic}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Select a Category</h2>
            <div className="mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select a category</option>
                {categories.map((categoryId) => (
                  <option key={categoryId._id} value={categoryId._id}>
                    {categoryId.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setStep(4)}
                disabled={!selectedCategory}
              >
                Review
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Review and Confirm</h2>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>URL:</strong> {url}</p>
            <p><strong>Topic:</strong> {topics.find((t) => t._id === selectedTopic)?.name}</p>
            <p><strong>Category:</strong> {selectedCategory}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setStep(3)}
              >
                Back
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Post Created Successfully</h2>
            <p><strong>Title:</strong> {createdPost?.title}</p>
            <p><strong>URL:</strong> {createdPost?.url}</p>
            <p><strong>Category:</strong> {createdPost?.category.name}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              onClick={() => {
                resetForm();
                setIsModalOpen(false);
              }}
            >
              Create Another Post
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <button
        className="fixed bottom-5 left-5 bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-opacity duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="text-2xl font-bold">+</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            {renderStepContent()}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostForm;
