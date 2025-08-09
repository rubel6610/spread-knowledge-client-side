import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/UseAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArticleDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [userComment, setUserComment] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/articles/${id}`)
      .then(res => {
        setArticle(res.data);
        setLikes(res.data.likes || 0);
      });

    axios.get(`${import.meta.env.VITE_BASEURL}/comments/${id}`)
      .then(res => {
        setComments(res.data);
      });
  }, [id]);

  const handleLike = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'You must login to like this article!',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    setLikes(prev => {
      const updatedLikes = prev + 1;
      axiosSecure.patch(`${import.meta.env.VITE_BASEURL}/articles/${id}`, { likes: updatedLikes })
        .catch(err => console.error(err));
      return updatedLikes;
    });
  };

  const handleComment = (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'You must login to comment!',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    const commentData = {
      articleId: id,
      commenterName: user.displayName,
      commenterPhoto: user.photoURL,
      commentText: userComment,
      commentDate: new Date().toISOString()
    };

    axiosSecure.post(`${import.meta.env.VITE_BASEURL}/comments`, commentData)
      .then(res => {
        if (res.data.insertedId) {
          setComments([...comments, commentData]);
          setUserComment('');
          toast.success('Commented successfully!');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-base-200 p-6 rounded-xl">
        <img src={article.thumbnail} alt="" className="w-full object-cover rounded-lg mb-4" />
        <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
        <p className="mb-2">Category: {article.category}</p>
        <p className="mb-4">{article.content}</p>

        <div className="mb-4 flex gap-2 flex-wrap">
          {article?.separatedTags?.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-600 rounded-full text-sm">{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button onClick={handleLike} className="btn btn-primary">Like</button>
          <span>{likes} Likes</span>
          <span>{comments.length} Comments</span>
        </div>

        <form onSubmit={handleComment} className="mb-6">
          <textarea
            name="comment"
            rows="3"
            required
            placeholder="Write your comment..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none mb-2"
          ></textarea>
          <button type="submit" className="btn btn-primary w-full">Post Comment</button>
        </form>

        <div>
          <h3 className="text-2xl font-semibold mb-3">Comments</h3>
          {comments.length === 0 && <p>No comments yet. Be the first to comment!</p>}
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start gap-3 mb-4">
              <img src={comment.commenterPhoto} alt="commenter photo" className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="font-semibold">{comment.commenterName}</h4>
                <p className="text-gray-300">{comment.commentText}</p>
                <p className="text-gray-500 text-sm">{comment.commentDate.split('T')[0]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add ToastContainer here */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default ArticleDetails;
