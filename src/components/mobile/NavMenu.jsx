import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

const NavMenu = () => {
  return (
    <div className="lg:hidden sticky bottom-0  z-50 bg-gray-100 w-screen   p-4">
      <div className="p-2 pt-4 pb-4 bg-white drop-shadow-md flex justify-evenly ">
        <HomeIcon className=" text-gray-400 cursor-pointer" />
        <div className=" relative flex justify-center items-center">
          <LocalPostOfficeIcon className=" text-gray-400 cursor-pointer" />
          <span className="h-4 w-4 rounded-full bg-red-500 text-white absolute top-0 -right-1 text-center text-xs cursor-pointer">
            10
          </span>
        </div>

        <img
          src="/r.png"
          className=" h-7 w-7 object-cover rounded-full drop-shadow-md cursor-pointer"
          alt=""
        />
        <div className=" relative flex justify-center items-center">
          <NotificationsIcon className=" text-gray-400 cursor-pointer" />
          <span className="h-4 w-4 rounded-full bg-red-500 text-white absolute top-0 -right-1 text-center text-xs cursor-pointer">
            5
          </span>
        </div>

        <PersonIcon className=" text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default NavMenu;
