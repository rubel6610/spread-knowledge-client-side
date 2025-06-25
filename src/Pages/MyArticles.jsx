import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyArticles = () => {
  const { user } = useAuth();
  const [myArticles, setMyArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/myarticles?email=${user?.email}`)
      .then(res => {
        setMyArticles(res.data);
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_BASEURL}/articles/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
              const remaining = myArticles.filter(article => article._id !== id);
              setMyArticles(remaining);
            }
          });
      }
    });
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { title, category, tags, thumbnail, content } = Object.fromEntries(formData.entries());
    const separatedTags = tags.split(',').map(tag => tag.trim());


    const { _id, ...UpdatedArticleData } = {
      title,
      category,
      tags: separatedTags,
      thumbnail,
      content,
      date: new Date().toLocaleDateString(),
    };

    axios.put(`${import.meta.env.VITE_BASEURL}/updatearticles/${selectedArticle._id}`, UpdatedArticleData)
      .then(res => {
        if (res.data.modifiedCount) {
          const updatedList = myArticles.map((article) => {
            if (article._id === selectedArticle._id) {
              return { ...article, ...UpdatedArticleData };
            } else {
              return article;
            }
          });
          setMyArticles(updatedList);
          Swal.fire({
            icon: 'success',
            title: 'Article Updated Successfully!',
            timer: 1500,
            showConfirmButton: false,
          });
          setShowModal(false);
        }
      });
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-4 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">My Articles</h2>
        <div className="overflow-x-auto">
          <table className="table text-white">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myArticles.map(article => (
                <tr key={article._id}>
                  <td><img className='w-16' src={article.thumbnail} alt="" /></td>
                  <td>{article.title}</td>
                  <td>{article.category}</td>
                  <td>{article.date}</td>
                  <td className="flex gap-2">
                    <button onClick={() => handleEdit(article)} className="btn btn-sm btn-warning">Update</button>
                    <button onClick={() => handleDelete(article._id)} className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
              <h3 className="text-xl font-bold mb-4 text-white">Update Article</h3>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-300 mb-1">Title</label>
                  <input type="text" id="title" name="title" defaultValue={selectedArticle.title} required className="w-full px-3 py-2 border bg-gray-700 text-white rounded" />
                </div>

                  <div className="mb-4">
              <label htmlFor="category" className="block text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                id="category"
                defaultValue={selectedArticle.category}
                required
                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
              </select>
            </div>

               <div className="mb-4">
              <label htmlFor="tags" className="block text-gray-300 mb-2">
                Tags (Use Comma For Separate)
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                defaultValue={selectedArticle.separatedTags.join(",")}
                placeholder="e.g. React, JavaScript, Web Development"
                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
              />
            </div>

                <div className="mb-4">
                  <label htmlFor="thumbnail" className="block text-gray-300 mb-1">Thumbnail URL</label>
                  <input type="text" id="thumbnail" name="thumbnail" defaultValue={selectedArticle.thumbnail} required className="w-full px-3 py-2 border bg-gray-700 text-white rounded" />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="block text-gray-300 mb-1">Content</label>
                  <textarea id="content" name="content" defaultValue={selectedArticle.content} required rows="4" className="w-full px-3 py-2 border bg-gray-700 text-white rounded"></textarea>
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArticles;
