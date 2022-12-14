import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import UserCard from "../userCard/UserCard";
import UserCardSkeleton from "../skeletons/UserCardSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Leftbar = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [usersFilter, setUsersFilter] = useState();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      await axios
        .get("http://localhost:5000/api/users")
        .then((res) => {
          setUsers(res.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUsers();
  }, []);

  useEffect(() => {
    setUsersFilter(users?.filter((u) => u._id !== currentUser.id));
  }, [users]);

  return (
    <>
      <div className="sticky top-20 ">
        <div className="p-5 text-lg ">
          <div className="mt-8 cursor-pointer flex items-center">
            <Link to="/">
              <HomeIcon className=" text-blue-400 mr-2" />
              <span className=" text-gray-500">Home</span>
            </Link>
          </div>
          <div className="mt-8 cursor-pointer flex items-center">
            <Link to="/friends">
              <GroupIcon className=" text-blue-400 mr-2" />
              <span className=" text-gray-500">Following</span>
            </Link>
          </div>
          <div className="mt-8 cursor-pointer flex items-center">
            <GroupsIcon className=" text-blue-400 mr-2" />
            <span className=" text-gray-500">Groups</span>
          </div>
          <div className="mt-8 cursor-pointer flex items-center">
            <StoreMallDirectoryIcon className=" text-blue-400 mr-2" />
            <span className=" text-gray-500">Market Place</span>
          </div>
          <div
            className="mt-8 cursor-pointer flex items-center"
            onClick={logout}
          >
            <LogoutIcon className=" text-blue-400 mr-2" />
            <span className=" text-gray-500">Logout</span>
          </div>
          <hr className="mt-8" />
          <div className="flex justify-between">
            <h2 className="text-xl mt-8">People to Follow</h2>
            <Link to="/recommended">
              <p className="mt-8 text-blue-400 cursor-pointer">See More...</p>
            </Link>
          </div>

          <div className=" overflow-y-scroll h-72">
            {isLoading &&
              Array(5)
                .fill()
                .map((c, i) => <UserCardSkeleton key={i} />)}
            {!isLoading &&
              usersFilter?.slice(0, 5).map((u, i) => {
                return (
                  <Link to={`/user/${u._id}`}>
                    <UserCard user={u} key={i} />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leftbar;
