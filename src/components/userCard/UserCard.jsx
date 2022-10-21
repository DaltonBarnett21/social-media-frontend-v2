import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="flex mt-5 shadow-md border border-gray-200 bg-white p-2">
      <div className=" h-12 w-12 flex items-center">
        <img
          src={user?.profilePicture ? user?.profilePicture : "/no-avatar.png"}
          className=" rounded-full object-cover cursor-pointer h-full w-full"
          alt=""
        />
      </div>

      <div className="flex flex-col ml-2 text-sm cursor-pointer">
        <p className=" font-bold">
          {user?.firstname} {user?.lastname}
        </p>
        <p className=" mt-0 text-gray-500">@{user?.username}</p>
      </div>
    </div>
  );
};

export default UserCard;
