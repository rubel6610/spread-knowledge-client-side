import React from 'react';
import { Link } from 'react-router';

const categories = ['Technology', 'Science', 'Arts', 'History', 'Education'];

const Categories = () => {
  return (
    <div className="py-10 my-4 bg-base-300 text-base-content">
      <h2 className="text-2xl text-center font-bold mb-4">Categories</h2>
      <div className="flex justify-center flex-wrap gap-4">
        {categories.map(category => (
          <Link 
            key={category} 
            to={`/category/${category}`} 
            className="px-4 py-2 bg-base-200 rounded hover:bg-base-100"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
