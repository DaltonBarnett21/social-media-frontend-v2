import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const NavMenu = () => {
  const user = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState();

  useEffect(() => {
    const getNotifications = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${user.id}?showNotSeen=true`
      );
      setNotifications(res.data);
    };
    getNotifications();
  }, []);

  const handleUpdateNotification = async () => {
    await axios.put(`http://localhost:5000/api/notifications/${user.id}`, {
      hasSeen: true,
    });
  };

  return (
    <div className="lg:hidden sticky bottom-0  z-50 bg-gray-100 w-screen   p-4">
      <div className="p-2 pt-4 pb-4 bg-white drop-shadow-md flex justify-evenly ">
        <Link to="/">
          <HomeIcon className=" text-gray-400 cursor-pointer" />
        </Link>

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

        <Link to="/notifications">
          <div
            className="relative cursor-pointer"
            onClick={handleUpdateNotification}
          >
            <NotificationsIcon className=" text-gray-400  mr-3 " />
            {notifications?.length !== 0 && (
              <span className="bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full absolute top-0 left-3">
                {notifications?.length}
              </span>
            )}
          </div>
        </Link>
        <Link to={`/user/${user.id}`}>
          <PersonIcon className=" text-gray-400 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default NavMenu;
