import React, { Suspense, lazy } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setError, setLoading, setSuccess } from "../../redux/loadingSlice";
import UserCard from "../userCard/UserCard";
import SkeletonCard from "../skeletons/SkeletonCard";
const Post = lazy(() => import("../../components/post/Post"));
const CreatePost = lazy(() => import("../../components/createPost/CreatePost"));

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const postState = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setPosts([]);
    const fetchPosts = async () => {
      await axios
        .get(`/api/posts/timeline/${user.id}`)
        .then((res) => {
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((err) => {
          dispatch(setError);
          console.log(err);
        });
    };
    fetchPosts();
  }, [postState, user]);

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
  }, []);

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
      <Suspense fallback={<SkeletonCard />}>
        <CreatePost />
      </Suspense>

      {posts.map((p, i) => (
        <Suspense fallback={<SkeletonCard />}>
          <Post
            key={i}
            post={p}
            setPosts={setPosts}
            posts={posts}
            isloading={isloading}
          />
        </Suspense>
      ))}
    </div>
  );
};

export default Feed;
