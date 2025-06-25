import React from 'react';
import { Link } from 'react-router';

const categories = ['Technology', 'Science', 'Arts', 'History', 'Education'];

const Categories = () => {
  return (
    <div className="p-4 my-4 bg-gray-900 text-white">
      <h2 className="text-2xl  font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map(category => (
          <Link 
            key={category} 
            to={`/category/${category}`} 
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
