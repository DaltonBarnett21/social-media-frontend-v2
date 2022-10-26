import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Leftbar from "../../components/leftbar/Leftbar";
import NavMenu from "../../components/mobile/NavMenu";
import Post from "../../components/post/Post";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import UserCard from "../../components/userCard/UserCard";

const Profile = () => {
  const [user, setUser] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState();
  const [userProfile, setUserProfile] = useState();
  const [posts, setPosts] = useState();
  const signedInUser = useSelector((state) => state.user);
  let { id } = useParams();

  //get profile information, if any
  useEffect(() => {
    const getProfile = async () => {
      await axios
        .get(`http://localhost:5000/api/profile/${id}`)
        .then((res) => {
          setUserProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProfile();
  }, [id]);

  //get followers
  useEffect(() => {
    const getFollowers = async () => {
      await axios
        .get(`http://localhost:5000/api/users/${id}?showFollowers=true`)
        .then((res) => {
          setFollowers(res.data);
        })
        .catch((err) => {});
    };
    getFollowers();
  }, [id]);

  //get user
  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`http://localhost:5000/api/users/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [id]);

  //get only users post since it's their profile
  useEffect(() => {
    const getUserPosts = async () => {
      await axios
        .get(`http://localhost:5000/api/posts/timeline/${id}?profilePosts=true`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserPosts();
  }, [id]);

  useEffect(() => {
    if (user?.followers.includes(signedInUser.id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user, signedInUser]);

  const follow = async () => {
    setIsFollowing(true);
    await axios.put(`http://localhost:5000/api/users/${id}/follow`, {
      userId: signedInUser.id,
    });
  };

  const unfollow = async () => {
    setIsFollowing(false);
    await axios.put(`http://localhost:5000/api/users/${id}/unfollow`, {
      userId: signedInUser.id,
    });
  };

  return (
    <div className="  h-screen relative">
      <Header />
      <section className="flex h-screen ">
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Leftbar />
        </div>
        <div className="flex-1 lg:block lg:flex-[5] lg:p-10">
          <div className=" relative">
            <img
              src={
                user?.coverPicture
                  ? user?.coverPicture
                  : "/No-Image-Placeholder.svg.png"
              }
              alt=""
              className="w-full h-52 object-cover"
            />
            <img
              src={
                user?.profilePicture ? user?.profilePicture : "/no-avatar.png"
              }
              alt=""
              className="h-24 w-24 rounded-full object-cover absolute left-0 right-0 mx-auto top-[150px] border border-white"
            />
          </div>
          <div className="  mt-12  flex justify-center">
            <div className=" text-center">
              <p className=" font-bold">
                {user?.firstname} {user?.lastname}
              </p>

              {id === signedInUser.id ? null : isFollowing ? (
                <button
                  onClick={unfollow}
                  className="p-1 w-24 text-white bg-sky-500 hover:bg-sky-600 mt-2"
                >
                  <div className="flex items-center w-full justify-center">
                    <CheckIcon fontSize="12px" className="mr-1" />
                    <span>Following</span>
                  </div>
                </button>
              ) : (
                <button
                  onClick={follow}
                  className="p-1 w-24 text-white bg-sky-500 hover:bg-sky-600 mt-2"
                >
                  <div className="flex items-center w-full justify-center">
                    <AddIcon fontSize="12px" className="mr-1" />
                    <span>Follow</span>
                  </div>
                </button>
              )}

              <p className="mt-5 text-gray-500 w-full p-2  lg:w-3/4 mx-auto">
                {userProfile?.about}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 lg:flex-[2] mt-10">
              {posts?.map((p, i) => {
                return (
                  <Post key={i} post={p} posts={posts} setPosts={setPosts} />
                );
              })}

              {posts?.length === 0 && <span>No Posts yet!</span>}
            </div>
            <div className="hidden lg:block lg:flex-1 mt-10  ">
              <div className="flex mt-8 items-center justify-between">
                <h2 className="text-lg">{user?.firstname}s Followers</h2>
                <p className=" text-sky-600 cursor-pointer">See More...</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-9  w-full ">
                {followers?.map((follower, i) => (
                  <Link to={`/user/${follower._id}`}>
                    <UserCard key={i} user={follower} />
                  </Link>
                ))}

                {followers?.length === 0 && (
                  <span className="mt-5">No Followers yet!</span>
                )}
              </div>
            </div>
          </div>
          <NavMenu />
        </div>
      </section>
    </div>
  );
};

export default Profile;
