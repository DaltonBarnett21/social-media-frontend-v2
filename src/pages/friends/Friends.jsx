import React from "react";
import Header from "../../components/Header/Header";
import Leftbar from "../../components/leftbar/Leftbar";
import NavMenu from "../../components/mobile/NavMenu";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../../components/userCard/UserCard";
import { Link } from "react-router-dom";
import UserCardSkeleton from "../../components/skeletons/UserCardSkeleton";

const Friends = () => {
  const [followers, setFollowers] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const getFollowers = async () => {
      setIsLoading(true);
      await axios
        .get(
          `http://localhost:5000/api/users/${currentUser.id}?showFollowers=true`
        )
        .then((res) => {
          setFollowers(res.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
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
        <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative h-screen">
          {isLoading &&
            Array(20)
              .fill()
              .map((u, i) => <UserCardSkeleton key={i} />)}
          {!isLoading &&
            followers?.map((user, i) => (
              <Link to={`/user/${user._id}`}>
                <UserCard user={user} key={i} />
              </Link>
            ))}
          {followers?.length === 0 && (
            <div className="flex justify-center">
              <span>You're not following anyone!</span>
            </div>
          )}
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
