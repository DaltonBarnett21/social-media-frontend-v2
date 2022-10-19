import React from "react";
import CreatePost from "../../components/createPost/CreatePost";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setError, setLoading, setSuccess } from "../../redux/loadingSlice";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const postState = useSelector((state) => state.post);
  const loadingState = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setPosts([]);
    const fetchPosts = async () => {
      dispatch(setLoading());
      await axios
        .get(`/api/posts/timeline/${user.id}`)
        .then((res) => {
          dispatch(setSuccess);
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

  if (loadingState.isloading) {
    return (
      <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative ">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative ">
        <CreatePost />
        {posts.map((p, i) => (
          <Post key={i} post={p} setPosts={setPosts} posts={posts} />
        ))}
      </div>
    );
  }
};

export default Feed;
