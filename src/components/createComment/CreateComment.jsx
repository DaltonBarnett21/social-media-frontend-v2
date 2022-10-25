import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateComment = ({
  post,
  hasCommented,
  setHasCommented,
  setShowModel,
  user,
}) => {
  const inputRef = useRef();
  const [isDisabled, setIsDisabled] = useState(true);
  const currentUser = useSelector((state) => state.user);

  const [comment, setComment] = useState({
    userId: currentUser.id,
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newComment = {};
    newComment[name] = value;
    if (newComment.comment.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setComment({ ...comment, ...newComment });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/comments/${post._id}`,
        comment
      );
      setHasCommented(!hasCommented);
      setShowModel(true);
    } catch (err) {
      console.log(err);
    }
    setIsDisabled(true);
    inputRef.current.value = "";

    try {
      await axios.post("http://localhost:5000/api/notifications", {
        fromUserId: currentUser.id,
        userIdToNotify: post.userId,
        postId: post._id,
        action: `${currentUser.firstname} ${currentUser.lastname} commented on your post.`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 flex absolute bottom-0 z-40 w-[98%] bg-white    items-center"
    >
      <div className="h-8 w-8">
        <img
          src={
            currentUser.profilePicture
              ? currentUser.profilePicture
              : "/no-avatar.png"
          }
          className=" rounded-full object-cover cursor-pointer w-full h-full"
          alt=""
        />
      </div>

      <input
        type="text"
        autoComplete="off"
        placeholder="comment"
        className="ml-3 w-full rounded-md p-2 outline-none"
        onChange={handleChange}
        ref={inputRef}
        name="comment"
      />
      <button className="p-2 ml-3" type="submit" disabled={isDisabled}>
        <SendIcon
          role="button"
          className={` ${
            isDisabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-sky-500  cursor-pointer"
          } `}
        />
      </button>
    </form>
  );
};

export default CreateComment;
