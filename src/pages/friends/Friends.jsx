import React from "react";
import Header from "../../components/Header/Header";
import Leftbar from "../../components/leftbar/Leftbar";
import NavMenu from "../../components/mobile/NavMenu";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../../components/userCard/UserCard";

const Friends = () => {
  const [followers, setFollowers] = useState();
  const [error, setError] = useState(false);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const getFollowers = async () => {
      await axios
        .get(
          `http://localhost:5000/api/users/6351ed32c276993655c63090?showFollowers=true`
        )
        .then((res) => {
          setFollowers(res.data);
        })
        .catch((err) => {
          setError(true);
        });
    };
    getFollowers();
  }, []);

  return (
    <div className=" bg-gray-100 h-full relative">
      <Header />
      <section className="flex">
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Leftbar />
        </div>
        <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative">
          {followers?.map((user, i) => (
            <UserCard user={user} key={i} />
          ))}
        </div>
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Rightbar />
        </div>
      </section>

      <NavMenu />
    </div>
  );
};

export default Friends;
