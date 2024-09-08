import { useEffect, useState } from 'react';
import axios from 'axios';
import { log } from 'console';

interface Category {
  _id: string;
  name: string;
  coverImage: string;
}

const CategoriesCarousel = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        console.log(response);
        
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle next/previous buttons
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-64 overflow-hidden bg-gray-200">
      {categories.length > 0 ? (
        <>
          {/* Current Category */}
          <div
            className="absolute w-full h-full transition-all duration-500 flex justify-center items-center"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {categories.map((category) => (
              <div key={category._id} className="flex-none w-full h-full text-center">
                <img
                  src={category.coverImage}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <h2 className="relative bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md">
                  {category.name}
                </h2>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
          >
            &gt;
          </button>
        </>
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default CategoriesCarousel;
