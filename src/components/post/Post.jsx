import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users/${post.userId}`
      );
      setUser(res.data);
    };
    fetchPosts();
  }, []);

  const handleLikes = () => {
    setLike(hasLiked ? like - 1 : like + 1);
    setHasLiked(!hasLiked);
  };

  return (
    <div className="bg-white m-5 shadow-md rounded-lg p-2 ">
      <div className="  flex justify-between items-center p-2">
        <div className="flex items-center">
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
        <MoreVertIcon className="cursor-pointer" />
      </div>
      <div className=" text-gray-600 pt-2 pb-2 p-2">
        <p>{post.desc}</p>
        <div className="mt-2">
          {/* <img
            src="/post.jpg"
            className="w-full object-cover rounded-lg "
            alt=""
          /> */}
        </div>
      </div>
      <div className="pb-3 flex justify-between  p-2">
        <div className="flex">
          <div className="flex">
            <ThumbUpOffAltIcon
              onClick={handleLikes}
              className=" cursor-pointer text-blue-400"
            />
            <p className="ml-1">{like}</p>
          </div>
        </div>
        <div className="flex ml-3">
          <ChatBubbleOutlineIcon className=" cursor-pointer text-blue-400" />
          <p className="ml-1">2</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
