import React, { useState } from "react";
import Post from "../../components/post/Post";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import UserCard from "../../components/userCard/UserCard";
import { useProfileVisibility } from "../../hooks/useProfileVisibility";
import { useAxios } from "../../hooks/useAxios";
import { useFollowing } from "../../hooks/useFollowing";
import ProfileLayout from "../../layouts/ProfileLayout";

const Profile = () => {
  let { id } = useParams();
  const signedInUser = useSelector((state) => state.user);
  const { canViewProfile } = useProfileVisibility(signedInUser.id, id);
  const { follow, unfollow, isFollowing, setIsFollowing } = useFollowing(
    signedInUser,
    id
  );
  const [userProfile, userProfileIsLoading, userProfileError] = useAxios(
    {
      method: "GET",
      url: `/api/profile/${id}`,
    },
    id
  );
  const [followers, followersIsLoading, followersError] = useAxios(
    {
      method: "GET",
      url: `/api/users/${id}?showFollowers=true`,
    },
    id
  );
  const [user, userIsLoading, userError] = useAxios(
    {
      method: "GET",
      url: `/api/users/${id}`,
    },
    id
  );
  const [posts, postsIsLoading, postsError, setPosts] = useAxios(
    {
      method: "GET",
      url: `/api/posts/timeline/${id}?profilePosts=true`,
    },
    id
  );

  useEffect(() => {
    if (user?.followers.includes(signedInUser.id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user, signedInUser]);

  return (
    <ProfileLayout>
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
          src={user?.profilePicture ? user?.profilePicture : "/no-avatar.png"}
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
            return <Post key={i} post={p} posts={posts} setPosts={setPosts} />;
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
    </ProfileLayout>
  );
};

export default Profile;
