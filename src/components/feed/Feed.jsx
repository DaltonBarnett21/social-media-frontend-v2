import React from "react";
import CreatePost from "../../components/createPost/CreatePost";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const postState = useSelector((state) => state.post);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    setPosts([]);
    const fetchPosts = async () => {
      await axios
        .get(`/api/posts/timeline/${userId}`, {
          withCredentials: true,
          contentType: "application/json",
        })
        .then((res) => {
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPosts();
  }, [postState]);

  return (
    <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative ">
      <CreatePost />
      {posts.map((p, i) => (
        <Post key={i} post={p} setPosts={setPosts} posts={posts} />
      ))}
    </div>
  );
};

export default Feed;
