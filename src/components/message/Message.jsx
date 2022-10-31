import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Message = ({ message }) => {
  const signedInUser = useSelector((state) => state.user);
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${message.sender}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message]);

  return (
    <div
      className={`${
        signedInUser?.id === message?.sender
          ? "flex items-center justify-end m-3"
          : "flex items-center justify-start m-3"
      }`}
    >
      <img
        src={user?.profilePicture ? user?.profilePicture : "/no-avatar.png"}
        alt=""
        className="h-12 w-12 rounded-full mr-2 ml-2 object-cover mb-6"
      />

      <div>
        {user?.firstname} {user?.lastname}
        <p
          className={`${
            signedInUser?.id === message?.sender
              ? "bg-blue-400 text-white"
              : "bg-gray-200"
          }    p-1 rounded-md mr-2`}
        >
          <p>{message?.text}</p>
        </p>
        <p className="text-gray-400 text-sm">{format(message?.createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;
