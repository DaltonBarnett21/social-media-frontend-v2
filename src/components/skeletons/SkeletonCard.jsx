import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <SkeletonTheme baseColor="#EAEAEA" highlightColor="#B2B2B2">
      <div className="m-5 shadow-md rounded-lg p-2 relative border border-gray-300">
        <div className="  flex justify-between items-center relative p-2">
          <div className="flex items-center">
            <div className="flex h-12  w-12 ">
              <Skeleton circle={true} height={48} width={48} />
            </div>

            <div className="flex flex-col ml-2 text-sm cursor-pointer">
              <p>
                <Skeleton width={80} />
              </p>
              <p>
                <Skeleton width={80} />
              </p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <Skeleton width={350} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonCard;
