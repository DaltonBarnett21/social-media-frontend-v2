import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 bg-white border border-b-gray-300  z-50">
      <div className="flex justify-between  p-5">
        <Link to="/">
          <img
            src="/logo-no-background.png"
            width="160px"
            height="200px"
            alt=""
            className=" cursor-pointer max-w-full h-auto"
          />
        </Link>

        <div className=" shadow-md p-1 bg-white  flex ">
          <SearchIcon className=" text-gray-400 mr-2 " />
          <input
            type="text"
            placeholder="Search..."
            className=" outline-none font-extralight text-gray-500 lg:w-[500px] "
          />
        </div>

        <div className=" hidden lg:flex items-center cursor-pointer relative">
          <div className="relative">
            <LocalPostOfficeIcon className=" text-gray-600  mr-3 " />
            <span className="bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full absolute top-0 left-3">
              1
            </span>
          </div>
          <div className="relative cursor-pointer">
            <NotificationsIcon className=" text-gray-600  mr-3 " />
            <span className="bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full absolute top-0 left-3">
              10
            </span>
          </div>

          <div className="flex items-center ">
            <Link to={`/user/${user.id}`}>
              <div className="flex items-center ">
                <img
                  src={
                    user.profilePicture ? user.profilePicture : "/no-avatar.png"
                  }
                  height="35px"
                  width="35px"
                  className=" rounded-full object-cover cursor-pointer mr-2"
                  alt=""
                />
                <p className="text-gray-600 cursor-pointer mr-2">
                  {user.firstname} {user.lastname}
                </p>
              </div>
            </Link>
            <Menu>
              <MenuHandler>
                <ArrowDropDownIcon />
              </MenuHandler>
              <MenuList className="z-50 outline-none">
                <Link to={`/user/${user.id}`}>
                  <div className="flex   p-2">
                    <Person2Icon className="mr-2" />
                    <p className="mb-1 hover:text-gray-500">Profile</p>
                  </div>
                </Link>

                <Link to={`/user/${user.id}`}>
                  <div className="flex  p-2">
                    <SettingsIcon className="mr-2" />
                    <p className="mb-1 hover:text-gray-500">Settings</p>
                  </div>
                </Link>

                <div
                  className="flex hover:cursor-pointer  p-2"
                  onClick={logout}
                >
                  <LogoutIcon className="mr-2" />
                  <p className="mb-1 hover:text-gray-500">Logout</p>
                </div>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
