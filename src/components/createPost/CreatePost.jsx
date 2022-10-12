import React from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";

const CreatePost = () => {
  return (
    <div className="bg-white m-5 shadow-md rounded-lg ">
      <div className="flex p-2 ">
        <img
          src="/me.jpg"
          height="55px"
          width="55px"
          className=" rounded-full object-cover cursor-pointer"
          alt=""
        />
        <div className="flex flex-col ml-2 text-sm cursor-pointer">
          <p className=" font-bold">Dalton Barnett</p>
          <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
        </div>
      </div>
      <input
        placeholder="What's on your mind, Dalton?"
        type="text"
        className="w-full p-5 outline-none text-gray-600 h-20"
      />
      <hr />
      <div className="p-4 flex justify-between">
        <div className="flex">
          <PhotoLibraryIcon className=" text-green-600 cursor-pointer mr-1" />
          <p className="text-gray-400 mr-10">Photo / Video</p>
          <EmojiEmotionsIcon className=" text-yellow-400 cursor-pointer mr-1" />
          <p className="text-gray-400 mr-10">Feeling</p>
        </div>
        <SendIcon className=" text-sky-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default CreatePost;
