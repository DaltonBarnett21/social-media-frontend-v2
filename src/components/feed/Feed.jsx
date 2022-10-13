import React from "react";
import CreatePost from "../../components/createPost/CreatePost";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const postState = useSelector((state) => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/posts/timeline/6346e10d6d1c8f98968f1b14"
      );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [postState]);

  return (
    <div className="flex-1 lg:block lg:flex-[5] lg:p-1 ">
      <CreatePost />
      {posts.map((p, i) => (
        <Post key={i} post={p} />
      ))}
    </div>
  );
};

export default Feed;
