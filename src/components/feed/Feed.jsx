import React from "react";
import CreatePost from "../../components/createPost/CreatePost";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setError, setLoading, setSuccess } from "../../redux/loadingSlice";
import UserCard from "../userCard/UserCard";
import SkeletonCard from "../skeletons/SkeletonCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const postState = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setPosts([]);
    const fetchPosts = async () => {
      setIsLoading(true);
      await axios
        .get(`/api/posts/timeline/${user.id}`)
        .then((res) => {
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        })
        .catch((err) => {
          dispatch(setError);
          console.log(err);
        });
    };
    fetchPosts();
  }, [postState, user]);

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
    <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative ">
      {isloading ? <SkeletonCard /> : <CreatePost />}

      {isloading &&
        Array(5)
          .fill()
          .map((skel, i) => <SkeletonCard key={i} />)}
      {posts.map((p, i) => (
        <Post
          key={i}
          post={p}
          setPosts={setPosts}
          posts={posts}
          isloading={isloading}
        />
      ))}
    </div>
  );
};

export default Feed;
