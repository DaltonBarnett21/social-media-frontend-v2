import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";

const MobileMenu = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`http://localhost:5000/api/users/${user.id}`);
      setProfileImage(res.data.profilePicture);
    };
    getUser();
  }, []);

  return (
    <div className="absolute right-0 -bottom-96 top-[72px] w-[40%] bg-white shadow-md border border-gray-300 h-screen z-50">
      <div className="p-5 text-lg ">
        <Link to={`/user/${user.id}`}>
          <div className="flex items-center ">
            <div className="flex h-8 w-8 mr-2">
              <img
                src={profileImage ? profileImage : "/no-avatar.png"}
                className=" rounded-full w-full h-full object-cover cursor-pointer "
                alt=""
              />
            </div>

            <p className="text-gray-600 cursor-pointer mr-2">
              {user.firstname} {user.lastname}
            </p>
          </div>
        </Link>
        <div className="mt-5 cursor-pointer flex items-center">
          <Link to="/">
            <HomeIcon className=" text-blue-400 mr-2" />
            <span className=" text-gray-500">Home</span>
          </Link>
        </div>
        <div className="mt-5 cursor-pointer flex items-center">
          <Link to="/friends">
            <GroupIcon className=" text-blue-400 mr-2" />
            <span className=" text-gray-500">Following</span>
          </Link>
        </div>
        <div className="mt-5 cursor-pointer flex items-center">
          <GroupsIcon className=" text-blue-400 mr-2" />
          <span className=" text-gray-500">Groups</span>
        </div>
        <div className="mt-5 cursor-pointer flex items-center">
          <StoreMallDirectoryIcon className=" text-blue-400 mr-2" />
          <span className=" text-gray-500">Market Place</span>
        </div>
        <div className="mt-5 cursor-pointer flex items-center">
          <Link to="/settings">
            <SettingsIcon className=" text-blue-400 mr-2" />
            <span className=" text-gray-500">Settings</span>
          </Link>
        </div>
        <div className="mt-5 cursor-pointer flex items-center" onClick={logout}>
          <LogoutIcon className=" text-blue-400 mr-2" />
          <span className=" text-gray-500">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
