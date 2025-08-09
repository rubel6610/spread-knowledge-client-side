import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

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
      <div className="min-h-screen flex justify-center items-center bg-base-300">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {myArticles.map((article) => (
          <div
            key={article._id}
            className="bg-base-200 rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold">{article.title}</h3>
              <p className="text-sm text-gray-500">{article.category}</p>
              <p className="text-xs text-gray-400 mb-2">{article.date}</p>
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="btn btn-sm btn-warning"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {showModal && selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-base-200 p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Update Article</h3>
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
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none"
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
                  defaultValue={selectedArticle.tags?.join(",")}
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
