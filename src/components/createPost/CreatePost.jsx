import React from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { update } from "../../redux/postSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [user, setUser] = useState({});
  const [post, setPost] = useState({
    desc: "",
    img: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users/6346e10d6d1c8f98968f1b14`
      );
      setUser(res.data);
    };
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newPost = {};
    newPost[name] = value;

    setPost({ ...post, ...newPost });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/posts", {
      userId: "6346e10d6d1c8f98968f1b14",
      desc: post.desc,
    });

    dispatch(update(post));
    inputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white m-5 shadow-md rounded-lg "
    >
      <div className="flex p-2 ">
        <img
          src="/me.jpg"
          height="55px"
          width="55px"
          className=" rounded-full object-cover cursor-pointer"
          alt=""
        />
        <div className="flex flex-col ml-2 text-sm cursor-pointer">
          <p className=" font-bold">
            {user.firstname} {user.lastname}
          </p>
          <p className=" mt-0 text-gray-500">@{user.username}</p>
        </div>
      </div>
      <input
        placeholder={`What's on your mind, ${user.firstname}?`}
        type="text"
        className="w-full p-5 outline-none text-gray-600 h-20"
        name="desc"
        onChange={handleChange}
        ref={inputRef}
      />

      <hr />
      <div className="p-4 flex justify-between">
        <div className="flex">
          <PhotoLibraryIcon className=" text-green-600 cursor-pointer mr-1" />
          <p className="text-gray-400 mr-10">Photo / Video</p>
          <EmojiEmotionsIcon className=" text-yellow-400 cursor-pointer mr-1" />
          <p className="text-gray-400 mr-10">Feeling</p>
        </div>

        <button>
          <SendIcon
            role="button"
            type="submit"
            className=" text-sky-500 cursor-pointer"
          />
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
