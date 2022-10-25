import React from "react";
import Header from "../../components/Header/Header";
import Leftbar from "../../components/leftbar/Leftbar";
import NavMenu from "../../components/mobile/NavMenu";
import Rightbar from "../../components/rightbar/Rightbar";
import UserCard from "../../components/userCard/UserCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Recommended = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("http://localhost:5000/api/users")
        .then((res) => {
          setUsers(res.data);
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
          {users?.map((u, i) => (
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
