import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef } from "react";
import axios from "axios";

const CreateComment = ({
  post,
  hasCommented,
  setHasCommented,
  setShowModel,
}) => {
  const inputRef = useRef();
  const [comment, setComment] = useState({
    userId: "6346e10d6d1c8f98968f1b14",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newComment = {};
    newComment[name] = value;

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

    inputRef.current.value = "";
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 flex absolute bottom-0 z-50 w-[98%] bg-white    items-center"
    >
      <img
        src="/me.jpg"
        height="40px"
        width="40px"
        className=" rounded-full object-cover cursor-pointer"
        alt=""
      />
      <input
        type="text"
        placeholder="comment"
        className="ml-3 w-full rounded-md p-2 outline-none"
        onChange={handleChange}
        ref={inputRef}
        name="comment"
      />
      <button className="p-2 ml-3" type="submit">
        <SendIcon role="button" className=" text-sky-500 cursor-pointer  " />
      </button>
    </form>
  );
};

export default CreateComment;
