import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Rightbar = () => {
  const [followers, setFollowers] = useState();
  let { id } = useParams();

  useEffect(() => {
    const getFollowers = async () => {
      await axios
        .get(`http://localhost:5000/api/users/${id}?showFollowers=true`)
        .then((res) => {
          setFollowers(res?.data?.followers);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getFollowers();
  }, []);

  return (
    <div>
      <div className="p-5 sticky top-0">
        <h2 className="mt-8 text-xl">Online Friends</h2>
        <div className="flex mt-8 relative">
          <img
            src="/me.jpg"
            height="55px"
            width="55px"
            className=" rounded-full object-cover cursor-pointer"
            alt=""
          />
          <span className="h-4 w-4 bg-green-500 rounded-full absolute top-0 left-10 border border-white"></span>
          <div className="flex flex-col ml-2 text-sm cursor-pointer">
            <p className=" font-bold">Dalton Barnett</p>
            <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
          </div>
        </div>
        <div className="flex mt-8 relative">
          <img
            src="/me.jpg"
            height="55px"
            width="55px"
            className=" rounded-full object-cover cursor-pointer"
            alt=""
          />
          <span className="h-4 w-4 bg-green-500 rounded-full absolute top-0 left-10 border border-white"></span>
          <div className="flex flex-col ml-2 text-sm cursor-pointer">
            <p className=" font-bold">Dalton Barnett</p>
            <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
          </div>
        </div>
        <div className="flex mt-8 relative">
          <img
            src="/me.jpg"
            height="55px"
            width="55px"
            className=" rounded-full object-cover cursor-pointer"
            alt=""
          />
          <span className="h-4 w-4 bg-green-500 rounded-full absolute top-0 left-10 border border-white"></span>
          <div className="flex flex-col ml-2 text-sm cursor-pointer">
            <p className=" font-bold">Dalton Barnett</p>
            <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
          </div>
        </div>
        <div className="flex mt-8 relative">
          <img
            src="/me.jpg"
            height="55px"
            width="55px"
            className=" rounded-full object-cover cursor-pointer"
            alt=""
          />
          <span className="h-4 w-4 bg-green-500 rounded-full absolute top-0 left-10 border border-white"></span>
          <div className="flex flex-col ml-2 text-sm cursor-pointer">
            <p className=" font-bold">Dalton Barnett</p>
            <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
          </div>
        </div>
        <p className="mt-8 text-sky-600 cursor-pointer">See More...</p>
      </div>
    </div>
  );
};

export default Rightbar;
