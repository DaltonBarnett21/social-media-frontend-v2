import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Leftbar from "../../components/leftbar/Leftbar";
import NavMenu from "../../components/mobile/NavMenu";
import Post from "../../components/post/Post";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios, { AxiosHeaders } from "axios";
import { useEffect } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState();
  const [posts, setPosts] = useState();
  let { id } = useParams();

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
  }, []);

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
  }, []);

  const handleFeedState = (isPrivate) => {
    switch (isPrivate) {
      case true:
        return <p>Users post are private</p>;
      case false:
        return posts?.map((p, i) => (
          <Post key={i} post={p} posts={posts} setPosts={setPosts} />
        ));
      default:
        return <p>You have no post!</p>;
    }
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
            <img src="/post.jpg" alt="" className="w-full h-52 object-cover" />
            <img
              src="/no-avatar.png"
              alt=""
              className="h-24 w-24 rounded-full object-cover absolute left-0 right-0 mx-auto top-[150px] border border-white"
            />
            <CameraAltIcon
              font={25}
              className="absolute left-0 right-0 mx-auto top-[230px] text-gray-400 hover:cursor-pointer"
            />
          </div>
          <div className="  mt-12  flex justify-center">
            <div className=" text-center">
              <p className=" font-bold">
                {user.firstname} {user.lastname}
              </p>
              {user.id === id ? null : (
                <button className="p-1 w-24 text-white bg-sky-500 hover:bg-sky-600 mt-2">
                  + Follow
                </button>
              )}

              <p className="mt-5 text-gray-500 w-full p-2  lg:w-3/4 mx-auto">
                {userProfile?.about}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 lg:flex-[2] mt-10">
              {handleFeedState(userProfile?.isPrivate)}
            </div>
            <div className="hidden lg:block lg:flex-1 mt-10  ">
              <div className="flex mt-8 items-center justify-between">
                <h2 className="text-lg">{user.firstname}s Friends</h2>
                <p className=" text-sky-600 cursor-pointer">See More...</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-9 mt-5 p-4 w-80 ">
                <div className="flex ">
                  <img
                    src="/me.jpg"
                    height="55px"
                    width="55px"
                    className=" rounded-full object-cover cursor-pointer"
                    alt=""
                  />
                  <div className="flex flex-col ml-2 text-sm cursor-pointer">
                    <p className=" font-bold">Dalton Barnett</p>
                    <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
                  </div>
                </div>
                <div className="flex ">
                  <img
                    src="/me.jpg"
                    height="55px"
                    width="55px"
                    className=" rounded-full object-cover cursor-pointer"
                    alt=""
                  />
                  <div className="flex flex-col ml-2 text-sm cursor-pointer">
                    <p className=" font-bold">Dalton Barnett</p>
                    <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
                  </div>
                </div>
                <div className="flex ">
                  <img
                    src="/me.jpg"
                    height="55px"
                    width="55px"
                    className=" rounded-full object-cover cursor-pointer"
                    alt=""
                  />
                  <div className="flex flex-col ml-2 text-sm cursor-pointer">
                    <p className=" font-bold">Dalton Barnett</p>
                    <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
                  </div>
                </div>
                <div className="flex ">
                  <img
                    src="/me.jpg"
                    height="55px"
                    width="55px"
                    className=" rounded-full object-cover cursor-pointer"
                    alt=""
                  />
                  <div className="flex flex-col ml-2 text-sm cursor-pointer">
                    <p className=" font-bold">Dalton Barnett</p>
                    <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
                  </div>
                </div>
                <div className="flex ">
                  <img
                    src="/me.jpg"
                    height="55px"
                    width="55px"
                    className=" rounded-full object-cover cursor-pointer"
                    alt=""
                  />
                  <div className="flex flex-col ml-2 text-sm cursor-pointer">
                    <p className=" font-bold">Dalton Barnett</p>
                    <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
                  </div>
                </div>
                <div className="flex ">
                  <img
                    src="/me.jpg"
                    height="55px"
                    width="55px"
                    className=" rounded-full object-cover cursor-pointer"
                    alt=""
                  />
                  <div className="flex flex-col ml-2 text-sm cursor-pointer">
                    <p className=" font-bold">Dalton Barnett</p>
                    <p className=" mt-0 text-gray-500">@daltonbarnett21</p>
                  </div>
                </div>
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
