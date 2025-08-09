import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const MyArticles = () => {
  const { user } = useAuth();
  const [myArticles, setMyArticles] = useState([]);

  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`${import.meta.env.VITE_BASEURL}/myarticles?email=${user?.email}`)
      .then((res) => {
         setLoading(false);
        setMyArticles(res.data);
       
      });
  }, [user?.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_BASEURL}/myarticles/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your article has been deleted.",
                "success"
              );
              setMyArticles(myArticles.filter((a) => a._id !== id));
            }
          });
      }
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
      <h2 className="text-3xl font-bold text-center mb-6">My Articles</h2>

      {/* Cards Grid */}
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

    </div>
  );
};

export default MyArticles;
