import axios from "axios";
import { useEffect, useState } from "react";

const Conversation = ({ conversation, signedInUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const otherUserId = conversation?.members?.find(
      (otherId) => otherId !== signedInUser.id
    );

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${otherUserId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [signedInUser, conversation]);

  return (
    <div className=" cursor-pointer bg-white hover:bg-gray-100">
      <div className="flex items-center border p-3">
        <img
          src={user?.profilePicture ? user?.profilePicture : "/no-avatar.png"}
          alt=""
          className=" h-12 w-12 rounded-full object-cover"
        />
        <div className=" flex flex-col ml-1 text-sm">
          <p>
            {user?.firstname} {user?.lastname}
          </p>
          <p>@{user?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
