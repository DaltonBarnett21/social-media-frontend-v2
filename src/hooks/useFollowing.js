import { useEffect, useState } from "react";
import axios from "axios";

export const useFollowing = (signedInUser, otherUserId) => {
  const [isFollowing, setIsFollowing] = useState();

  const follow = async () => {
    setIsFollowing(true);
    await axios.put(`http://localhost:5000/api/users/${otherUserId}/follow`, {
      userId: signedInUser.id,
    });
  };

  const unfollow = async () => {
    setIsFollowing(false);
    await axios.put(`http://localhost:5000/api/users/${otherUserId}/unfollow`, {
      userId: signedInUser.id,
    });
  };

  return { follow, unfollow, isFollowing, setIsFollowing };
};
