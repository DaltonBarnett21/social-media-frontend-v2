import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Comment = ({ commentData }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(commentData);
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users/${commentData.userId}`
      );
      setUser(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="mt-3 flex items-center ">
      <div className=" shrink-0 ">
        <img
          src="/me.jpg"
          height="40px"
          width="40px"
          className=" rounded-full object-cover cursor-pointer ml-1"
          alt=""
        />
      </div>
      <div className="ml-2">
        <div className="flex">
          <p>
            {user?.firstname} {user?.lastname}
          </p>
          <p className="ml-2 text-gray-500">{user?.createdAt}</p>
        </div>
        <div>
          <p>{commentData?.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
