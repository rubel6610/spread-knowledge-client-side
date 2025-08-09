import React from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";


const PostArticle = () => {
  const { user } = useAuth();

  const handlePost = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { category, content, tags, thumbnail, title } = Object.fromEntries(
      formData.entries());

    const separatedTags = tags.split(",").map((tag) => tag.trim());

    const articleData = {
      category,
      content,
      date: new Date().toLocaleDateString(),
      thumbnail,
      title,
      separatedTags,
      authorEmail: user.email,
      authorName: user.displayName,
    };

    axios
      .post(`${import.meta.env.VITE_BASEURL}/articles`, articleData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Article Posted Successfully!",
            text: "Your article has been added to the system.",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Post",
            text: "Please try again later.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  return (

    
      <div className="min-h-screen flex items-center justify-center bg-base-300 p-4">
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-base-content mb-6">
            Post New Article
          </h2>
          <form onSubmit={handlePost}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-base-content mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter article title"
                required
                className="w-full px-4 py-2 border border-gray-600 bg-base-200 text-base-content rounded-lg focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-base-content mb-2">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                rows="6"
                required
                minLength={50}
                placeholder="Write your article here...(max 50 characters )"
                className="w-full px-4 py-2 border border-gray-600 bg-base-200 text-base-content  rounded-lg focus:outline-none"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-base-contentmb-2">
                Category
              </label>
              <select
                name="category"
                id="category"
                required
                className="w-full px-4 py-2 border border-gray-600 bg-base-200 text-base-content  rounded-lg focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="tags" className="block text-base-contentmb-2">
                Tags (Use Comma For Separate)
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="e.g. React, JavaScript, Web Development"
                className="w-full px-4 py-2 border border-gray-600 bg-base-200 text-base-content  rounded-lg focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="thumbnail" className="block text-base-contentmb-2">
                Thumbnail URL
              </label>
              <input
                type="text"
                name="thumbnail"
                id="thumbnail"
                placeholder="Enter thumbnail image URL"
                required
                className="w-full px-4 py-2 border border-gray-600 bg-base-200 text-base-content  rounded-lg focus:outline-none"
              />
            </div>

            <div className="py-2 rounded-xl mb-4">
              <legend className="text-base-contentmb-2 text-center">
                Logged In User
              </legend>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <label>Name:</label>
                  <input
                    className="w-full"
                    type="text"
                    defaultValue={user?.displayName}
                    disabled
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label>Email:</label>
                  <input
                    className="w-full"
                    type="email"
                    defaultValue={user?.email}
                    disabled
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary text-base-content  py-2 my-2 rounded-lg font-semibold transition duration-300"
            >
              Post Article
            </button>
          </form>
        </div>
      </div>

  );
};

export default PostArticle;
