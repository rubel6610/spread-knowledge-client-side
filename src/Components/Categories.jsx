import React from 'react';
import { Link } from 'react-router';

const categories = [
  { name: 'Technology', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'Science', icon: '🔬', color: 'from-green-500 to-emerald-500' },
  { name: 'Arts', icon: '🎨', color: 'from-purple-500 to-pink-500' },
  { name: 'History', icon: '📜', color: 'from-orange-500 to-red-500' },
  { name: 'Education', icon: '🎓', color: 'from-indigo-500 to-blue-500' }
];

const Categories = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-base-200 to-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">📚 Explore Categories</h2>
          <p className="text-lg text-base-content/70">
            Discover articles across different topics
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={`/category/${category.name}`} 
              className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="card-body items-center text-center p-6">
                <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="card-title text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
