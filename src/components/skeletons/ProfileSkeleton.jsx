import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className=" relative">
      <div className="w-full h-52 object-cover">
        <Skeleton height={208} />
      </div>

      <div className="h-24 w-24 rounded-full object-cover absolute left-0 right-0 mx-auto top-[150px] border border-white">
        <Skeleton circle={true} height={80} width={80} />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
