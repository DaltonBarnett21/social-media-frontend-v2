import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = () => {
  return (
    <div className="sticky top-0 bg-white drop-shadow-xl z-50">
      <div className="flex justify-between  p-5">
        <img
          src="/logo-no-background.png"
          width="120px"
          alt=""
          className=" cursor-pointer  max-w-full h-auto"
        />

        <div className=" shadow-md p-1 bg-white  flex ">
          <SearchIcon className=" text-gray-400 mr-2 " />
          <input
            type="text"
            placeholder="Search..."
            className=" outline-none font-extralight text-gray-500 lg:w-[500px] "
          />
        </div>

        <div className=" hidden lg:flex items-center cursor-pointer">
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
          <img
            src="/me.jpg"
            height="35px"
            width="35px"
            className=" rounded-full object-cover cursor-pointer mr-1"
            alt=""
          />
          <p className="text-gray-600 cursor-pointer">Dalton Barnett</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
