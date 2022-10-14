import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Comment = ({ commentData, comments, setComments, commentId, postId }) => {
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);

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
      <div className=" shrink-0 ">
        <img
          src="/me.jpg"
          height="40px"
          width="40px"
          className=" rounded-full object-cover cursor-pointer ml-1"
          alt=""
        />
      </div>
      <div className="ml-2 flex justify-between items-center rounded-md p-2 bg-gray-200 w-full relative">
        <div>
          <div className="flex">
            <p>
              {user?.firstname} {user?.lastname}
            </p>
            <p className="ml-2 text-gray-500">{format(user?.createdAt)}</p>
          </div>
          <div>
            <p>{commentData?.comment}</p>
          </div>
        </div>

        <MoreVertIcon
          onClick={() => setShow(!show)}
          className="cursor-pointer"
        />
        {show && (
          <div
            onClick={handleDeleteComment}
            className=" bg-gray-50 z-50 hover:bg-gray-100 border text-red-500 border-gray-500 p-2 absolute -bottom-5 h-10 w-30 -right-2 shadow-md rounded-lg"
          >
            <p className=" hover:cursor-pointer">
              <b>Delete Comment</b>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
