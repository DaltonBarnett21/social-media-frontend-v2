import React from "react";
import Skeleton from "react-loading-skeleton/dist";

const UserCard = () => {
  return (
    <div className="flex mt-5 flex-1 shadow-md border border-gray-200 bg-white p-2 hover:cursor-pointer hover:bg-gray-200 ">
      <div className=" h-12 w-12 flex items-center ">
        <Skeleton circle={true} height={50} width={50} />
      </div>

      <div className="flex flex-col ml-2 text-sm cursor-pointer">
        <div className="flex">
          <Skeleton width={80} />
        </div>
        <Skeleton width={50} />
      </div>
    </div>
  );
};

export default UserCard;
