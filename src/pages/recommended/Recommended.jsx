import React from "react";
import MainLayout from "../../layouts/MainLayout";
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
    <MainLayout>
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
    </MainLayout>
  );
};

export default Recommended;
