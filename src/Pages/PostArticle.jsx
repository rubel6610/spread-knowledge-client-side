import React, { useState } from 'react';
import useAuth from '../Hooks/useAuth';

const PostArticle = () => {
    const {user}=useAuth();
    const [selectedCategory,setSelectedCategory]=useState('')

    const handlePost = (e)=>{
        e.preventDefault();
    }
    return (
        
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Post New Article</h2>
        <form onSubmit={handlePost}>

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter article title"
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-300 mb-2">Content</label>
            <textarea
              name="content"
              id="content"
              rows="6"
              required
              placeholder="Write your article here..."
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-300 mb-2">Category</label>
            <select
              name="category"
              id="category"
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-300 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="e.g. React, JavaScript, Web Development"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
          </div>


          <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-gray-300 mb-2">Thumbnail Image URL</label>
            <input
              type="text"
              name="thumbnail"
              id="thumbnail"
              placeholder="Enter thumbnail image URL"
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
          </div>


          <div className="mb-6">
            <label htmlFor="date" className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
          </div>
          

          <div className="  rounded-xl">
            <legend  className=" text-gray-300 mb-2 ">Logged In User</legend>
            <label htmlFor="name" className='text-gray-300 mb-2'>Name</label>
            <input
              type="text"
              name="name"
              id="name"
             defaultValue={user?.displayName}
             disabled
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
            <label htmlFor="email" className='text-gray-300 mb-2'>Email</label>
            <input
              type="email"
              name="email"
              id="name"
             defaultValue={user?.email}

             disabled
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary text-white py-2 my-2 rounded-lg font-semibold transition duration-300"
          >
            Post Article
          </button>
        </form>
      </div>
    </div>
    );
};

export default PostArticle;