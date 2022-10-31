import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useEffect } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import MobileMenu from "../mobleMenu/MobileMenu";
import Search from "../search/Search";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [notifications, setNotifications] = useState();
  const navigate = useNavigate();

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
    <div className="sticky top-0 bg-white border border-b-gray-300  z-50">
      <div className="flex justify-between relative  p-5">
        <Link to="/">
          <img
            src="/logo-no-background.png"
            width="160px"
            height="200px"
            alt=""
            className=" cursor-pointer max-w-full h-auto"
          />
        </Link>

        <Search />

        <MenuIcon
          className="flex lg:invisible cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && <MobileMenu />}

        <div className=" hidden lg:flex items-center cursor-pointer relative">
          <div className="relative">
            <Link to="/messenger">
              {" "}
              <LocalPostOfficeIcon className=" text-gray-600  mr-3 " />
            </Link>

            <span className="bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full absolute top-0 left-3">
              1
            </span>
          </div>
          <Link to="/notifications">
            <div
              className="relative cursor-pointer"
              onClick={handleUpdateNotification}
            >
              <NotificationsIcon className=" text-gray-600  mr-3 " />
              {notifications?.length !== 0 && (
                <span className="bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full absolute top-0 left-3">
                  {notifications?.length}
                </span>
              )}
            </div>
          </Link>

          <div className="flex items-center ">
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
                <Link to="/settings">
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
