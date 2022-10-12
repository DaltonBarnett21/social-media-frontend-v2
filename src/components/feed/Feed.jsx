import React from "react";
import CreatePost from "../../components/createPost/CreatePost";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/posts/timeline/6346e10d6d1c8f98968f1b14"
      );
      setPosts(res.data);
    };
    fetchPosts();
    console.log(posts);
  }, []);

  return (
    <div className="flex-1 lg:block lg:flex-[5] lg:p-1">
      <CreatePost />
      {posts.map((p, i) => (
        <Post key={i} post={p} />
      ))}
    </div>
  );
};

export default Feed;
