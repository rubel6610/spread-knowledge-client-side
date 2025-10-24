import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import NoDataFound from "../Components/NoDataFound";

const MyArticles = () => {
  const { user } = useAuth();
  const [myArticles, setMyArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();

  // Fetch user's articles
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/myarticles?email=${user.email}`)
      .then((res) => {
        setMyArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch your articles.", "error");
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

  // Delete article
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/myarticles/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setMyArticles((prev) => prev.filter((a) => a._id !== id));
              Swal.fire("Deleted!", "Your article has been deleted.", "success");
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to delete article.", "error");
          });
      }
    });
  };

  // Open modal for editing
  const handleEdit = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  // Update article
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      title: formData.get("title"),
      category: formData.get("category"),
      tags: formData.get("tags").split(",").map((tag) => tag.trim()),
      thumbnail: formData.get("thumbnail"),
      content: formData.get("content"),
      date: new Date().toLocaleDateString(),
    };

    axiosSecure
      .put(`/updatearticles/${selectedArticle._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setMyArticles((prev) =>
            prev.map((a) =>
              a._id === selectedArticle._id ? { ...a, ...updatedData } : a
            )
          );
          Swal.fire({
            icon: "success",
            title: "Article Updated Successfully!",
            timer: 1500,
            showConfirmButton: false,
          });
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update article.", "error");
      });
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (myArticles.length === 0) {
    return (
      <NoDataFound 
        message="No Articles Yet" 
        description="You haven't posted any articles yet. Start sharing your knowledge!" 
        showButton={true}
        buttonText="Post Your First Article"
        buttonLink="/post-article"
      />
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-center mb-2">My Articles</h2>
        <p className="text-center text-base-content/70">Manage your published content</p>
      </div>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {myArticles.map((article) => (
          <div
            key={article._id}
            className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-[450px] hover:-translate-y-2 border border-base-300"
          >
            <div className="overflow-hidden h-48 relative">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3">
                <span className="badge badge-primary badge-lg shadow-lg">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem]">{article.title}</h3>
              
              <div className="flex items-center gap-2 mb-2 text-sm text-base-content/70">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>

              <div className="flex items-center gap-2 mb-3 text-sm">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{article.likes || 0} likes</span>
              </div>
              
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="btn btn-warning btn-sm flex-1 gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="btn btn-error btn-sm flex-1 gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {showModal && selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 ">
          <div className="bg-base-200 p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-auto">
            <h3 className="text-xl font-bold mb-4  ">Update Article</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedArticle.title}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Category</label>
                <select
                  name="category"
                  defaultValue={selectedArticle.category}
                  required
                  className="w-full px-4 py-2 border bg-base-100 border-gray-600 rounded-lg focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  defaultValue={selectedArticle.separatedTags?.join(",")}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Thumbnail URL</label>
                <input
                  type="text"
                  name="thumbnail"
                  defaultValue={selectedArticle.thumbnail}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Content</label>
                <textarea
                  name="content"
                  defaultValue={selectedArticle.content}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
