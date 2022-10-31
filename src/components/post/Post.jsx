import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Comment from "../comments/Comment";
import CreateComment from "../createComment/CreateComment";
import { format } from "timeago.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowMore from "../utilities/ShowMore";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Post = ({ post, posts, setPosts }) => {
  const [user, setUser] = useState({});
  const signedInUser = useSelector((state) => state.user);
  const [like, setLike] = useState(post.likes.length);
  const [showModal, setShowModel] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState();
  const [hasCommented, setHasCommented] = useState(false);
  const [postImage, setPostImage] = useState();
  let { id } = useParams();

  const notify = () => {
    toast.success("Deleted Post!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users/${post.userId}`
      );
      setUser(res.data);
    };
    getUser();
  }, [posts]);

  //get comments
  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${post._id}`
      );
      setComments(res.data);
    };
    getComments();
  }, [hasCommented]);

  //check to if i've liked before
  useEffect(() => {
    if (post.likes.includes(post.userId)) {
      setHasLiked(true);
    }
  }, [post]);

  //handleLikes
  const handleLikes = async () => {
    setLike(hasLiked ? like - 1 : like + 1);
    console.log(post.likes);
    await axios.put(
      `http://localhost:5000/api/posts/${post._id}/like`,
      {
        userId: signedInUser.id,
      },
      { withCredentials: true, contentType: "application/json" }
    );
    setHasLiked(!hasLiked);

    await axios.post("http://localhost:5000/api/notifications", {
      fromUserId: signedInUser.id,
      userIdToNotify: post.userId,
      postId: post._id,
      action: `${signedInUser.firstname} ${signedInUser.lastname} liked your post.`,
    });
  };

  // useEffect(() => {
  //   const likeNotification = async () => {
  //     if (hasLiked === true) {

  //     }
  //   };
  //   likeNotification();
  // }, [hasLiked]);

  //handle delete post
  const deletePost = async () => {
    setPosts(posts.filter((p) => p._id !== post._id));

    await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
      data: { userId: post.userId },
    });
    notify();
  };

  return (
    <div className="bg-white m-5 shadow-md rounded-lg p-2 relative  ">
      <ToastContainer autoClose={1000} />
      <div className="  flex justify-between items-center relative p-2">
        <Link to={`/user/${post.userId}`}>
          <div className="flex items-center">
            <div className="flex h-12  w-12 ">
              <img
                src={
                  user.profilePicture ? user.profilePicture : "/no-avatar.png"
                }
                loading="lazy"
                className=" rounded-full w-full h-full object-cover cursor-pointer"
                alt=""
              />
            </div>

            <div className="flex flex-col ml-2 text-sm cursor-pointer">
              <p className=" font-bold">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-sm text-gray-500">{format(post.createdAt)}</p>
            </div>
          </div>
        </Link>

        {/* show more here */}
        {signedInUser.id === post.userId ? (
          <ShowMore actionText="Delete Post" />
        ) : (
          <ShowMore actionText="Report Post" />
        )}
      </div>
      <div className=" text-gray-600 pt-2 pb-2 p-3">
        <p>{post?.desc}</p>
        <div className="mt-5 shadow-lg">
          <img
            src={post?.img}
            className="w-full object-cover rounded-lg  "
            alt=""
          />
        </div>
      </div>
      <div
        className={`pb-3 flex justify-between  p-2 ${
          showModal ? "mb-0" : "mb-12"
        }`}
      >
        <div className="flex">
          <div className="flex">
            {hasLiked ? (
              <ThumbUpIcon
                onClick={handleLikes}
                className=" cursor-pointer text-blue-400"
              />
            ) : (
              <ThumbUpOffAltIcon
                onClick={handleLikes}
                className=" cursor-pointer text-blue-400"
              />
            )}

            <p className="ml-1">{like}</p>
            {hasLiked && <p className="ml-2 text-gray-500">You liked this</p>}
          </div>
        </div>
        <div className="flex ml-3" onClick={() => setShowModel(!showModal)}>
          <ChatBubbleOutlineIcon className=" cursor-pointer text-blue-400" />
          <p className="ml-1">{comments?.length}</p>
        </div>
      </div>

      <CreateComment
        post={post}
        user={user}
        hasCommented={hasCommented}
        setHasCommented={setHasCommented}
        setShowModel={setShowModel}
      />

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "200px",
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              transition: {
                duration: 0.6,
              },
            }}
            className=" bg-gray-100 p-2 overflow-y-auto relative mb-20 "
          >
            {comments.map((c) => (
              <Comment
                key={c._id}
                commentData={c}
                comments={comments}
                setComments={setComments}
                commentId={c._id}
                postId={post._id}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Post;
