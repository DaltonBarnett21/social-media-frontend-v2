import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Leftbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sticky top-20 ">
      <div className="p-5 text-lg ">
        <div className="mt-8 cursor-pointer flex items-center">
          <Link to="/">
            <HomeIcon className=" text-sky-500 mr-2" />
            <span className=" text-gray-500">Home</span>
          </Link>
        </div>
        <div className="mt-8 cursor-pointer flex items-center">
          <GroupIcon className=" text-sky-500 mr-2" />
          <span className=" text-gray-500">Friends</span>
        </div>
        <div className="mt-8 cursor-pointer flex items-center">
          <GroupsIcon className=" text-sky-500 mr-2" />
          <span className=" text-gray-500">Groups</span>
        </div>
        <div className="mt-8 cursor-pointer flex items-center">
          <StoreMallDirectoryIcon className=" text-sky-500 mr-2" />
          <span className=" text-gray-500">Market Place</span>
        </div>
        <div className="mt-8 cursor-pointer flex items-center" onClick={logout}>
          <LogoutIcon className=" text-sky-500 mr-2" />
          <span className=" text-gray-500">Logout</span>
        </div>
        <hr className="mt-8" />
        <div className="flex justify-between">
          <h2 className="text-xl mt-8">People to Follow</h2>
          <p className="mt-8 text-sky-600 cursor-pointer">See More...</p>
        </div>

        <div className=" overflow-y-scroll h-72">
          <div className="flex mt-8">
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
          <div className="flex mt-8">
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
          <div className="flex mt-8">
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
          <div className="flex mt-8">
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
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
