import React from "react";
import Header from "../../components/Header/Header";
import Leftbar from "../../components/leftbar/Leftbar";
import NavMenu from "../../components/mobile/NavMenu";
import Rightbar from "../../components/rightbar/Rightbar";
import UserCard from "../../components/userCard/UserCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserCardSkeleton from "../../components/skeletons/UserCardSkeleton";

const Recommended = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
  return (
    <div className=" bg-gray-100 h-full relative">
      <Header />
      <section className="flex">
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Leftbar />
        </div>
        <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative">
          {isLoading &&
            Array(20)
              .fill()
              .map((u, i) => <UserCardSkeleton key={i} />)}
          {!isLoading &&
            users?.map((u, i) => (
              <Link to={`/user/${u._id}`}>
                <UserCard user={u} key={i} />
              </Link>
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

export default Recommended;
