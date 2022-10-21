import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import ShowMore from "../utilities/ShowMore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Comment = ({ commentData, comments, setComments, commentId, postId }) => {
  const [user, setUser] = useState();
  const profilePicture = useSelector((state) => state.user.profilePicture);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users/${commentData.userId}`
      );
      setUser(res.data);
    };
    fetchPosts();
  }, []);

  const handleDeleteComment = async () => {
    await axios
      .delete(`http://localhost:5000/api/comments/${postId}`, {
        data: {
          commentId: commentId,
        },
      })
      .then((res) => {
        console.log(res);
        setComments(comments.filter((comment) => comment._id !== commentId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-3 flex items-center ">
      <div className="h-12 w-14 ">
        <Link to={`/user/${commentData.userId}`}>
          <img
            src={profilePicture ? profilePicture : "/no-avatar.png"}
            className=" rounded-full object-cover cursor-pointer ml-1 max-w-full h-full"
            alt=""
          />
        </Link>
      </div>
      <div className="ml-2 flex justify-between items-center rounded-md p-2 bg-gray-200 w-full relative">
        <div>
          <div className="flex">
            <p>
              {user?.firstname} {user?.lastname}
            </p>
            <p className="ml-2 text-gray-500">
              {format(commentData?.createdAt)}
            </p>
          </div>
          <div>
            <p>{commentData?.comment}</p>
          </div>
        </div>

        <ShowMore
          actionText="Delete Comment"
          actionFunction={handleDeleteComment}
        />
      </div>
    </div>
  );
};

export default Comment;
